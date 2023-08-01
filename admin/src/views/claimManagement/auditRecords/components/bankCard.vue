<template>
  <el-form ref="formData" :model="formData">
    <div class="medicalInvoice-box">
      <div class="flex-between mb-24">
        <div class="title-top mb-0 pt-0 pb-0 pl-0">银行卡一</div>
      </div>
      <div class="box-list mb-24">
        <div class="flex-box item-box">
          <div class="labelName">持卡人姓名</div>
          <div class="flex-grow ">
            <el-form-item
              class="mb-0 w-full"
              prop="cardholder"
              :rules="[{ required: true, message: '请输入持卡人姓名' }]"
            >
              <el-input
                v-model="formData.cardholder"
                maxlength="10"
                :disabled="!isEdit"
                class="input-no-border w-full"
                placeholder="请输入持卡人姓名"
              />
            </el-form-item>
          </div>
        </div>
        <div class="flex-box item-box">
          <div class="labelName">银行名称</div>
          <div class="flex-grow ">
            <el-form-item
              class="mb-0 w-full"
              prop="bankName"
              :rules="[{ required: true, message: '请选择银行名称' }]"
            >
              <el-select
                v-model="formData.bankName"
                :disabled="!isEdit"
                class="input-no-border w-full"
                placeholder="请选择银行名称"
              >
                <el-option
                  v-for="item in bankList"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="flex-box item-box">
          <div class="labelName">银行卡号码</div>
          <div class="flex-grow ">
            <el-form-item
              class="mb-0 w-full"
              prop="bankCardNumber"
              :rules="[
                { required: true, message: '请输入银行卡号码' },
                {
                  validator: $validators.checkInt,
                  message: '请输入0~99正整数',
                },
              ]"
            >
              <el-input
                v-model="formData.bankCardNumber"
                maxlength="19"
                :disabled="!isEdit"
                class="input-no-border w-full"
                placeholder="请输入银行卡号码"
              />
            </el-form-item>
          </div>
        </div>
      </div>
    </div>
  </el-form>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'bankCard',
  props: {
    id: {
      type: String,
      default: ''
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      formData: {
        bankCardNumber: '',
        bankName: '',
        cardholder: ''
      },
      bankList: []
    };
  },
  computed: {},
  created() {
    this.initData();
    // 科室查询
    this.findBankList().then(res => {
      this.bankList = res.data || [];
    });
  },
  methods: {
    ...mapActions('auditRecords', [
      'getTreatmentStructured',
      'findBankList',
      'saveBankCard'
    ]),
    initData: async function() {
      const res = await this.getTreatmentStructured({
        id: this.id,
        type: this.type
      });
      if (res) {
        // this.formData.claimCheckList = res.data.claimCheckList || []
        if (this.$isNotEmpty(res.data.bankCardVO)) {
          this.formData = res.data.bankCardVO;
          this.$emit('update:isEdit', false);
        } else {
          this.$emit('update:isEdit', true);
        }
        if (res.data.images) {
          this.$emit('imgs', res.data.images);
        }
      }
    },
    // 保存数据
    saveForm() {
      this.$refs['formData'].validate(valid => {
        if (!valid) {
          return false;
        }
        this.formData.claimRecordId = this.id;
        this.saveBankCard(this.formData).then(() => {
          this.$message.success('保存成功');
          this.$emit('update:isEdit', false);
        });
      });
    }
  }
};
</script>

<style scoped lang="scss">
.medicalInvoice-box {
  .labelName {
    width: 120px;
    height: 38px;
    line-height: 38px;
    padding-left: 14px;
    color: #464668ff;
    background: #f3f6f9;
    font-size: 14px;
  }
  .box-list {
    .item-box {
      border: 1px solid #ebedf2;
      border-top: 0px;
      &:first-child {
        border-top: 1px solid #ebedf2;
      }
    }
  }
  //el-input 不显示border
  .input-no-border >>> .el-input__inner {
    background-color: #fff;
    border-radius: 0px;
    height: 38px;
    // border: 0px !important; //改成0，边框就消失了！
    width: 100%;
    border-color: transparent !important;
    &:focus {
      outline: none;
      border-color: #3599fe !important;
    }
  }
  .el-form-item.is-error {
    //el-input 不显示border
    .input-no-border >>> .el-input__inner {
      background-color: #fff;
      border-radius: 0px;
      height: 38px;
      // border: 0px !important; //改成0，边框就消失了！
      width: 100%;
      border-color: #ff5e5e !important;
      &:focus {
        outline: none;
        border-color: #ff5e5e !important;
      }
    }
  }
}
</style>
