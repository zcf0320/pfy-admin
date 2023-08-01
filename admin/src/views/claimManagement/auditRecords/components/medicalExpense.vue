<template>
  <div class="medicalExpense-box">
    <el-form ref="formData" :model="formData">
      <div class="title-top mb-24 lh-32 pt-0 pb-0 pl-0">医疗费用结算单一</div>
      <div class="box-list mb-24">
        <div class="flex-box item-box">
          <div class="labelName">流水号</div>
          <div class="flex-grow ">
            <el-form-item
              class="mb-0 w-full"
              prop="serialNumber"
              :rules="[
                { required: true, message: '请输入流水号' },
                {
                  validator: $validators.checkInt,
                  message: '请输入0~99正整数',
                },
              ]"
            >
              <el-input
                v-model="formData.serialNumber"
                maxlength="20"
                :disabled="!isEdit"
                class="input-no-border w-full"
                placeholder="请输入流水号"
              />
            </el-form-item>
          </div>
        </div>
        <div class="flex-box item-box">
          <div class="labelName">交易机构</div>
          <div class="flex-grow">
            <el-form-item
              class="mb-0  w-full"
              prop="dealOrganization"
              :rules="[{ required: true, message: '请输入交易机构' }]"
            >
              <el-input
                v-model="formData.dealOrganization"
                maxlength="20"
                :disabled="!isEdit"
                class="input-no-border"
                placeholder="请输入交易机构"
              />
            </el-form-item>
          </div>
        </div>
        <div class="flex-box item-box">
          <div class="labelName">交易日期</div>
          <div class="flex-grow">
            <el-form-item
              class="mb-0  w-full"
              prop="dealTime"
              :rules="[{ required: true, message: '请选择交易日期' }]"
            >
              <el-date-picker
                v-model="formData.dealTime"
                type="date"
                value-format="timestamp"
                :disabled="!isEdit"
                :clearable="false"
                class="input-no-border w-full"
                placeholder="请选择交易日期"
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
          <div class="labelName">医疗总费用</div>
          <div class="flex-grow">
            <el-form-item
              class="mb-0  w-full"
              prop="medicalTotal"
              :rules="[
                {
                  validator: $validators.checkDecima2,
                  message: '请输入0~999999.99的数且最多保留两位小数',
                },
              ]"
            >
              <InputNumber
                v-model="formData.medicalTotal"
                :maxlength="9"
                :max="999999.99"
                :disabled="!isEdit"
                class="input-no-border w-full"
                placeholder="请输入医疗总费用"
              />
            </el-form-item>
          </div>
        </div>
        <div class="flex-box item-box">
          <div class="labelName">统筹基本支付</div>
          <div class="flex-grow">
            <el-form-item
              class="mb-0  w-full"
              prop="coordinateFunds"
              :rules="[
                {
                  validator: $validators.checkDecima2,
                  message: '请输入0~999999.99的数且最多保留两位小数',
                },
              ]"
            >
              <InputNumber
                v-model="formData.coordinateFunds"
                :max="999999.99"
                :disabled="!isEdit"
                class="input-no-border w-full"
                placeholder="请输入统筹基本支付"
              />
            </el-form-item>
          </div>
        </div>
        <div class="flex-box item-box">
          <div class="labelName">当年账户支付</div>
          <div class="flex-grow">
            <el-form-item
              class="mb-0  w-full"
              prop="currentAccounts"
              :rules="[
                {
                  validator: $validators.checkDecima2,
                  message: '请输入0~999999.99的数且最多保留两位小数',
                },
              ]"
            >
              <InputNumber
                v-model="formData.currentAccounts"
                :max="999999.99"
                :disabled="!isEdit"
                class="input-no-border w-full"
                placeholder="请输入当年账户支付"
              />
            </el-form-item>
          </div>
        </div>
        <div class="flex-box item-box">
          <div class="labelName">历年账户支付</div>
          <div class="flex-grow">
            <el-form-item
              class="mb-0  w-full"
              prop="calendarAccounts"
              :rules="[
                {
                  validator: $validators.checkDecima2,
                  message: '请输入0~999999.99的数且最多保留两位小数',
                },
              ]"
            >
              <InputNumber
                v-model="formData.calendarAccounts"
                :max="999999.99"
                :disabled="!isEdit"
                class="input-no-border w-full"
                placeholder="请输入历年账户支付"
              />
            </el-form-item>
          </div>
        </div>
        <div class="flex-box item-box">
          <div class="labelName">个人现金支付</div>
          <div class="flex-grow">
            <el-form-item
              class="mb-0  w-full"
              prop="personalCash"
              :rules="[
                {
                  validator: $validators.checkDecima2,
                  message: '请输入0~999999.99的数且最多保留两位小数',
                },
              ]"
            >
              <InputNumber
                v-model="formData.personalCash"
                :max="999999.99"
                :disabled="!isEdit"
                class="input-no-border w-full"
                placeholder="请输入个人现金支付"
              />
            </el-form-item>
          </div>
        </div>
      </div>
      <!--  -->
      <div class="flex">
        <div class="flex-grow">
          <div class="flex-between mb-10">
            <div class="title-top mb-10">费用清单</div>
            <div class="fc-black">合计:{{ getTotalMoney }}</div>
          </div>
          <el-table border :data="formData.medicalBillList">
            <el-table-column label="收费项目">
              <template slot-scope="{ row }">
                <el-input
                  v-model="row.payItems"
                  class="input-no-border w-full"
                  placeholder="请输入收费项目"
                  maxlength="20"
                  :disabled="!isEdit"
                />
              </template>
            </el-table-column>
            <el-table-column label="收费金额">
              <template slot-scope="{ row, $index }">
                <el-form-item
                  class="mb-0  w-full"
                  :prop="`medicalBillList[${$index}].payMoney`"
                  :rules="[
                    {
                      validator: $validators.checkDecima2,
                      message: '请输入0~999999.99的数且最多保留两位小数',
                    },
                  ]"
                >
                  <InputNumber
                    v-model="row.payMoney"
                    :max="999999.99"
                    class="input-no-border w-full"
                    placeholder="请输入收费金额"
                    :disabled="!isEdit"
                  />
                </el-form-item>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="operation-btn flex h-full ml-24">
          <div
            v-if="formData.medicalBillList.length > 1 && isEdit"
            class="icon-remove "
            @click="delItem(formData.medicalBillList.length - 1)"
          />
          <div
            v-if="isEdit"
            class="icon-add "
            :class="formData.medicalBillList.length > 1 ? 'ml-24' : ''"
            @click="addItem()"
          />
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'medicalExpense',
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
        billTotal: null,
        calendarAccounts: null,
        coordinateFunds: null,
        currentAccounts: null,
        dealOrganization: null,
        dealTime: null,
        medicalBillList: [{ payItems: '', payMoney: null }],
        medicalTotal: null,
        personalCash: null,
        serialNumber: null
      }
    };
  },
  computed: {
    getTotalMoney() {
      let cnt = 0;
      if (this.$isNotEmpty(this.formData.medicalBillList)) {
        this.formData.medicalBillList.forEach(item => {
          if (this.$isNotEmpty(item.payMoney)) {
            cnt += Number(item.payMoney);
          }
        });
      }
      return Number(cnt).toFixed(2);
    }
  },
  created() {
    this.initData();
  },
  methods: {
    ...mapActions('auditRecords', [
      'getTreatmentStructured',
      'saveMedicalExpense'
    ]),
    /**
     * 获取初始化数据
     */
    initData: async function() {
      const res = await this.getTreatmentStructured({
        id: this.id,
        type: this.type
      });
      if (res) {
        // this.formData.claimCheckList = res.data.claimCheckList || []
        if (this.$isNotEmpty(res.data.claimMedicalExpenseVO)) {
          res.data.claimMedicalExpenseVO.medicalBillList = res.data
            .claimMedicalExpenseVO.medicalBillList || [
            { payItems: '', payMoney: null }
          ];
          this.formData = res.data.claimMedicalExpenseVO;
          this.$emit('update:isEdit', false);
        } else {
          this.$emit('update:isEdit', true);
        }
        if (res.data.images) {
          this.$emit('imgs', res.data.images);
        }
      }
    },
    // 添加单条数据
    addItem() {
      const item = this.formData.medicalBillList[
        this.formData.medicalBillList.length - 1
      ];
      if (this.$isEmpty(item.payItems) && this.$isEmpty(item.payMoney)) {
        this.$message.warning('请完善已存在数据');
        return false;
      }
      const obj = { payItems: '', payMoney: null };
      this.formData.medicalBillList.push(obj);
    },
    saveForm() {
      this.$refs['formData'].validate(valid => {
        if (!valid) {
          return false;
        }
        this.formData.claimRecordId = this.id;
        this.saveMedicalExpense(this.formData).then(() => {
          this.$message.success('保存成功');
          this.$emit('update:isEdit', false);
        });
      });
    },
    // 删除单条数据
    delItem(index) {
      this.$confirm('删除数据后不可恢复,是否确定?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.formData.medicalBillList.splice(index, 1);
      });
    }
  }
};
</script>

<style scoped lang="scss">
.medicalExpense-box {
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
  .operation-btn {
    width: 64px;
    align-self: flex-end;
  }
}
</style>
