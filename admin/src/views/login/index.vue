<template>
  <div class="page-login">
    <div class="login-box">
      <div class="left" />
      <div class="right">
        <div class="title">森罗树健康管理平台</div>
        <div class="login-content">
          <el-form
            ref="loginForm"
            :inline="true"
            :model="loginForm"
            :rules="rules"
          >
            <el-form-item prop="username">
              <el-input
                v-model.trim="loginForm.username"
                prefix-icon="el-icon-user"
                placeholder="请输入用户名"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model.trim="loginForm.password"
                prefix-icon="el-icon-lock"
                placeholder="请输入密码"
                show-password
              />
            </el-form-item>
          </el-form>
        </div>
        <el-checkbox v-model="rememberPassword" class="remember-password"
          >记住密码</el-checkbox
        >
        <el-button
          class="login-button"
          type="primary"
          :loading="loading"
          @click.native.prevent="login('loginForm')"
        >
          登录
        </el-button>
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="icp-number">
        Copyright © 2019平辅寅健康科技（上海）有限公司
        <a class="icp" target="_blank" href="https://beian.miit.gov.cn/"
          >沪ICP备19004366号</a
        >
      </div>

      <div class="miit">
        <img src="../../assets/beian.png" />
        <a
          target="_blank"
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010702005048"
          >沪公网备31010702005048号</a
        >
      </div>
    </div>
  </div>
</template>
<script>
const md5 = require('md5');
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loading: false,
      errorMessage: '',
      rules: {
        username: [{ required: true, message: '用户名必填', trigger: 'blur' }],
        password: [{ required: true, message: '密码必填', trigger: 'blur' }]
      },
      rememberPassword: false
    };
  },

  mounted() {
    // 键盘登录
    window.addEventListener('keydown', this.remove);
    if (localStorage.getItem('rememberPassword')) {
      const loginForm = JSON.parse(localStorage.getItem('loginForm'));
      this.loginForm = { ...loginForm };
      this.rememberPassword = true;
    }
    const scriptCCC = window.document.getElementById('ccc');
    const tcc = document.getElementById('tcccSdkDomRoot');
    if (scriptCCC && tcc) {
      scriptCCC.parentNode.removeChild(scriptCCC);
      tcc.parentNode.removeChild(tcc);
    }
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.remove);
  },
  methods: {
    login(formName) {
      const vm = this;
      vm.$refs[formName].validate(valid => {
        if (valid) {
          vm.loading = true;
          vm.$store
            .dispatch('user/login', {
              ...vm.loginForm,
              password: md5(
                md5(vm.loginForm.password).toUpperCase(),
              ).toUpperCase()
            })
            .then(() => {
              localStorage.setItem('username', vm.loginForm.username);
              if (this.rememberPassword) {
                localStorage.setItem(
                  'loginForm',
                  JSON.stringify(this.loginForm),
                );
                localStorage.setItem('rememberPassword', true);
              } else {
                localStorage.removeItem('loginForm');
                localStorage.removeItem('rememberPassword');
              }
              vm.loading = false;

              vm.$router.push({
                path: vm.$route.query.redirect || '/',
                query: vm.$route.query.otherQuery
              });
            })
            .catch(err => {
              vm.errorMessage = err.message;
              vm.loading = false;
            });
        }
      });
    },
    remove() {
      const key = window.event.keyCode;
      if (key === 13) {
        this.login('loginForm');
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.page-login {
  width: 100%;
  height: 100%;
  background-image: url('../../assets/login_bg.png');
  background-size: 100% 100%;
  position: relative;
  &.store-login {
    width: 100%;
    height: 100%;
    background: #f3f6fc;
  }
  .login-box {
    width: 1033px;
    height: 609px;
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    .left {
      width: 533px;
      height: 100%;
      background-image: url('../../assets/login_left.png');
      background-size: 100% 100%;
    }
    .right {
      flex: 1;
      padding: 0 75px;
      .title {
        font-size: 28px;

        font-weight: 500;
        color: rgba(34, 118, 255, 1);
        text-align: center;
        margin-top: 130px;
      }
      .login-content {
        width: 100%;
        padding: 88px 0 0;
        text-align: center;
        .el-input {
          width: 350px;
        }
      }
      .remember-password {
        margin-bottom: 40px;
      }
      .login-button {
        width: 100%;
        height: 50px;
      }
      .error-message {
        color: #ff625e;
        font-size: 12px;
        margin-top: 4px;
        text-align: center;
        margin-top: 16px;
      }
    }
  }
  .bottom {
    position: absolute;
    left: 50%;
    bottom: 30px;
    transform: translateX(-50%);
    .miit {
      justify-content: center;
      display: flex;
      align-items: center;

      img {
        width: 20px;
        height: 20px;
        margin-right: 5px;
      }
      a {
        font-size: 14px;
        color: #999;
        &:hover {
          color: #3983e5;
          text-decoration: underline;
        }
      }
    }
    .icp-number {
      margin-bottom: 20px;

      display: flex;
      align-items: center;
      font-size: 14px;
      color: #999;
      a {
        margin-left: 10px;
        &:hover {
          color: #3983e5;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
