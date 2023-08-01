<template>
  <div class="edit-password-modal modal-form">
    <el-dialog
      title="修改密码"
      :visible="isShow"
      width="548px"
      center
      :close-on-click-modal="closeClickModal"
      :show-close="false"
      @close="closeModal"
    >
      <div class="user-form">
        <div v-if="isShowTips" class="tips">
          检测到您的密码为系统初始密码，为了您的账号安全，请及时更新密码！
        </div>
        <el-form
          ref="baseForm"
          :model="baseForm"
          :rules="rules"
          label-width="100px"
          label-position="top"
        >
          <el-row>
            <!-- <el-col :span="24">
                            <el-form-item label="用户名:" prop="userName">
                                <el-input v-model="baseForm.userName" disabled></el-input>
                            </el-form-item>
                        </el-col> -->
            <el-col :span="24">
              <el-form-item label="原密码:" prop="oldPwd">
                <el-input
                  v-model="baseForm.oldPwd"
                  :type="oldShow ? 'text' : 'password'"
                  placeholder="请输入原密码"
                />
                <div class="eye-box">
                  <div
                    v-if="oldShow"
                    class="eye psw-close"
                    @click="oldShow = false"
                  />
                  <div
                    v-else
                    class="eye psw-open"
                    @click="oldShow = true"
                  />
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="新密码:" prop="newPwd">
                <el-input
                  v-model="baseForm.newPwd"
                  :type="newShow ? 'text' : 'password'"
                  :maxlength="16"
                  placeholder="请输入新密码/6位以上 仅支持数字以及字母大小写"
                />
                <div class="eye-box">
                  <div
                    v-if="newShow"
                    class="eye psw-close"
                    @click="newShow = false"
                  />
                  <div
                    v-else
                    class="eye psw-open"
                    @click="newShow = true"
                  />
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="重复密码:" prop="checkPassword">
                <el-input
                  v-model="baseForm.checkPassword"
                  :type="resetShow ? 'text' : 'password'"
                  :maxlength="16"
                  placeholder="请输入新密码/6位以上 仅支持数字以及字母大小写"
                />
                <div class="eye-box">
                  <div
                    v-if="resetShow"
                    class="eye psw-close"
                    @click="resetShow = false"
                  />
                  <div
                    v-else
                    class="eye psw-open"
                    @click="resetShow = true"
                  />
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModal">取 消</el-button>
        <el-button
type="primary"
:loading="loading"
@click="submit('baseForm')"
>确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
const md5 = require('md5');
export default {
  name: 'EditPassword',
  props: {
    isShow: {
      type: Boolean,
      default: () => {
        return false;
      }
    }
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (!/^.*(?=.{6,16})(?=.*\d)(?=.*[A-Z]{1,})(?=.*[a-z]{1,}).*$/.test(value)) {
          callback(new Error('6-16个字符，至少1个大写字母，1个小写字母，1个数字'));
        }
        if (this.baseForm.checkPassword !== '') {
          this.$refs.baseForm.validateField('checkPassword');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.baseForm.newPwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      closeClickModal: false,
      baseForm: {
        userName: '',
        newPwd: '',
        oldPwd: '',
        checkPassword: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        oldPwd: [
          { required: true, message: '请输入原始密码', trigger: 'blur' }
        ],
        newPwd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPassword: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      newShow: false,
      resetShow: false,
      oldShow: false
    };
  },
  computed: {
    isShowTips() {
      return this.$store.state.user.isShowTips;
    }
  },
  created() {
    this.baseForm.userName = localStorage.getItem('username') || '用户名';
  },
  methods: {
    // 关闭弹框
    closeModal() {
      const vm = this;
      vm.$emit('closeModal');
    },
    // 提交
    submit(formName) {
      const vm = this;
      vm.$refs[formName].validate((valid) => {
        if (valid) {
          vm.loading = true;
          vm.$store.dispatch('app/updatePassword', {
            ...vm.baseForm,
            oldPwd: md5(vm.baseForm.oldPwd).toUpperCase(),
            newPwd: md5(vm.baseForm.newPwd).toUpperCase()
          }).then(res => {
            if (res.obj) {
              vm.$emit('submit');
            }
          }).catch(() => {
            vm.loading = false;
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.edit-password-modal {
  z-index: 999;
  .tips {
    color: #ffa800;
    margin-bottom: 10px;
  }
  .eye-box {
    position: absolute;
    top: 11px;
    right: 7px;
  }
  .eye {
    width: 18px;
    height: 12px;
  }
  .psw-close {
    background: url("../../assets/psw-close.svg");
    background-size: 100% 100%;
  }
  .psw-open {
    background: url("../../assets/psw-open.svg");
    background-size: 100% 100%;
  }
}
</style>
