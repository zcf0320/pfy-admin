<template>
  <div class="health-column-page">
    <el-container>
      <!-- <el-main> -->
      <el-scrollbar
        :native="false"
        wrap-class="el-main filter-form"
        tag="main"
        :noresize="false"
      >
        <div class="title-top">
          应用设置<button
            type="button"
            class="btn-save fr"
            @click="addServiceType"
          >
            新增
          </button>
        </div>
        <div class="filter-box">
          <div class="search-form flex-between">
            <div class="flex-box">
              <div class="form-item">
                <span class="label-name">专栏名称:</span>
                <el-input
                  v-model="filter.title"
                  placeholder="请输入服务类型名称"
                  class="search-input"
                />
              </div>
              <div class="form-item">
                <span class="label-name">关联专栏:</span>
                <el-select
                  v-model="filter.specialColumnName"
                  filterable
                  placeholder="全部"
                >
                  <el-option
                    v-for="item in specialColumns"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
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
                @click.native.prevent="
                  getHealthColumnApplicationList({ page: 1 })
                "
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
          v-loading="tableLoading"
          :data="contentList"
          class="table-large"
        >
          <el-table-column label="专栏名称" width="310">
            <template slot-scope="scope">
              <span class="link-skip" @click="edit(scope.row.id)">{{
                scope.row.name || '-'
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="关联专栏" show-overflow-tooltip>
            <template slot-scope="scope" class="text-overflow">
              <span
                v-for="(item, index) in scope.row.specialColumnNames"
                :key="index"
                class="mr-5"
                >{{ index > 0 ? ';' : '' }}{{ item }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="更新时间" width="200">
            <template slot-scope="scope">
              <span>{{
                scope.row.updateTime
                  ? $moment(scope.row.updateTime).format('YYYY-MM-DD HH:mm:ss')
                  : '-'
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <HoverTip
                content="编辑"
                tip-class-name="icon-edit  mr-30"
                @click.native.prevent="edit(scope.row.id)"
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
          @pagination="getHealthColumnApplicationList"
        />
        <!-- </el-main> -->
      </el-scrollbar>
      <ServiceModal
        v-if="show"
        :id="id"
        :is-show="show"
        @close="close"
        @sure="sure"
      />
    </el-container>
  </div>
</template>
<script>
import ServiceModal from './component/serviceTypeModal';
export default {
  name: 'ContentManage',
  components: {
    ServiceModal
  },
  data() {
    return {
      tableLoading: false,
      isShowClear: false,
      show: false,
      pagingOptions: {
        pageSize: 10,
        total: 10,
        pageNo: 1
      },
      filter: {
        title: '',
        specialColumnName: [],
        filterTime: []
      },
      contentList: [],
      id: '',
      currentItem: {
        name: '',
        specialColumn: []
      },
      specialColumns: []
    };
  },
  computed: {
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    }
  },
  created() {
    // 获取带过来的名字
    this.filter.title = localStorage.getItem('healthColumnName') || '';
    localStorage.removeItem('healthColumnName');

    this.getHealthColumnApplicationList();
    this.$store
      .dispatch('app/getSysConfig', {
        code: 'specialColumn'
      })
      .then(res => {
        this.specialColumns = res.obj;
      });
    if (this.pageNum) {
      this.getHealthColumnApplicationList({
        page: Number(this.pageNum)
      });
    } else {
      this.getHealthColumnApplicationList({});
    }
  },
  methods: {
    changeTime() {
      const vm = this;
      vm.filter.filterTime[1] =
        vm.filter.filterTime[1] + 3600 * 24 * 1000 - 1000;
    },
    // 清除筛选项
    clearFilter() {
      this.filter = {
        title: '',
        types: [],
        filterTime: [],
        specialColumnId: [],
        specialColumnName: []
      };
      this.getHealthColumnApplicationList({ page: 1 });
    },
    // 获取应用列表
    getHealthColumnApplicationList(pageInfo) {
      const vm = this;
      if (pageInfo && pageInfo.page) {
        vm.pagingOptions.pageNo = pageInfo.page;
      }
      vm.tableLoading = true;
      const params = {
        pageNum: vm.pagingOptions.pageNo,
        pageSize: vm.pagingOptions.pageSize
      };
      vm.filter.title && (params.title = vm.filter.title);
      vm.filter.filterTime.length &&
        (params.startTime = vm.filter.filterTime[0]);
      vm.filter.filterTime.length && (params.endTime = vm.filter.filterTime[1]);
      vm.filter.specialColumnName.length &&
        (params.specialColumnNames = vm.filter.specialColumnName);
      vm.$store
        .dispatch('healthColumn/getHealthColumnApplicationList', params)
        .then(res => {
          vm.tableLoading = false;
          vm.contentList = res.records || [];
          vm.pagingOptions.total = res.totalNum;
        })
        .catch(() => {
          vm.tableLoading = false;
        });
    },
    // 新增服务分类
    addServiceType() {
      this.id = 0;
      this.show = true;
    },
    // 编辑
    edit(id) {
      this.id = id;
      this.show = true;
    },
    // 关闭弹框
    close() {
      this.show = false;
    },
    // 确认新增
    sure() {
      this.show = false;
      this.getHealthColumnApplicationList();
    },
    // 删除
    deleteContent(id) {
      const vm = this;
      vm.$store
        .dispatch('healthColumn/deleteHealthColumnApplication', {
          id
        })
        .then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: res.comment
            });
            this.getHealthColumnApplicationList();
          } else {
            this.$message({
              type: 'warning',
              message: res.comment
            });
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.health-column-page {
  width: 100%;
  width: 100%;
  .filter-box {
    width: 100%;
    position: relative;
    // .search-form {
    //     display: flex;
    //     flex-wrap: wrap;
    //     position: relative;
    //     height: 50px;
    //     .form-item {
    //         display: flex;
    //         align-items: center;
    //         margin: 0 24px 24px 0;
    //         span {
    //             display: inline-block;
    //             min-width: 65px;
    //             color: #555;
    //             font-size: 14px;
    //         }
    //         .search-input {
    //             width: 200px;
    //         }
    //     }
    //     .add-button {
    //         position: absolute;
    //         right: 0;
    //     }
    // }
  }
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
