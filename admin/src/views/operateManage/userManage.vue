<template>
  <div class="user-manage-page">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main"
        tag="main"
        :noresize="false"
      >
        <div class="filter-form">
          <div class="title-top">
            用户管理
            <el-button
              v-if="pageAuthority.includes('export')"
              type="primary"
              class="btn-save fr"
              :loading="exportLoading"
              @click="exportList"
              >导出数据</el-button
            >
          </div>
          <div class="filter-box">
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">用户ID:</span>
                  <el-input
                    v-model="filter.id"
                    placeholder="请输入用户ID"
                    class="search-input"
                    @keyup.enter.native="getUserList({ page: 1 })"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">姓名:</span>
                  <el-input
                    v-model="filter.name"
                    placeholder="请输入姓名"
                    class="search-input"
                    @keyup.enter.native="getUserList({ page: 1 })"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">手机号:</span>
                  <el-input
                    v-model="filter.mobile"
                    placeholder="请输入手机号"
                    class="search-input"
                    @keyup.enter.native="getUserList({ page: 1 })"
                  />
                </div>
              </div>
              <div class="flex-box">
                <HoverTip
                  content="查询"
                  tip-class-name="icon-search"
                  class="mr-30"
                  @click.native.prevent="getUserList({ page: 1 })"
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

                <div class="form-item">
                  <span class="label-name">账号状态:</span>
                  <el-select
                    v-model="filter.logoutFlag"
                    placeholder="全部"
                    class="search-input"
                    @change="getUserList({ page: 1 })"
                  >
                    <el-option label="全部" :value="0" />
                    <el-option label="正常" :value="1" />
                    <el-option label="已注销" :value="2" />
                  </el-select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-table v-loading="tableLoading" :data="userList" class="table-large">
          <el-table-column label="用户ID">
            <template slot-scope="scope">
              <span>{{ scope.row.id || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="姓名">
            <template slot-scope="scope">
              <span>{{ scope.row.name || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="手机号">
            <template slot-scope="scope">
              <span>{{ scope.row.mobile || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="账号状态">
            <template slot-scope="scope">
              <span :class="scope.row.logout ? 'logout' : 'active'">{{
                scope.row.logout ? '已注销' : '正常'
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="更新时间">
            <template slot-scope="scope">
              <span>{{ scope.row.createTime | timeFormat('yyyy-MM-dd') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80">
            <template slot-scope="scope">
              <HoverTip
                v-if="pageAuthority.includes('detail')"
                content="查看"
                tip-class-name="icon-detail"
                @click.native.prevent="lookDetails(scope.row.id)"
              />
            </template>
          </el-table-column>
          <div slot="empty" class="empty-img" />
        </el-table>
        <Pagination
          :total="pagingOptions.total"
          :limit="pagingOptions.pageSize"
          :page="pagingOptions.pageNo"
          layout="total, prev, pager, next"
          @pagination="getUserList"
        />
        <ExportDialog
          :dialog-visible.sync="showExportDia"
          :close="
            () => {
              showExportDia = false;
            }
          "
          @sure-submit="sureExport"
        />
      </el-scrollbar>
    </el-container>
  </div>
</template>
<script>
import ExportApi from '@/api/exportApi';
import ExportDialog from '@/components/ExportDialog';
export default {
  name: 'UserManage',
  components: { ExportDialog },
  data() {
    return {
      tableLoading: false,
      isShowClear: false,
      show: false,
      filter: {
        id: '',
        name: '',
        mobile: '',
        filterTime: '',
        logoutFlag: ''
      },
      pagingOptions: {
        pageSize: 10,
        total: 0,
        pageNo: 1
      },
      userList: [],
      exportLoading: false,
      showExportDia: false
    };
  },
  computed: {
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    },
    pageAuthority() {
      // 110101 用户管理
      return this.$store.state.user.pageAuthority['110101'];
    }
  },
  created() {
    if (this.pageNum) {
      this.getUserList({
        page: Number(this.pageNum)
      });
    } else {
      this.getUserList({});
    }
  },
  methods: {
    // 生成激活码
    addActivationCode() {},
    // 筛选时间改变
    changeTime() {
      const vm = this;
      vm.filter.filterTime[1] =
        vm.filter.filterTime[1] + 3600 * 24 * 1000 - 1000;
      vm.getUserList({ page: 1 });
    },
    // 清除筛选项
    clearFilter() {
      this.filter = {
        id: '',
        name: '',
        mobile: '',
        filterTime: '',
        logoutFlag: ''
      };
      this.getUserList();
    },
    // 获取用户列表
    getUserList(pageInfo) {
      const vm = this;
      if (pageInfo && pageInfo.page) {
        vm.pagingOptions.pageNo = pageInfo.page;
      }
      const params = {
        logoutFlag: 1,
        ...vm.filter,
        pageNum: vm.pagingOptions.pageNo,
        updateStartTime: vm.filter.filterTime.length
          ? vm.filter.filterTime[0]
          : '',
        updateEndTime: vm.filter.filterTime.length
          ? vm.filter.filterTime[1]
          : ''
      };
      for (const key in params) {
        if (params[key] === '') {
          delete params[key];
        }
      }
      delete params.filterTime;
      vm.tableLoading = true;
      vm.$store
        .dispatch('userManage/getUserList', params)
        .then(res => {
          vm.tableLoading = false;
          vm.userList = res.records;
          vm.pagingOptions.total = res.totalNum;
        })
        .catch(() => {
          vm.tableLoading = false;
        });
    },
    // 导出
    exportList() {
      this.exportLoading = true;
      const vm = this;
      const params = {
        ...vm.filter,
        updateStartTime: vm.filter.filterTime.length
          ? vm.filter.filterTime[0]
          : '',
        updateEndTime: vm.filter.filterTime.length
          ? vm.filter.filterTime[1]
          : ''
      };
      for (const key in params) {
        if (params[key] === '') {
          delete params[key];
        }
      }
      delete params.filterTime;
      ExportApi.getUserListCount(params)
        .then(res => {
          if (res.data >= 10) {
            this.showExportDia = true;
            this.exportLoading = false;
          } else {
            this.$store
              .dispatch('userManage/exportUser', params)
              .then(res => {
                this.exportLoading = false;
                if (!res.status) {
                  this.$message.warning(res.comment);
                  return;
                }
                window.location.href = res.url;
              })
              .catch(() => {
                this.exportLoading = false;
              });
          }
        })
        .catch(() => {
          this.exportLoading = false;
        });
    },
    // 确认邮箱导出
    sureExport(email) {
      const vm = this;
      const params = {
        ...vm.filter,
        updateStartTime: vm.filter.filterTime.length
          ? vm.filter.filterTime[0]
          : '',
        updateEndTime: vm.filter.filterTime.length
          ? vm.filter.filterTime[1]
          : ''
      };
      for (const key in params) {
        if (params[key] === '') {
          delete params[key];
        }
      }
      delete params.filterTime;
      params.email = email;
      this.$store.dispatch('userManage/exportUser', params).then(res => {
        if (!res.status) {
          this.$message.warning(res.comment);
          return;
        } else {
          this.$message.success(res.comment);
          this.showExportDia = false;
        }
      });
    },
    // 查看详情
    lookDetails(id) {
      this.$router.push(`/operateManage/userManage/details/${id}`);
    }
  }
};
</script>
<style lang="scss" scoped>
.user-manage-page {
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
  .logout {
    font-size: 14px;
    font-weight: 400;
    color: #f64e60;
  }
  .active {
    font-size: 14px;
    font-weight: 400;
    color: #63d8da;
  }
}
</style>
