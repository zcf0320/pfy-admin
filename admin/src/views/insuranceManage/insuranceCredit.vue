<template>
  <div class="insurance-credit-page">
    <el-container>
      <el-main>
        <div class="main-content">
          <div class="title">个人保险信用查询</div>
          <div class="form">
            <el-form ref="baseForm" :model="baseForm" :rules="rules">
              <el-row :gutter="20">
                <el-col :span="19">
                  <el-form-item prop="idCardEnd">
                    <el-input
                      v-model="baseForm.idCardEnd"
                      placeholder="请输入身份证后6位"
                      maxlength="6"
                      @keyup.enter.native="getPersonCredit('baseForm')"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <button
                    type="button"
                    class="btn-save"
                    @click="getPersonCredit('baseForm')"
                  >
                    查询
                  </button>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'InsuranceCredit',
  data() {
    // var checkNumber = (rule, value, callback) => {
    //     if (!/^[1-9]\d{6}$/.test(value)) {
    //         return callback(new Error('请输入正确的身份证'));
    //     }
    //     callback();
    // };
    return {
      loading: false,
      baseForm: {
        idCardEnd: ''
      },
      rules: {
        idCardEnd: [
          { required: true, message: '请输入身份证后6位', trigger: 'blur' }
          // { validator: checkNumber, trigger: 'blur' }
        ]
      }
    };
  },
  computed: {},
  created() {},
  methods: {
    // 查询个人信用
    getPersonCredit(formName) {
      const vm = this;
      vm.$refs[formName].validate(valid => {
        if (valid) {
          vm.$store
            .dispatch('app/getPersonCredit', {
              idCardEnd: vm.baseForm.idCardEnd
            })
            .then(() => {
              window.open(
                `${process.env.VUE_APP_RISK_MANAGE_URL}#/credit/personal/${vm.baseForm.idCardEnd}`,
                '_blank',
              );
            });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.insurance-credit-page {
  width: 100%;
  .el-main {
    position: relative;
    .main-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      .title {
        font-size: 24px;

        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 33px;
        margin: 0 auto 64px;
        text-align: center;
      }
      .form {
        width: 464px;
        margin: 0 auto;
      }
    }
  }
}
</style>
