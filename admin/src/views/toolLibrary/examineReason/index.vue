<template>
  <el-container class="examineReason-box">
    <el-scrollbar
      :native="false"
      wrap-class="el-main"
      tag="main"
      :noresize="false"
    >
      <div class="panel pb-0">
        <Tab :btns="btns" @change="toggleSetting" />
        <div class="panel-body filter-form mt-30">
          <div class="filter-box">
            <div class="title-top">
              {{ isReason ? '原因设置' : '类目设置'
              }}<button type="button" class="btn-save fr" @click="edit(null)">
                新增
              </button>
            </div>
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item v-middle">
                  <span class="label-name">状态</span>
                  <el-select
                    v-model="query.categoryState"
                    placeholder="全部"
                    :clearable="true"
                    @change="list"
                  >
                    <el-option label="启用" :value="0" />
                    <el-option label="禁用" :value="1" />
                  </el-select>
                </div>
                <div v-if="isReason" class="form-item v-middle">
                  <span class="label-name">类目</span>
                  <el-select
                    v-model="query.categoryId"
                    placeholder="全部"
                    clearable
                    filterable
                    @change="list"
                  >
                    <el-option
                      v-for="item in selectList"
                      :key="item.id"
                      :label="item.categoryName"
                      :value="item.id"
                    />
                  </el-select>
                </div>
                <div v-if="isReason" class="form-item v-middle">
                  <span class="label-name">不通过原因</span>
                  <el-input
                    v-model.trim="query.reasonsFailure"
                    placeholder="请输入不通过原因"
                    :clearable="true"
                    @keyup.enter.native="list"
                  />
                </div>
              </div>
              <div class="flex-box">
                <HoverTip
                  content="查询"
                  tip-class-name="icon-search"
                  class="mr-30"
                  @click.native.prevent="list()"
                />
                <HoverTip
                  content="清除查询条件"
                  tip-class-name="icon-reset"
                  @click.native.prevent="clearFilter"
                />
              </div>
            </div>
          </div>
          <el-table
            v-if="isReason"
            v-loading="tableLoading"
            class="table-large"
            :data="reasonList"
          >
            <el-table-column label="序号" >
              <template slot-scope="{ $index }">
                <span>{{ $index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="类目">
              <template slot-scope="{ row }">
                <span>{{ row.categoryName || '-' }}</span>
              </template>
            </el-table-column>
            <el-table-column label="不通过原因">
              <template slot-scope="{ row }">
                <span>{{ row.reasonsFailure || '-' }}</span>
              </template>
            </el-table-column>
            <el-table-column label="维护时间" >
              <template slot-scope="{ row }">
                <span>{{
                  $moment(row.updateTime).format('YYYY-MM-DD HH:mm:ss')
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="维护人" >
              <template slot-scope="{ row }">
                <span>{{ row.updator || '-' }}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态">
              <template slot-scope="{ row }">
                <span
                  :class="labelState[row.categoryReasonState]"
                  class="label-text"
                  >{{ row.categoryReasonState == 0 ? '启用' : '禁用' }}</span
                >
              </template>
            </el-table-column>
            <el-table-column label="操作" >
              <template slot-scope="{ row }">
                <div class="flex-center">
                  <HoverTip
                    :content="row.categoryReasonState == 0 ? '禁用' : '启用'"
                    :tip-class-name="
                      row.categoryReasonState == 0
                        ? 'icon-disable'
                        : 'icon-enable'
                    "
                    @click.native.prevent="updateStatus(row)"
                  />
                  <!-- <span class="pointer" :class="row.categoryReasonState == 0 ?'icon-disable' : 'icon-enable'" @click="updateStatus(row)"></span> -->
                </div>
                <!-- <span class="icon-add pointer" @click="edit(row.id, 'edit')"></span> -->
              </template>
            </el-table-column>
            <div slot="empty" class="empty-img" />
          </el-table>
          <el-table
            v-else
            v-loading="tableLoading"
            class="table-large"
            :data="dataList"
          >
            <el-table-column label="序号" >
              <template slot-scope="{ $index }">
                <span>{{ $index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="类目" show-overflow-tooltip>
              <template slot-scope="{ row }">
                <span>{{ row.categoryName || '-' }}</span>
              </template>
            </el-table-column>
            <el-table-column label="维护时间" >
              <template slot-scope="{ row }">
                <span>{{
                  $moment(row.updateTime).format('YYYY-MM-DD HH:mm:ss')
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="维护人">
              <template slot-scope="{ row }">
                <span>{{ row.updator || '-' }}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态">
              <template slot-scope="{ row }">
                <span
                  :class="labelState[row.categoryState]"
                  class="label-text"
                  >{{ row.categoryState == 0 ? '启用' : '禁用' }}</span
                >
              </template>
            </el-table-column>
            <el-table-column label="操作" >
              <template slot-scope="{ row }">
                <div class="flex-box">
                  <HoverTip
                    :content="row.categoryState == 0 ? '禁用' : '启用'"
                    :tip-class-name="
                      row.categoryState == 0 ? 'icon-disable' : 'icon-enable'
                    "
                    @click.native.prevent="updateStatus(row)"
                  />
                  <!-- <span class="pointer" :class="row.categoryState == 0 ?'icon-disable' : 'icon-enable'" @click="updateStatus(row)"></span> -->
                </div>
                <!-- <span class="icon-add pointer" @click="edit(row.id, 'edit')"></span> -->
              </template>
            </el-table-column>
            <div slot="empty" class="empty-img" />
          </el-table>
        </div>
      </div>
      <Pagination
        :total="total"
        :limit="query.pageSize"
        :page.sync="query.pageNum"
        layout="total, prev, pager, next"
        @pagination="list"
      />
    </el-scrollbar>
    <cateEditDialog
      :id="rowId"
      :visible.sync="cateEditVisible"
      :is-reason="isReason"
      @saved="list()"
    />
  </el-container>
</template>

<script>
import cateEditDialog from './conponments/cateEditDialog.vue';
import { labelState } from '@/utils/enum';
export default {
  name: 'examineReason',
  components: { cateEditDialog },
  data() {
    return {
      query: {
        reasonsFailure: '',
        categoryState: '',
        categoryId: null,
        pageSize: 10,
        pageNum: 1
      },
      btns: [
        {
          name: '类目设置',
          value: '0'
        },
        {
          name: '原因设置',
          value: '1'
        }
      ],
      activeName: '0',
      total: 0,
      dataList: [],
      reasonList: [],
      rowId: null,
      labelState,
      tableLoading: false,
      cateEditVisible: false,
      reasonEditVisible: false,
      selectList: []
    };
  },
  computed: {
    // 返回已启用的类目
    filterDataList() {
      return this.dataList.filter(item => item.categoryState === 0);
    },
    // isReason 是否为原因设置
    isReason() {
      return this.activeName === '1';
    }
  },
  created() {
    this.list();
  },
  methods: {
    // 获取数据
    list() {
      this.tableLoading = true;
      const query = this.$delEmptyKey(this.query);
      if (this.isReason) {
        if (query.categoryState !== undefined) {
          query.categoryReasonState = query.categoryState;
        }
        this.$store.dispatch('examineReason/getReasonList', query).then(res => {
          this.reasonList = res.records || [];
          this.total = res.totalNum;
        });
      } else {
        this.$store.dispatch('examineReason/getCatelist', query).then(res => {
          this.dataList = res.records || [];
          this.total = res.totalNum;
        });
      }
      this.$nextTick(() => {
        this.tableLoading = false;
      });
    },
    // 清空筛选条件
    clearFilter() {
      this.query = {
        reasonsFailure: '',
        categoryId: null,
        categoryState: null,
        pageSize: 10,
        pageNum: 1
      };
      // 获取列表数据
      this.$nextTick(() => {
        this.list();
      });
    },
    /**
     * 新增或者编辑
     * @param { id }
     */
    edit(id) {
      this.rowId = id;
      this.cateEditVisible = true;
    },
    /**
     * 切换原因设置和类目设置
     */
    toggleSetting(val) {
      this.activeName = val;
      this.clearFilter();
      if (this.isReason) {
        // 获取下拉类目数据
        this.getAllCateList();
      }
    },
    /**
     * 跟新启用禁用状态
     */
    updateStatus(data) {
      const msg = this.isReason
        ? '确认切换审核原因状态?'
        : '确认切换审核类目状态?';
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.isReason) {
          this.$store
            .dispatch('examineReason/updateReasonCateStatus', {
              id: data.id,
              state: Number(!data.categoryReasonState)
            })
            .then(() => {
              this.$message.success('切换成功');
              this.list();
            });
        } else {
          this.$store
            .dispatch('examineReason/updateCateStatus', {
              id: data.id,
              state: Number(!data.categoryState)
            })
            .then(() => {
              this.$message.success('切换成功');
              this.list();
            });
        }
      });
    },
    // 获取所有的类目列表
    getAllCateList() {
      this.$store.dispatch('examineReason/getCatelist', {}).then(res => {
        this.selectList = res.records || [];
      });
    }
  }
};
</script>

<style scoped lang="scss">
.examineReason-box {
  .right-btn {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    margin-left: -8px;
  }
  .el-main {
    // padding:0px
  }
  .line-show {
    height: 20px;
    width: 100%;
    background-color: #f7f7f7;
  }

  .bg-grey {
    background-color: #f7f7f7;
  }

  .pd-24 {
    padding: 24px 24px;
  }
  .top-title {
    padding-top: 0px;
    padding-bottom: 0px;
  }
}
</style>
