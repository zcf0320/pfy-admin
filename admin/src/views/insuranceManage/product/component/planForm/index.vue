<template>
  <div class="plan-form">
    <el-form
      :ref="refName"
      :model="plan"
      :rules="planRules"
      label-width="100px"
      label-position="top"
    >
      <el-row :gutter="20">
        <el-col :span="12">
             <el-form-item
              label="计划名称" prop="name"
              >
            <el-input
              v-model="plan.name"
              maxlength="6"
              :disabled="edit"
              placeholder="最多6个中文字符"
              show-word-limit
            />
            <!-- <InputMaxTip :max="6" :current-key="plan.name" /> -->
          </el-form-item>
        </el-col>
          <el-col :span="12">
          <div class="premium">
            <div class="premium-select">
              <el-form-item label="保障计划保费" prop="premiumRuleType"
              >
                <el-select
                  :value="1"
                  disabled
                  placeholder="请选择保费类型"
                  @change="premiumRuleTypeChange"
                >
                  <el-option
                    v-for="item in premiumRuleTypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </div>
            <div
              v-if="plan.premiumRuleType"
              class="set-premium"
              @click="premiumToggle"
            >
              {{ plan.customPremium.formType ? '查看保费' : '设置保费' }}
            </div>
          </div>
        </el-col>
        <!-- <el-col v-if="plan.planCode" :span="12">
          <el-form-item label="保障计划编号">
            <el-input v-model="plan.planCode" disabled />
          </el-form-item>
        </el-col> -->
      </el-row>
      <!-- <el-row :gutter="20">
        <el-col
          v-if="plan.serviceFeeType === 2 || plan.serviceFeeType === 3"
          :span="6"
        >
          <el-form-item
            :label="enum2[plan.serviceFeeType]"
            prop="serviceFeeAmount"
          >
            <el-input
              v-model="plan.serviceFeeAmount"
              type="number"
              :disabled="edit"
              placeholder="请输入"
            >
              <template slot="append">{{
                enum1[plan.serviceFeeType]
              }}</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row> -->
      <!-- <el-row :gutter="20">
         <el-col v-if="plan.planCode" :span="12">
        </el-col>
      </el-row> -->
      <el-row  v-if="plan.serviceFeeType === 2 || plan.serviceFeeType === 3" :gutter="20">
        <el-col
          :span="6"
        >
          <el-form-item
            :label="enum2[plan.serviceFeeType]"
            prop="serviceFeeAmount"
          >
            <el-input
              v-model="plan.serviceFeeAmount"
              type="number"
              :disabled="edit"
              placeholder="请输入"
            >
              <template slot="append">{{
                enum1[plan.serviceFeeType]
              }}</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="plan.planCode" :gutter="20">
        <el-col  :span="12">
          <el-form-item label="保障计划编号">
            <el-input v-model="plan.planCode" disabled />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="security-plan">
            <!-- <div class="title">计划详情</div> -->
            <el-table :data="plan.planDetails" class="table-large">
              <el-table-column label="序号" width="80">
                <template slot-scope="{ $index }">
                  <span>#</span>
                  <span>{{ $index + 1 }}</span>
                </template>
              </el-table-column>
              <el-table-column label="保障内容">
                <template slot-scope="{ row }">
                  <span
                    class="link-skip"
                    style="textDecoration: none;"
                    @click="lookProtectRightsId(row.protectRightsId)"
                    >{{ row.protectRightsName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="类型" width="140">
                <template slot-scope="{ row }">
                  <span>
                    {{ row.mainDeputy === 158 ? '主险' : '附险' }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                v-if="plan.planDetails[0].rateTableName"
                label="累计保额"
                width="140"
              >
                <template slot-scope="{ row }">
                  <span>
                    {{ row.protectRightsPrice }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                v-if="plan.planDetails[0].rateTableName"
                label="单次保额"
                width="140"
              >
                <template slot-scope="{ row }">
                  <span>
                    {{ row.singleRealPrice }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                v-if="plan.planDetails[0].rateTableName"
                label="费率表"
                width="140"
              >
                <template slot-scope="{ row }">
                  <span> {{ row.rateTableName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="{ row, $index }">
                  <div v-if="!edit">
                    <span
                      v-if="
                        pageAuthority.includes('edit') &&
                          row.mainDeputy === 158 &&
                          $index === 0
                      "
                      class="fc-blue mr-10 plan-add"
                      @click="showModal({}, $index, 159, 'add')"
                      >新增附险</span>
                    <span
                      v-if="
                        pageAuthority.includes('edit') && row.mainDeputy === 158
                      "
                      class="fc-blue mr-10 plan-add"
                      @click="showModal(row, $index, 158, 'edit')"
                      >设置保额</span>
                    <span
                      v-if="row.mainDeputy !== 158"
                      class="fc-blue mr-10"
                      @click="planMove(true, $index)"
                      >上移</span>
                    <span
                      v-if="
                        plan.planDetails.length > 1 &&
                          row.mainDeputy !== 158 &&
                          $index &&
                          $index !== plan.planDetails.length - 1
                      "
                      class="fc-blue mr-10"
                      @click="planMove(false, $index)"
                      >下移</span>
                    <span
                      v-if="row.mainDeputy !== 158"
                      class="fc-blue mr-10"
                      @click="showModal(row, $index, row.mainDeputy, 'edit')"
                      >编辑</span>
                    <el-popconfirm
                      title="删除后将不可恢复，是否删除？"
                      placement="top"
                      confirm-button-text="确认"
                      cancel-button-text="取消"
                      confirm-button-type="plain"
                      cancel-button-type="primary"
                      :hide-icon="true"
                      @onConfirm="deleteDetails($index)"
                    >
                      <span
                        v-show="row.mainDeputy !== 158"
                        slot="reference"
                        class="fc-red ml-10"
                        >删除</span>
                    </el-popconfirm>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <AttachInsuranceModal
      v-if="isShow"
      :is-show="isShow"
      :type="type"
      :protect-rights="protectRights"
      @planDetailsAddOrEdit="planDetailsAddOrEdit"
      @close="closeModal"
    />
    <SetPremium
      v-if="premiumShow"
      :is-show="premiumShow"
      :custom-premium="plan.customPremium"
      @setPremium="setPremium"
      @close="setPremiumClose"
    />
  </div>
</template>
<script>
import { priceUnit } from './config';
import AttachInsuranceModal from './attachInsuranceModal';
import SetPremium from './setPremium';
export default {
  name: 'PlanForm',
  components: {
    AttachInsuranceModal,
    SetPremium
  },
  props: {
    plan: {
      type: Object,
      default: function() {
        return {};
      }
    },
    index: {
      type: Number,
      default: 0
    },
    refName: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    // insuranceType,
    priceUnit,
    edit: {
      type: Boolean,
      default: true
    }
  },
  data() {
    const validate = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入'));
      } else if (this.plan.serviceFeeType === 2) {
        if (value < 0) {
          callback(new Error('费用不能小于0'));
        } else if (!/^(0|[1-9]\d{0,3})(\.\d{0,2})?$/.test(value)) {
          callback(new Error('最多两位有效数字'));
        }
      } else if (this.plan.serviceFeeType === 3) {
        if (value < 0 || value > 100) {
          callback(new Error('请输入0-100以内的数字'));
        } else if (!/^(0|[1-9]\d{0,3})(\.\d{0,2})?$/.test(value)) {
          callback(new Error('最多两位有效数字'));
        }
      } else {
        callback();
      }
    };
    return {
       labelPosition: 'left',
      planRules: {
        name: [
          {
            required: true,
            message: '请输入计划名称',
            trigger: 'blur'
          }
        ],
        premiumRuleType: [
          {
            required: true,
            message: '请选择保费类型',
            trigger: 'change'
          }
        ],
        serviceFeeAmount: [
          {
            validator: validate,
            trigger: 'blur'
          }
        ],
        serviceFeeType: [
          {
            required: true,
            message: '请选择服务费类型',
            trigger: 'blur'
          }
        ]
      },
      isShow: false,
      childrenIndex: '',
      type: '',
      protectRights: {},
      status: '',
      premiumRuleTypes: [
        {
          label: '按费率表计算',
          value: 0
        },
        {
          label: '自定义保费',
          value: 1
        }
      ],
      premiumShow: false,
      enum1: {
        1: '',
        2: '元',
        3: '%'
      },
      enum2: {
        1: '',
        2: '固定费用',
        3: '按照比例'
      }
    };
  },
  computed: {
    pageAuthority() {
      // 170101 保险产品
      return this.$store.state.user.pageAuthority['170101'];
    }
  },
  created() {},
  methods: {
    /*
            计划详情上移下移
            params:
                type: true 上移 false 下移
                index: 保障计划序号
                childrenIndex: 计划详情序号
            */

    planMove(type, index) {
      const splicePlan = this.plan.planDetails.splice(index, 1);
      if (type) {
        this.plan.planDetails.splice(index - 1, 0, splicePlan[0]);
      } else {
        this.plan.planDetails.splice(index + 1, 0, splicePlan[0]);
      }
      this.$emit('changePlan', this.index, this.plan);
    },
    // 增加或者编辑计划详情
    planDetailsAddOrEdit(item) {
      const { status, type } = this;
      // 判断是主险还是附险
      if (type === 158) {
        this.plan.planDetails.splice(this.childrenIndex, 1);
        this.plan.planDetails.splice(this.childrenIndex, 0, item);
      } else {
        // 判断附险是否改变
        if (!item.changeType) {
          if (status === 'add') {
            this.plan.planDetails.push(item);
          } else {
            this.plan.planDetails.splice(this.childrenIndex, 1);
            this.plan.planDetails.splice(this.childrenIndex, 0, item);
          }
        } else {
          // 判断附险是否重复
          if (this.filterPlanDetails(item.protectRightsId)) {
            if (status === 'add') {
              this.plan.planDetails.push(item);
            } else {
              this.plan.planDetails.splice(this.childrenIndex, 1);
              this.plan.planDetails.splice(this.childrenIndex, 0, item);
            }
          } else {
            this.$message.warning('附险重复');
            return;
          }
        }
      }
      this.closeModal();
      this.$emit('changePlan', this.index, this.plan);
    },
    // 删除计划详情
    deleteDetails(index) {
      this.plan.planDetails.splice(index, 1);
      this.$emit('changePlan', this.index, this.plan);
    },
    // 获取单个保障计划数据
    getFormData(formName) {
      let itemPromise;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let status = true;
          this.plan.planDetails.forEach((item, index) => {
            item.orderNumber = index;
            // 单次保额选填
            const singleRealPrice = item.singleRealPrice;
            delete item['singleRealPrice'];
            const valueArr = Object.values(item);
            if (
              valueArr.includes('') ||
              valueArr.includes(null) ||
              valueArr.includes(undefined)
            ) {
              status = false;
              itemPromise = Promise.reject(
                `保障计划${this.index + 1}计划详情有必填项未填`
              );
            }
            item.singleRealPrice = singleRealPrice;
          });
          if (status) {
            this.plan.orderNum = this.index + 1;
            itemPromise = Promise.resolve(this.plan);
          }
        } else {
          itemPromise = Promise.reject(`保障计划${this.index + 1}填写有误`);
        }
      });
      return itemPromise;
    },
    // AI定价
    setPrice() {
      window.open(
        `${process.env.VUE_APP_RISK_MANAGE_URL}#/setPrice/${this.$route.params.id}`,
        '_blank'
      );
    },
    /* 新增计划详情
                item: 编辑时当前的对象
                childrenIndex: 编辑时当前的索引
                type: 158 主险 159: 附险
                status: add 新增 edit 编辑
            */

    showModal(item, childrenIndex, type, status) {
      this.childrenIndex = childrenIndex;
      this.type = type;
      this.protectRights = item;
      this.status = status;
      this.isShow = true;
    },
    // 关闭弹框
    closeModal() {
      this.isShow = false;
    },
    // 判断附险是否重复
    filterPlanDetails(id) {
      let flag = true;
      this.plan.planDetails.forEach(item => {
        if (item.protectRightsId === id) {
          flag = false;
        }
      });
      return flag;
    },
    // 点击查看保险权益
    lookProtectRightsId(id) {
      const { href } = this.$router.resolve({
        path: `/insuranceManage/guaranteePower/guaranteePowerDetails/${id}`
      });
      window.open(href, '_blank');
    },
    // 保费弹框toggle
    premiumToggle() {
      this.premiumShow = !this.premiumShow;
    },
    // 设置保费
    setPremium() {
      this.premiumToggle();
    },
    // 关闭弹框
    setPremiumClose(data) {
      this.plan.customPremium = data;
      this.premiumToggle();
    },
    // 保障计划保费类型改变
    premiumRuleTypeChange() {
      if (!this.plan.premiumRuleType) {
        delete this.plan.customPremium;
      } else {
        this.$set(this.plan, 'customPremium', {
          formType: '',
          timeUnit: 1,
          table: []
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.plan-form {
  .el-form-item {
    margin-bottom: 0 !important;
  }
  // /deep/ .el-form-item__label {
  //   margin-top: 12px;
  //   margin-right: 12px;
  // }
  .title {
    font-size: 12px;
    color: #606266;
    margin-bottom: 4px;
    font-weight: 500;
  }
  // .table-large {
  //   margin-top: -46px;
  // }
  .plan-add {
    display: inline-block;
    width: 71px;
    line-height: 32px;
    background: #E5F3FE;
    text-align: center;
    border-radius: 4px;
    font-size: 14px;
  }
  .security-plan {
    margin-top: 20px;
  }
  .table {
    .table-header {
      width: 100%;
      height: 42px;
      line-height: 42px;
      display: flex;
      background: #f3f6f9;
      border-radius: 4px 4px 0 0;
      .header {
        width: calc((100% - 250px) / 4);
        padding-left: 10px;
        color: #464668;
        font-weight: 500;
        font-size: 14px;
        .required {
          font-size: 14px;
          color: red;
        }
      }
      .header-width {
        width: 100px;
      }
      .header-action {
        width: 170px;
      }
    }
    .table-content {
      width: 100%;
      display: flex;
      .item {
        width: calc((100% - 250px) / 4);
        padding: 10px;
        height: 54px;
        border: 1px solid #dfe6ec;
        line-height: 34px;
        border-top: none;
        &:nth-child(2n) {
          border-right: none;
          border-left: none;
        }
        &:last-child {
          border-right: 1px solid #dfe6ec;
        }
        span {
          color: #2276ff;
          font-size: 14px;
          margin-right: 4px;
          cursor: pointer;
          font-weight: 400;
          &:hover {
            font-weight: 500;
          }
        }
        .item-input {
          flex: 1;
        }
        .item-select {
          width: 150px;
        }
        .protect-rights-name {
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-decoration: underline;
          cursor: pointer;
        }
      }
      .item-width {
        width: 100px;
      }
      .item-action {
        width: 190px;
        p {
          margin: 0;
        }
      }
    }
  }
  .add-derails {
    margin-top: 10px;
  }
  .insurance-fee {
    width: 100%;
    display: flex;
    align-items: center;
    .insurance-fee-input {
      flex: 1;
    }
    .insurance-fee-select {
      width: 150px;
      position: relative;
      top: 11px;
    }
    .button {
      width: 96px;
      height: 36px;
      background: rgba(34, 118, 255, 1);
      line-height: 36px;
      text-align: center;
      color: #fff;
      cursor: pointer;
      font-size: 12px;
      font-weight: 500;
      &:hover {
        background: rgba(34, 118, 255, 0.8);
      }
      border-radius: 0 4px 4px 0;
    }
  }
  .el-select {
    width: 100%;
  }
  .premium {
    width: 100%;
    display: flex;
    // align-items: center;
    // justify-content: space-between;
    .premium-select {
      flex: 1;
    }
    .set-premium {
      width: 72px;
      height: 36px;
      background: #3599fe;
      border-radius: 4px;
      color: #fff;
      font-size: 14px;
      text-align: center;
      line-height: 36px;
      margin-top: 24px;
      margin-left: 24px;
    }
  }
}
</style>
