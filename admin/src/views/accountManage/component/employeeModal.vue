<template>
  <div class="user-modal modal-form">
    <el-dialog
      :title="`${id === '' ? '新增账号' : '编辑账号'}`"
      :visible="isShow"
      width="548px"
      center
      :close-on-click-modal="closeClickModal"
      @close="closeModal"
    >
      <div class="user-form">
        <Tab :btns="btns" :current-key="activeName" @change="handleClick" />
        <div class="mt-10 user-scroll" v-if="activeName === '0'"
        >
          <el-form
            ref="baseForm"
            :model="baseForm"
            :rules="rules"
            label-width="100px"
            label-position="top"
          >
            <el-row>
              <el-col :span="24">
                <el-form-item label="工号:" prop="employeeId">
                  <el-input
                    v-model="baseForm.employeeId"
                    placeholder="请输入工号"
                    :disabled="id ? true : false"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="登录名:" prop="username">
                  <el-input
                    v-model="baseForm.username"
                    placeholder="登录名为姓名拼音"
                    :disabled="!userNameEnableUpdate"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="姓名:" prop="name">
                  <el-input
                    v-model="baseForm.name"
                    placeholder="请输入姓名"
                    disabled
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="手机号:" prop="mobile">
                  <el-input
                    v-model="baseForm.mobile"
                    maxlength="11"
                    placeholder="请输入手机号"
                    disabled
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="邮箱:">
                  <el-input
                    v-model="baseForm.email"
                    maxlength="50"
                    placeholder="请输入邮箱"
                    disabled
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="部门:" prop="department">
                  <el-input
                    v-model="baseForm.deptName"
                    maxlength="50"
                    placeholder="请输入部门"
                    disabled
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="角色:" prop="roles">
                  <el-select
                    v-model="baseForm.roles"
                    multiple
                    filterable
                    placeholder="请选择角色"
                  >
                    <el-option
                      v-for="item in roleList"
                      :key="item.id"
                      :label="item.roleName"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col v-if="!id" :span="24">
                <el-form-item label="密码（初始密码：123456):" prop="showPsw">
                  <el-input
                    v-model="baseForm.showPsw"
                    show-password
                    disabled
                    placeholder="请输入角色名"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="mt-10" v-if="activeName === '1'">
          <Logs :id="id" :type="'116'" :has-o-a-log="true" />
        </div>
      </div>
      <div v-if="activeName === '0'" slot="footer" class="dialog-footer">
        <el-button @click="closeModal">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="submit('baseForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
