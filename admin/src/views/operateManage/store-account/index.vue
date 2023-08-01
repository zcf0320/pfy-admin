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
          <div class="title-top">
            账号列表
            <button type="button" class="btn-save fr" @click="isShow = true">
              新增
            </button>
          </div>
          <div class="filter-box">
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">ID:</span>
                  <el-input
                    v-model="filter.id"
                    placeholder="请输入ID"
                    class="search-input"
                  />
                </div>

                <div class="form-item">
                  <span class="label-name">账号名:</span>
                  <el-input
                    v-model="filter.name"
                    placeholder="请输入账号名"
                    class="search-input"
                  />
                </div>
                <div class="form-item">
                  <span class="label-name">所属门店:</span>
                  <el-select
                    v-model="filter.drugstoreId"
                    filterable
                    placeholder="全部"
                  >
                    <el-option
                      v-for="item in storeList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </div>
              </div>
              <div class="flex-box">
                <HoverTip
                  content="查询"
                  tip-class-name="icon-search"
                  class="mr-30"
                  @click.native.prevent="
                    loadData({
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
            <div class="search-form flex-between">
              <div class="flex-box">
                <div class="form-item">
                  <span class="label-name">状态</span>
                  <el-select v-model="filter.openStatus" placeholder="全部">
                    <el-option label="开启" :value="0" />
                    <el-option label="关闭" :value="1" />
                  </el-select>
                </div>
                 <div class="form-item">
                  <span class="label-name">角色：</span>
                  <el-select v-model="filter.roleId" filterable placeholder="全部">
                    <el-option
                      v-for="item in storeRolesList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </div>
              </div>
              <!-- <div class="flex-box">
                <HoverTip
                  content="查询"
                  tip-class-name="icon-search"
                  class="mr-30"
                  @click.native.prevent="
                    loadData({
                      page: 1,
                    })
                  "
                />
                <HoverTip
                  content="清除查询条件"
                  tip-class-name="icon-reset"
                  @click.native.prevent="clearFilter"
                />
              </div> -->
            </div>
          </div>
        </div>
        <el-table
          v-loading="tableLoading"
          :data="storeAccountList"
          class="table-large"
        >
          <el-table-column label="ID">
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="账号名">
            <template slot-scope="scope">
              <span>{{ scope.row.name || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="角色">
            <template slot-scope="scope">
              <span>{{ scope.row.roleName || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="所属门店">
            <template slot-scope="scope">
              <span>{{ scope.row.drugstoreName || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <span>{{ scope.row.openStatus === 0 ? '开启' : '关闭' }}</span>
            </template>
          </el-table-column>

          <el-table-column label="更新时间">
            <template slot-scope="scope">
              <span>{{ scope.row.updateTime || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="160">
            <template slot-scope="scope">
              <el-popconfirm
                title="此操作将重置账号密码, 是否继续?"
                placement="top"
                confirm-button-text="确认"
                cancel-button-text="取消"
                confirm-button-type="plain"
                cancel-button-type="primary"
                :hide-icon="true"
                @onConfirm="resetPassword(scope.row.id)"
              >
                <HoverTip
                  slot="reference"
                  content="重置密码"
                  tip-class-name="ico-resetPwd"
                  class="mr-30"
                />
              </el-popconfirm>
              <el-popconfirm
                title="删除后将不可恢复，是否删除?"
                placement="top"
                confirm-button-text="确认"
                cancel-button-text="取消"
                confirm-button-type="plain"
                cancel-button-type="primary"
                :hide-icon="true"
                @onConfirm="deleteAccount(scope.row.id)"
              >
                <HoverTip
                  slot="reference"
                  content="删除"
                  tip-class-name="icon-delete"
                  class="mr-30"
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
          @pagination="loadData"
        />
        <Dialog
          title="新增账号"
          :visible.sync="isShow"
          :height="480"
          :width="626"
          @closed="closeModal"
        >
          <el-form
            inline
            ref="ruleForm"
            label-width="100px"
            :model="ruleForm"
            :rules="rules"
            class="channel-form"
          >
            <el-form-item label="账号名" prop="employeeId">
              <el-select
                v-model="ruleForm.employeeId"
                filterable
                placeholder="全部"
              >
                <el-option
                  v-for="item in employeeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="角色" prop="roleId">
              <el-select v-model="ruleForm.roleId" filterable placeholder="全部">
                <el-option
                  v-for="item in storeRolesList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <div>
              <el-form-item label="状态" prop="openStatus">
                <el-radio-group v-model="ruleForm.openStatus">
                  <el-radio :label="0">开启</el-radio>
                  <el-radio :label="1">关闭</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>

            <el-form-item label="所属门店" prop="drugstoreId">
              <el-select
                v-model="ruleForm.drugstoreId"
                filterable
                placeholder="全部"
              >
                <el-option
                  v-for="item in storeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="closeModal">取 消</el-button>
            <el-button type="primary" :loading="saveLoading" @click="save"
              >确 定</el-button
            >
          </span>
        </Dialog>
      </el-scrollbar>
    </el-container>
  </div>
</template>
<script>
import { default as api } from '@/api/storemanage';
export default {
  name: 'StoreAccountManage',
  data() {
    return {
      tableLoading: false,
      storeAccountList: [],
      storeRolesList: [],
      storeList: [],
      filter: {
        drugstoreId: '',
        id: '',
        roleId: '',
        name: '',
        openStatus: '',
        pageNum: 1,
        pageSize: 10
      },
      isShow: false,
      pagingOptions: {
        pageSize: 10,
        total: 10,
        pageNo: 1
      },
      employeeList: [],
      ruleForm: {
        drugstoreId: '',
        roleId: '',
        employeeId: '',
        openStatus: 0
      },
      rules: {
        employeeId: [
          {
            required: true,
            message: '请选择账号',
            trigger: 'change'
          }
        ],

        roleId: [
          {
            required: true,
            message: '请选择角色',
            trigger: 'change'
          }
        ],
        drugstoreId: {
          required: true,
          message: '请选择门店',
          trigger: 'change'
        }
      },
      saveLoading: false
    };
  },
  created() {
    this.loadData();
    api.getStoreList().then(res => {
      this.storeList = res.data;
    });
    api.getStoreRolesList().then(res => {
      this.storeRolesList = res.data;
    });
    api.getStoreEmployeeList().then(res => {
      this.employeeList = res.data;
    });
  },
  methods: {
    loadData(pageInfo) {
      if (pageInfo && pageInfo.page) {
        this.pagingOptions.pageNo = pageInfo.page;
      }
      this.filter.pageNum = this.pagingOptions.pageNo;
      this.tableLoading = true;
      api
        .getStoreAccountList(this.filter)
        .then(res => {
          this.tableLoading = false;
          this.storeAccountList = res.data;
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    clearFilter() {
      this.filter = {
        drugstoreId: '',
        id: '',
        roleId: '',
        name: '',
        openStatus: '',
        pageNum: 1,
        pageSize: 10
      };
      this.loadData({ page: 1 });
    },
    closeModal() {
      this.ruleForm = {
        drugstoreId: '',
        roleId: '',
        name: '',
        openStatus: 0
      };
      this.isShow = false;
    },
    save() {
      this.saveLoading = true;
      this.$refs['ruleForm'].validate(valid => {
        if (!valid) {
          this.saveLoading = false;
          return false;
        }

        api
          .updateStoreAccount(this.ruleForm)
          .then(() => {
            this.$message.success('保存成功');
            this.isShow = false;
            this.saveLoading = false;
            this.loadData();
            this.$refs.ruleForm.resetFields();
          })
          .catch(() => {
            this.saveLoading = false;
          });
      });
    },
    resetPassword(id) {
      api.resetPwd(id).then(res => {
        this.$message.success(res.message);
      });
    },
    deleteAccount(id) {
      api.deleteStoreAccount(id).then(res => {
        this.$message.success(res.message);
        this.loadData();
      });
    }
  }
};
</script>
<style lang="scss" scoped></style>
