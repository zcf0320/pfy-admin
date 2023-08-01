<template>
  <div class="health-column-page">
    <el-container>
      <!-- <el-main class="filter-form"> -->
      <el-scrollbar
        :native="false"
        wrap-class="el-main filter-form"
        tag="main"
        :noresize="false"
      >
        <div class="filter-box">
          <div class="title-top">
            内容列表<button
              type="button"
              class="btn-save fr"
              @click="addContent"
            >
              新增
            </button>
          </div>
          <div class="search-form flex-between">
            <div class="flex-box">
              <div class="form-item">
                <span class="label-name">标题:</span>
                <el-input
                  v-model="filter.tittle"
                  placeholder="请输入标题"
                  class="search-input"
                />
              </div>
              <div class="form-item">
                <span class="label-name">分类:</span>
                <el-select v-model="filter.specialColumnId" filterable placeholder="全部">
                  <el-option
                    v-for="item in specialColumns"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </div>
              <div class="form-item">
                <span class="label-name">更新时间:</span>
                <el-date-picker
                  v-model="filter.filterTime"
                  type="daterange"
                  value-format="timestamp"
                  :clearable="isShowClear"
                  :editable="false"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="changeTime"
                />
              </div>
            </div>

            <div class="flex-box">
              <HoverTip
                content="查询"
                tip-class-name="icon-search mr-30"
                @click.native.prevent="getContentList({ page: 1 })"
              />
              <HoverTip
                content="清除查询条件"
                tip-class-name="icon-reset"
                @click.native.prevent="clearFilter"
              />
            </div>
          </div>
          <div class="search-form flex-between">
            <div class="flex-box">
              <div class="form-item">
                <span class="label-name">状态:</span>
                <el-select
                  v-model="filter.postStatus"
                  placeholder="全部"
                  clearable
                  @change="getContentList({ page: 1 })"
                >
                  <el-option
                    v-for="item in statusList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </div>
            </div>
          </div>
        </div>
        <el-table
          v-loading="tableLoading"
          :data="contentList"
          class="table-large"
        >
          <el-table-column label="标题">
            <template slot-scope="scope">
              <span
                class="link-skip"
                @click="lookDetails(scope.row.id, 0, scope.row.postStatus)"
                >{{ scope.row.tittle || '-' }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="专栏">
            <template slot-scope="scope">
              <span>{{ scope.row.specialColumnName || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <span
                :class="['label-text', columnPostStatus[scope.row.postStatus]]"
                >{{ postStatusObj[scope.row.postStatus] || '-' }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="更新时间">
            <template slot-scope="scope">
              <span>{{
                $moment(scope.row.updateTime).format('YYYY-MM-DD HH:mm:ss')
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <HoverTip
                content="查看"
                tip-class-name="icon-detail  mr-30"
                @click.native.prevent="
                  lookDetails(scope.row.id, 0, scope.row.postStatus)
                "
              />
              <HoverTip
                content="编辑"
                tip-class-name="icon-edit  mr-30"
                @click.native.prevent="
                  lookDetails(scope.row.id, 1, scope.row.postStatus)
                "
              />
              <el-popconfirm
                title="删除后将不可恢复，是否删除？"
                placement="top"
                confirm-button-text="确认"
                cancel-button-text="取消"
                confirm-button-type="plain"
                cancel-button-type="primary"
                :hide-icon="true"
                @onConfirm="deleteContent(scope.row.id)"
              >
                <HoverTip
                  slot="reference"
                  content="删除"
                  tip-class-name="icon-delete"
                />
              </el-popconfirm>
            </template>
          </el-table-column>
          <div slot="empty" class="empty-img" />
        </el-table>
        <Pagination
          :total="pagingOptions.total"
          :limit="pagingOptions.pageSize"
          :page="pagingOptions.pageNo"
          layout="total, prev, pager, next"
          @pagination="getContentList"
        />
        <!-- </el-main> -->
      </el-scrollbar>
    </el-container>
  </div>
</template>
<script>
import { contentType } from '@/utils/enum';
import { postStatusObj, columnPostStatus } from '@/utils/enum';
export default {
  name: 'ContentManage',
  data() {
    return {
      tableLoading: false,
      isShowClear: false,
      show: false,
      filter: {
        tittle: '',
        types: [],
        filterTime: '',
        postStatus: ''
      },
      pagingOptions: {
        pageSize: 10,
        total: 10,
        pageNo: 1
      },
      contentList: [],
      serviceList: [],
      contentType,
      specialColumns: [],
      optionProps: {
        label: 'name',
        value: 'id'
      },
      statusList: [],
      postStatusObj,
      columnPostStatus
    };
  },
  computed: {
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    }
  },
  created() {
    this.getStatus();
    this.getContentList();
    if (this.pageNum) {
      this.getContentList({
        page: Number(this.pageNum)
      });
    } else {
      this.getContentList({});
    }
    // 分类
    this.$store
      .dispatch('app/getSysConfig', {
        code: 'specialColumn'
      })
      .then(res => {
        this.specialColumns = res.obj;
      });
  },
  methods: {
    // 筛选时间改变
    changeTime() {
      const vm = this;
      vm.filter.filterTime[1] =
        vm.filter.filterTime[1] + 3600 * 24 * 1000 - 1000;
    },
    // 清除筛选项
    clearFilter() {
      this.filter = {
        tittle: '',
        types: [],
        filterTime: '',
        postStatus: ''
      };
      this.getContentList();
    },
    // 获取文章列表
    getContentList(pageInfo) {
      const vm = this;
      if (pageInfo && pageInfo.page) {
        vm.pagingOptions.pageNo = pageInfo.page;
      }
      const params = {
        ...vm.filter,
        pageNum: vm.pagingOptions.pageNo,
        startTime: vm.filter.filterTime.length ? vm.filter.filterTime[0] : '',
        endTime: vm.filter.filterTime.length ? vm.filter.filterTime[1] : ''
      };
      for (const key in params) {
        if (params[key] === '') {
          delete params[key];
        }
      }
      delete params.filterTime;
      vm.tableLoading = true;
      vm.$store
        .dispatch('healthColumn/getHealthColumnList', params)
        .then(res => {
          vm.tableLoading = false;
          vm.contentList = res.records || [];
          vm.pagingOptions.total = res.totalNum;
        })
        .catch(() => {
          vm.tableLoading = false;
        });
    },
    // 查看详情
    lookDetails(id, type, status) {
        if (type === 1) {
             this.$router.push(
        `/healthColumn/content-edit/${id}/${type}/${status}`,
      );
        } else {
             this.$router.push(
        `/healthColumn/contentDetails/details/${id}/${type}/${status}`,
      );
        }
    },
    // 新增
    addContent() {
      this.$router.push(`/healthColumn/createContent`);
    },
    // 删除
    deleteContent(id) {
      const vm = this;

      vm.$store
        .dispatch('healthColumn/deleteHealthColumn', {
          id
        })
        .then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: res.comment
            });
            this.getContentList();
          } else {
            this.$message({
              type: 'warning',
              message: res.comment
            });
          }
        });
    },
    getStatus() {
      this.$store
        .dispatch('app/getSysConfig', {
          code: 'postStatus'
        })
        .then(res => {
          this.statusList = res.obj || [];
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.health-column-page {
  width: 100%;
  width: 100%;
  .operation-buttons {
    margin-bottom: 24px;
    .el-button {
      margin-right: 24px;
    }
    .el-select {
      margin-right: 24px;
    }
  }
  .clear {
    color: #ff625e;
    border-color: #ff625e;
    &:hover {
      background-color: #ffefef;
    }
  }
  .export-button {
    color: #2276ff;
    border-color: #2276ff;
    &:hover {
      background-color: #ecf5ff;
    }
  }
}
</style>
