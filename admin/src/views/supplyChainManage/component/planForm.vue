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
          <el-form-item label="计划名称" prop="name">
            <el-input
              v-model="plan.name"
              placeholder="最多不超过10个字"
              maxlength="10"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否启用" prop="isEnable">
            <el-select v-model="plan.isEnable" placeholder="请选择是否启用">
              <el-option label="是" :value="true" />
              <el-option label="否" :value="false" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <div class="insurance-fee">
            <div class="insurance-fee-input">
              <el-form-item label="价格" prop="price">
                <el-input v-model="plan.price" placeholder="请输入保费" />
              </el-form-item>
            </div>
            <div class="insurance-fee-select">
              <el-form-item label="">
                <el-select v-model="plan.priceType" filterable placeholder="请选择分类">
                  <el-option
                    v-for="item in servicePricePeriods"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </div>
            <div class="button" @click="setPrice">AI定价参考</div>
          </div>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注">
            <el-input
              v-model="plan.remark"
              placeholder="最多不超过10个字"
              maxlength="10"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <div class="security-plan">
            <div class="title">计划详情</div>
            <div class="table">
              <div class="table-header">
                <div class="header header-width">序号</div>
                <div class="header">保险责任</div>
                <div class="header">保额</div>
                <div class="header header-action">操作</div>
              </div>
              <div
                v-for="(children, childrenIndex) in plan.planDetails"
                :key="childrenIndex"
                class="table-content"
              >
                <div class="item item-width">{{ childrenIndex + 1 }}</div>
                <div class="item">
                  <span class="required">*</span>
                  <el-select
                    v-model="children.insuranceTypeDetailId"
                    filterable
                    placeholder="请选择保险分类"
                  >
                    <el-option
                      v-for="item in insuranceTypes"
                      :key="item.id"
                      :label="item.content"
                      :value="Number(item.id)"
                    />
                  </el-select>
                </div>
                <div class="item">
                  <span class="required">*</span>
                  <el-input-number
                    v-model="children.price"
                    class="item-input"
                    controls-position="right"
                    :min="0"
                    placeholder="请输入保额"
                  />
                  <!-- <el-input class="item-input" v-model="children.price" placeholder="请输入保额"></el-input> -->
                  <el-select
                    v-model="children.priceType"
                    filterable
                    class="item-select"
                    placeholder="请选择单位"
                  >
                    <el-option
                      v-for="item in planPriceTypes"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </div>
                <div class="item item-action">
                  <span
                    v-if="childrenIndex"
                    @click="planMove(true, childrenIndex)"
                    >上移</span>
                  <span
                    v-if="plan.planDetails.length > 1"
                    @click="planMove(false, childrenIndex)"
                    >下移</span>
                  <span
                    v-if="plan.planDetails.length > 1"
                    @click="deleteDetails(childrenIndex)"
                    >删除</span>
                </div>
              </div>
            </div>
          </div>
          <div class="add-derails">
            <el-button
              v-if="pageAuthority.includes('edit')"
              type="primary"
              @click="addPlanDetails"
              >新增</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'PlanForm',
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
    }
    // insuranceType: {}
  },
  data() {
    const checkPrice = (rule, value, callback) => {
      if (!/(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/.test(value)) {
        return callback(new Error('请输入正确的价格'));
      }
      callback();
    };
    return {
      planRules: {
        name: [{ required: true, message: '请输入计划名称', trigger: 'blur' }],
        isEnable: [
          { required: true, message: '请选择是否启用', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入价格', trigger: 'blur' },
          { validator: checkPrice, trigger: 'blur' }
        ]
      },
      servicePricePeriods: [],
      // insuranceTypes: [],
      planPriceTypes: []
    };
  },
  computed: {
    insuranceTypes() {
      return this.$store.state.insuranceProducts.insuranceTypes || [];
    },
    pageAuthority() {
      // 170101 保险产品
      return this.$store.state.user.pageAuthority['170101'];
    }
  },
  created() {
    const vm = this;
    // 价格类型
    vm.$store
      .dispatch('app/getSysConfig', {
        code: 'priceType'
      })
      .then(res => {
        vm.servicePricePeriods = res.obj || [];
      });
    // 获取保费单位
    vm.$store
      .dispatch('app/getSysConfig', {
        code: 'planPriceType'
      })
      .then(res => {
        vm.planPriceTypes = res.obj || [];
      });
  },
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
    // 增加计划详情
    addPlanDetails() {
      this.plan.planDetails.push({
        insuranceTypeDetailId: '',
        price: '',
        priceType: 102
      });
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
          this.plan.planDetails.forEach(item => {
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
    }
  }
};
</script>
<style lang="scss" scoped>
.plan-form {
  .title {
    font-size: 12px;
    color: #606266;
    margin-bottom: 4px;
    font-weight: 500;
  }
  .table {
    .table-header {
      width: 100%;
      height: 31px;
      line-height: 31px;
      display: flex;
      background: #dee2e8;
      .header {
        width: calc((100% - 250px) / 2);
        padding-left: 10px;
        color: #2c2e3a;
        font-weight: 500;
        border-right: 1px solid #dfe6ec;
        font-size: 14px;
      }
      .header-width {
        width: 100px;
      }
      .header-action {
        width: 150px;
      }
    }
    .table-content {
      width: 100%;
      display: flex;
      .item {
        width: calc((100% - 250px) / 2);
        padding: 10px;
        height: 54px;
        border: 1px solid #dfe6ec;
        line-height: 34px;
        border-top: none;
        display: flex;
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
        .required {
          font-size: 14px;
          color: red;
        }
      }
      .item-width {
        width: 100px;
      }
      .item-action {
        width: 150px;
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
}
</style>
