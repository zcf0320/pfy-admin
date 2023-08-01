<template>
  <el-form ref="formData" :model="formData">
    <div class="medicalInvoice-box">
      <div class="flex-between mb-24">
        <div class="title-top mb-0 lh-32 pt-0 pb-0 pl-0">医疗发票</div>
        <div>
          <el-button
            v-if="isEdit && pageAuthority.includes('add')"
            size="small"
            class="btn-exit"
            @click="add()"
          >
            新增
          </el-button>
        </div>
      </div>
      <div v-for="(item, index) in formData.medicalInvoiceList" :key="index">
        <div class="box-list mb-24">
          <div class="flex-box item-box">
            <div class="labelName">业务流水号</div>
            <div class="flex-grow ">
              <el-form-item
                class="mb-0 w-full"
                :prop="`medicalInvoiceList[${index}].businessSerialNumber`"
                :rules="[
                  { required: true, message: '请输入业务流水号' },
                  {
                    validator: $validators.checkInt,
                    message: '请输入0~99正整数',
                  },
                ]"
              >
                <el-input
                  v-model="item.businessSerialNumber"
                  maxlength="20"
                  :disabled="!isEdit"
                  class="input-no-border w-full"
                  placeholder="请输入业务流水号"
                />
              </el-form-item>
            </div>
          </div>
          <div class="flex-box item-box">
            <div class="labelName">发票号码</div>
            <div class="flex-grow">
              <el-form-item
                class="mb-0  w-full"
                :prop="`medicalInvoiceList[${index}].invoiceNumber`"
                :rules="[{ required: true, message: '请输入发票号码' }]"
              >
                <el-input
                  v-model="item.invoiceNumber"
                  maxlength="20"
                  :disabled="!isEdit"
                  class="input-no-border"
                  placeholder="请输入发票号码"
                />
              </el-form-item>
            </div>
          </div>
          <div class="flex-box item-box">
            <div class="labelName">社保卡号</div>
            <div class="flex-grow">
              <el-form-item
                class="mb-0  w-full"
                :prop="`medicalInvoiceList[${index}].socialSecurityNumber`"
                :rules="[
                  { required: true, message: '请输入社保卡号' },
                  {
                    validator: $validators.checkInt,
                    message: '请输入0~99正整数',
                  },
                ]"
              >
                <el-input
                  v-model="item.socialSecurityNumber"
                  maxlength="20"
                  :disabled="!isEdit"
                  class="input-no-border w-full"
                  placeholder="请输入社保卡号"
                />
              </el-form-item>
            </div>
          </div>
          <div class="flex-box item-box">
            <div class="labelName">收款单位</div>
            <div class="flex-grow">
              <el-form-item class="mb-0  w-full">
                <el-input
                  v-model="item.payee"
                  maxlength="20"
                  :disabled="!isEdit"
                  class="input-no-border"
                  placeholder="请输入收款单位"
                />
              </el-form-item>
            </div>
          </div>
          <div class="flex-box item-box">
            <div class="labelName">收款人</div>
            <div class="flex-grow">
              <el-form-item class="mb-0  w-full">
                <el-input
                  v-model="item.receiver"
                  maxlength="20"
                  :disabled="!isEdit"
                  class="input-no-border"
                  placeholder="请输入收款人"
                />
              </el-form-item>
            </div>
          </div>
          <div class="flex-box item-box">
            <div class="labelName">开票日期</div>
            <div class="flex-grow">
              <el-form-item
                class="mb-0  w-full"
                :prop="`medicalInvoiceList[${index}].invoiceTime`"
                :rules="[{ required: true, message: '请选择开票日期' }]"
              >
                <el-date-picker
                  v-model="item.invoiceTime"
                  type="date"
                  value-format="timestamp"
                  :disabled="!isEdit"
                  :clearable="false"
                  class="input-no-border w-full"
                  placeholder="请选择开票日期"
                  :picker-options="{
                    disabledDate(time) {
                      return time.getTime() > Date.now();
                    },
                  }"
                />
              </el-form-item>
            </div>
          </div>
          <div class="flex-box item-box">
            <div class="labelName">合计金额</div>
            <div class="flex-grow">
              <el-form-item
                class="mb-0  w-full"
                :prop="`medicalInvoiceList[${index}].totalMoney`"
                :rules="[
                  {
                    validator: $validators.checkDecima2,
                    message: '请输入0~999999.99的数且最多保留两位小数',
                  },
                ]"
              >
                <InputNumber
                  v-model="item.totalMoney"
                  :max="999999.99"
                  :disabled="!isEdit"
                  class="input-no-border w-full"
                  placeholder="请输入合计金额"
                />
              </el-form-item>
            </div>
          </div>
          <div class="flex-box item-box">
            <div class="labelName">医疗统筹支付</div>
            <div class="flex-grow">
              <el-form-item
                class="mb-0  w-full"
                :prop="`medicalInvoiceList[${index}].medicalCoordinate`"
                :rules="[
                  {
                    validator: $validators.checkDecima2,
                    message: '请输入0~999999.99的数且最多保留两位小数',
                  },
                ]"
              >
                <InputNumber
                  v-model="item.medicalCoordinate"
                  :max="999999.99"
                  :disabled="!isEdit"
                  class="input-no-border w-full"
                  placeholder="请输入医疗统筹支付"
                />
              </el-form-item>
            </div>
          </div>
          <div class="flex-box item-box">
            <div class="labelName">个人账户支付</div>
            <div class="flex-grow">
              <el-form-item
                class="mb-0  w-full"
                :prop="`medicalInvoiceList[${index}].personAccount`"
                :rules="[
                  {
                    validator: $validators.checkDecima2,
                    message: '请输入0~999999.99的数且最多保留两位小数',
                  },
                ]"
              >
                <InputNumber
                  v-model="item.personAccount"
                  :max="999999.99"
                  :disabled="!isEdit"
                  class="input-no-border w-full"
                  placeholder="请输入个人账户支付"
                />
              </el-form-item>
            </div>
          </div>
          <div class="flex-box item-box">
            <div class="labelName">预缴金额</div>
            <div class="flex-grow">
              <el-form-item
                class="mb-0  w-full"
                :prop="`medicalInvoiceList[${index}].prepayMoney`"
                :rules="[
                  {
                    validator: $validators.checkDecima2,
                    message: '请输入0~999999.99的数且最多保留两位小数',
                  },
                ]"
              >
                <InputNumber
                  v-model="item.prepayMoney"
                  :max="999999.99"
                  :disabled="!isEdit"
                  class="input-no-border w-full"
                  placeholder="请输入预缴金额"
                />
              </el-form-item>
            </div>
          </div>
          <div class="flex-box item-box">
            <div class="labelName">补缴金额</div>
            <div class="flex-grow">
              <el-form-item
                class="mb-0  w-full"
                :prop="`medicalInvoiceList[${index}].replenishMoney`"
                :rules="[
                  {
                    validator: $validators.checkDecima2,
                    message: '请输入0~999999.99的数且最多保留两位小数',
                  },
                ]"
              >
                <InputNumber
                  v-model="item.replenishMoney"
                  :max="999999.99"
                  :disabled="!isEdit"
                  class="input-no-border w-full"
                  placeholder="请输入补缴金额"
                />
              </el-form-item>
            </div>
          </div>
          <div class="flex-box item-box">
            <div class="labelName">退款金额</div>
            <div class="flex-grow">
              <el-form-item
                class="mb-0  w-full"
                :prop="`medicalInvoiceList[${index}].returnPremium`"
                :rules="[
                  {
                    validator: $validators.checkDecima2,
                    message: '请输入0~999999.99的数且最多保留两位小数',
                  },
                ]"
              >
                <InputNumber
                  v-model="item.returnPremium"
                  :max="999999.99"
                  :disabled="!isEdit"
                  class="input-no-border w-full"
                  placeholder="请输入退款金额"
                />
              </el-form-item>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-form>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'medicalInvoice',
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
        medicalInvoiceList: [
          {
            claimRecordId: this.id,
            businessSerialNumber: '',
            invoiceNumber: '',
            socialSecurityNumber: '',
            payee: '',
            receiver: '',
            invoiceTime: '',
            totalMoney: '',
            medicalCoordinate: '',
            personAccount: '',
            prepayMoney: '',
            replenishMoney: '',
            returnPremium: ''
          }
        ]
      }
    };
  },
  computed: {
    pageAuthority() {
      // 170501 核赔记录
      return this.$store.state.user.pageAuthority['170501'];
    }
  },
  created() {
    this.initData();
  },
  methods: {
    ...mapActions('auditRecords', [
      'getTreatmentStructured',
      'saveMedicalInvoice'
    ]),
    initData: async function() {
      const res = await this.getTreatmentStructured({
        id: this.id,
        type: this.type
      });
      if (res) {
        // this.formData.claimCheckList = res.data.claimCheckList || []
        if (this.$isNotEmpty(res.data.medicalInvoiceList)) {
          this.formData.medicalInvoiceList = res.data.medicalInvoiceList;
          this.$emit('update:isEdit', false);
        } else {
          this.$emit('update:isEdit', true);
        }
        if (res.data.images) {
          this.$emit('imgs', res.data.images);
        }
      }
    },
    // 新增医疗发票
    add() {
      this.formData.medicalInvoiceList.push({
        businessSerialNumber: '',
        invoiceNumber: '',
        socialSecurityNumber: '',
        payee: '',
        receiver: '',
        invoiceTime: '',
        totalMoney: '',
        medicalCoordinate: '',
        personAccount: '',
        prepayMoney: '',
        replenishMoney: '',
        returnPremium: ''
      });
    },
    /**
     * 保存数据
     */
    saveForm() {
      this.$refs['formData'].validate(valid => {
        if (!valid) {
          return false;
        }
        this.formData.claimRecordId = this.id;
        this.saveMedicalInvoice(this.formData).then(() => {
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
  // //el-input 不显示border
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
  //错误显示红色
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
