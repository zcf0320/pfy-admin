<template>
  <div class="page-user">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main"
        tag="main"
        :noresize="false"
      >
        <div class="filter-form">
          <div class="title-top">账号列表</div>
          <div class="filter-box">
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">工号:</span>
                  <el-input
                    v-model="filter.employeeId"
                    placeholder="请输入工号"
                    class="search-input"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">更新时间：</span>
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
                  <span class="label-name">姓名:</span>
                  <el-input
                    v-model="filter.name"
                    placeholder="请输入姓名"
                    class="search-input"
                  />
                </div>
              </div>
              <div class="flex-box">
                <HoverTip
                  content="查询"
                  tip-class-name="icon-search"
                  class="mr-30"
                  @click.native.prevent="
                    getUserList({
                      page: 1,
                    })
                  "
                />
                <HoverTip
                  content="清除查询条件"
                  tip-class-name="icon-reset"
                  @click.native.prevent="clearFilter"
                />
              </div>
            </div>
            <div class="search-form">
              <div class="form-item">
                <span class="label-name">角色：</span>
                <el-select v-model="filter.roleId" filterable placeholder="全部">
                  <el-option
                    v-for="item in roleList"
                    :key="item.id"
                    :label="item.roleName"
                    :value="item.id"
                  />
                </el-select>
              </div>
            </div>
          </div>
        </div>
        <el-table
          v-loading="tableLoading"
          :data="employeeList"
          class="table-large"
        >
          <el-table-column label="工号">
            <template slot-scope="scope">
              <span>{{ scope.row.employeeId }}</span>
            </template>
          </el-table-column>
          <el-table-column label="登录名">
            <template slot-scope="scope">
              <span>{{ scope.row.username || '-' }}</span>
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
          <el-table-column label="状态">
            <template slot-scope="scope">
              <span>{{ scope.row.delFlag === '0' ? '正常' : '已删除' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="部门">
            <template slot-scope="scope">
              <span>{{ scope.row.deptName || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="角色">
            <template slot-scope="scope">
              <span>{{ scope.row.roles || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="更新时间">
            <template slot-scope="scope">
              <span>{{ scope.row.updateDate | timeFormat('yyyy-MM-dd') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="160">
            <template slot-scope="scope">
              <HoverTip
                v-if="pageAuthority.includes('edit')"
                content="编辑"
                tip-class-name="icon-edit"
                class="mr-30"
                @click.native.prevent="addOrEditUser(scope.row.employeeId)"
              />
              <el-popconfirm
                title="此操作将重置账号密码, 是否继续?"
                placement="top"
                confirm-button-text="确认"
                cancel-button-text="取消"
                confirm-button-type="plain"
                cancel-button-type="primary"
                :hide-icon="true"
                @onConfirm="resetPassword(scope.row.serialNo)"
              >
                <HoverTip
                  v-if="pageAuthority.includes('reset')"
                  slot="reference"
                  content="重置密码"
                  tip-class-name="ico-resetPwd"
                  class="mr-30"
                />
              </el-popconfirm>
              <el-popconfirm
                title="删除后将不可恢复，是否删除？"
                placement="top"
                confirm-button-text="确认"
                cancel-button-text="取消"
                confirm-button-type="plain"
                cancel-button-type="primary"
                :hide-icon="true"
                @onConfirm="deleteEmployee(scope.row.employeeId)"
              >
                <HoverTip
                  v-if="pageAuthority.includes('delete')"
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
          :limit="pagingOptions.pageSize"
          :total="pagingOptions.total"
          :page="pagingOptions.pageNo"
          layout="total, prev, pager, next"
          @pagination="getUserList"
        />
        <EmployeeModal
          v-if="isShow"
          :id="id"
          :is-show="isShow"
          @closeModal="closeModal"
        />
      </el-scrollbar>
    </el-container>
  </div>
</template>
<script>
import EmployeeModal from './component/employeeModal';
export default {
  name: 'User',
  components: {
    EmployeeModal
  },
  data() {
    return {
      tableLoading: false,
      isShowClear: false,
      employeeList: [],
      filter: {
        employeeId: '',
        filterTime: '',
        role: '',
        name: ''
      },
      id: '',
      isShow: false,
      pagingOptions: {
        pageSize: 10,
        total: 10,
        pageNo: 1
      },
      roleList: []
    };
  },
  computed: {
    pageNum() {
      return this.$store.state.app.pageNum || 1;
    },
    pageAuthority() {
      // 160101 账号管理
      return this.$store.state.user.pageAuthority['160101'];
    }
  },
  created() {
    // 编辑查看返回后查询之前分页数据
    if (this.pageNum) {
      this.getUserList({
        page: Number(this.pageNum)
      });
    } else {
      this.getUserList({});
    }
    this.getRoleList();
  },
  methods: {
    // 新增或者编辑角色
    addOrEditUser(id) {
      this.id = id;
      this.isShow = true;
    },
    // 关闭角色弹框this
    closeModal(type) {
      this.isShow = false;
      if (type) {
        this.getUserList({ page: this.pagingOptions.pageNo });
      }
    },
    // 删除账号
    deleteEmployee(id) {
      const vm = this;
      vm.$store.dispatch('employee/deleteEmployee', id).then(res => {
        if (!res.code) {
          vm.$message({
            type: 'success',
            message: res.comment || '删除成功'
          });
          vm.getUserList({
            page: vm.pagingOptions.pageNo
          });
        } else {
          vm.$message({
            type: 'warning',
            message: res.comment || '删除失败'
          });
        }
      });
    },
    // 修改筛选时间
    changeTime() {
      const vm = this;
      vm.filter.filterTime[1] =
        vm.filter.filterTime[1] + 3600 * 24 * 1000 - 1000;
    },
    // 查询用户列表
    getUserList(pageInfo) {
      const vm = this;
      const { page } = pageInfo;
      const params = {
        pageNum: page || 1,
        pageSize: 10
      };
      vm.filter.employeeId && (params.employeeId = vm.filter.employeeId);
      vm.filter.name && (params.name = vm.filter.name);
      vm.filter.roleId && (params.roleId = vm.filter.roleId);
      if (vm.filter.filterTime.length) {
        params.updateDateStart = vm.filter.filterTime[0];
        params.updateDateEnd = vm.filter.filterTime[1];
      }
      vm.tableLoading = true;
      this.$store.dispatch('employee/getEmployeeList', params).then(res => {
        vm.tableLoading = false;
        if (res.obj) {
          const { totalNum, records } = res.obj;
          vm.employeeList = records || [];
          vm.pagingOptions.pageNo = params.pageNum;
          vm.pagingOptions.total = totalNum;
        } else {
          vm.employeeList = [];
          vm.pagingOptions.pageNo = 1;
          vm.pagingOptions.total = 0;
        }
      });
    },
    // 清除筛选项
    clearFilter() {
      this.filter = {
        employeeId: '',
        filterTime: '',
        role: '',
        name: ''
      };
      this.getUserList({});
    },
    // 获取角色列表
    getRoleList() {
      const vm = this;
      vm.$store.dispatch('role/getRoleList').then(res => {
        vm.roleList = res.obj;
      });
    },
    // 重置密码
    resetPassword(id) {
      const vm = this;
      vm.$store.dispatch('employee/resetPassword', id).then(res => {
        if (!res.code) {
          vm.$message({
            type: 'success',
            message: '操作成功'
          });
          vm.getUserList({
            page: vm.pagingOptions.pageNo
          });
        } else {
          vm.$message({
            type: 'warning',
            message: '操作失败'
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped></style>