const md5 = require('md5');
export default {
  name: 'EmployeeModal',
  props: {
    isShow: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      closeClickModal: false,
      baseForm: {
        employeeId: '',
        username: '',
        name: '',
        mobile: '',
        department: [],
        roles: [],
        showPsw: '123456',
        password: md5('123456').toUpperCase(),
        twoLevelDept: '',
        oneLevelDept: '',
        email: '',
        twoLevelDeptName: '',
        oneLevelDeptName: '',
        deptName: ''
      },
      roleList: [],
      rules: {
        employeeId: [
          { required: true, message: '请输入工号', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入登录名', trigger: 'blur' }
        ],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        department: [
          { required: true, message: '请输入部门', trigger: 'blur' }
        ],
        roles: [{ required: true, message: '请选择角色', trigger: 'change' }]
      },
      department: [
        {
          value: 'MG',
          label: '管理中心',
          children: [
            {
              value: 'MG-FW',
              label: '法务部'
            },
            {
              value: 'MG-CW',
              label: '财务部'
            },
            {
              value: 'MG-HR',
              label: '人事部'
            }
          ]
        },
        {
          value: 'YY',
          label: '运营中心',
          children: [
            {
              value: 'YY-PM',
              label: '项目部'
            },
            {
              value: 'YY-NB',
              label: '新业务拓展部'
            }
          ]
        },
        {
          value: 'YF',
          label: '研发中心',
          children: [
            {
              value: 'YF-TEC',
              label: '技术研发部'
            },
            {
              value: 'YF-PRD',
              label: '产品研发部'
            },
            {
              value: 'YF-TPA',
              label: '供应链'
            },
            {
              value: 'YF-CHEK',
              label: '产品核保部'
            }
          ]
        }
      ],
      userNameEnableUpdate: false, // 是否允许修改登录名
      username: '', // 原用户名
      activeName: '0',
      btns: [
        { value: '0', name: '基础信息' },
        { value: '1', name: '操作日志' }
      ]
    };
  },
  created() {
    if (this.id) {
      this.getEmployeeDetail(this.id);
    }
    this.getRoleList();
  },
  methods: {
    // 关闭弹框
    closeModal() {
      const vm = this;
      vm.$emit('closeModal', false);
    },
    // 提交
    submit(formName) {
      const vm = this;

      vm.$refs[formName].validate(valid => {
        if (valid) {
          if (vm.userNameEnableUpdate && vm.username !== vm.baseForm.username) {
            this.$confirm('登录名只能修改一次！确认修改吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
              .then(() => {
                vm.loading = true;
                const params = {
                  id: vm.baseForm.employeeId,
                  roles: vm.baseForm.roles,
                  username: vm.baseForm.username
                };
                vm.$store
                  .dispatch('employee/updateUserNameAndRoles', params)
                  .then(() => {
                    vm.loading = false;
                    vm.$emit('closeModal', true);
                  })
                  .catch(() => {
                    vm.loading = false;
                  });
              })
              .catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消修改'
                });
              });
          } else {
            vm.loading = true;
            const params = {
              id: vm.baseForm.employeeId,
              roles: vm.baseForm.roles
            };
            vm.$store
              .dispatch('employee/updateUserNameAndRoles', params)
              .then(() => {
                vm.loading = false;
                vm.$emit('closeModal', true);
              })
              .catch(() => {
                vm.loading = false;
              });
          }
        }
      });
      // vm.$refs[formName].validate((valid) => {
      //     if (valid) {
      //         vm.loading = true
      //         vm.baseForm.oneLevelDept = vm.baseForm.department[0]
      //         vm.baseForm.twoLevelDept = vm.baseForm.department[1]
      //         vm.$store.dispatch('employee/employeeSave', vm.baseForm).then(res => {
      //             vm.loading = false
      //             if (!res.code) {
      //                 if (vm.id) {
      //                     vm.$message.success('保存成功')
      //                 } else {
      //                     vm.$message.success('新增成功')
      //                 }
      //                 vm.$emit('closeModal', true)
      //             } else {
      //                 vm.$message.warning(res.comment)
      //             }
      //         }).catch( () => {
      //             vm.loading = false
      //         })
      //     }
      // })
    },
    // 获取账号详情
    getEmployeeDetail(id) {
      const vm = this;
      vm.$store.dispatch('employee/getEmployeeDetail', id).then(res => {
        if (!res.code) {
          vm.baseForm = res.obj;
          vm.userNameEnableUpdate = res.obj.userNameEnableUpdate;
          vm.username = res.obj.username;
          delete vm.baseForm.password;

          vm.baseForm.department = [res.obj.oneLevelDept, res.obj.twoLevelDept];
        }
      });
    },
    // 获取角色列表
    getRoleList() {
      const vm = this;
      vm.$store.dispatch('role/getRoleList').then(res => {
        vm.roleList = res.obj;
      });
    },
    handleClick(tab) {
      this.activeName = tab;
    }
  }
};
</script>
<style lang="scss" scoped>
.user-form {
  .user-scroll {
height:300px;
overflow: auto;
  }
  .user-scroll::-webkit-scrollbar {/*滚动条整体样式*/
        width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
        display: none;
    }
    .user-scroll::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: #E5E5E5;
    }
    .user-scroll::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 10px;
        background: #ffffff;
    }
  .el-select {
    width: 100%;
  }
  .el-cascader {
    width: 100%;
  }
}
</style>
