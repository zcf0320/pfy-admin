<template>
  <div class="insurance-plan">
    <div v-for="(plan, index) in plans" :key="index" class="data-list">
      <div>
        <div class="title-top content-detail flex">
          <div class="fs-16">保障计划{{ index + 1 }}</div>
          <el-popconfirm
            title="删除后将不可恢复，是否删除？"
            placement="top"
            confirm-button-text="确认"
            cancel-button-text="取消"
            confirm-button-type="plain"
            cancel-button-type="primary"
            :hide-icon="true"
            @onConfirm="deletePlan(index)"
          >
            <span
              v-show="index && postStatus === 107 && edit !== 'details'"
              slot="reference"
              class="link-skip delete"
              style="textDecoration: none; color:#E85160"
              >删除</span
            >
          </el-popconfirm>
        </div>
      </div>
      <div class="data-item border-no">
        <PlanForm
          :id="id"
          :ref="'plan' + index"
          :ref-name="'plan' + index"
          :plan="plan"
          :index="index"
          :edit="edit === 'detail' || postStatus !== 107"
          @changePlan="changePlan"
        />
      </div>
    </div>
    <div class="add-button">
      <button
        v-if="plans.length < 25 && postStatus === 107 && edit !== 'detail'"
        type="button"
        class="btn-save"
        @click="addPlan"
      >
        +新增保障计划
      </button>
    </div>
    <div v-if="edit === 'edit'" class="page-footer">
      <!-- 待发布 -->
      <el-button
        v-if="postStatus === 107"
        type="primary"
        :loading="loading"
        @click.native.prevent="save('baseForm')"
        >保存</el-button
      >

      <Footer :id="id" :post-status="postStatus" :shield="shield" />
    </div>
    <div v-if="edit === 'create'" class="page-footer">
      <el-button @click.native.prevent="back()">上一步</el-button>
      <el-button
        type="primary"
        :loading="loading"
        @click.native.prevent="next('baseForm')"
        >保存并下一步</el-button
      >
    </div>
  </div>
</template>
<script>
import PlanForm from '../planForm';
import Footer from '../footer';
import { mapActions } from 'vuex';
export default {
  name: 'InsurancePlan',
  components: {
    PlanForm,
    Footer
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    plans: {
      type: Array,
      default: () => {
        [];
      }
    },
    mainRight: {
      type: Array,
      default: function() {
        return [];
      }
    },
    postStatus: {
      type: Number,
      default: 107
    },
    shield: {
      type: Number,
      default: 184
    },
    step: {
      type: Number,
      default: 3
    },
    edit: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      addPlanItem: {},

      loading: false
    };
  },
  computed: {
    pageAuthority() {
      // 170101 保险产品
      return this.$store.state.user.pageAuthority['170101'];
    }
  },
  // watch: {
  //     mainRight: function() {
  //         this.plans.map(item => {
  //             item.planDetails.splice(0, 1);
  //             item.planDetails = this.mainRight;
  //         });
  //     }
  // },
  created() {},
  methods: {
    ...mapActions('insuranceProducts', ['createOrUpdatePlan']),
    // 跟新保障计划
    save(type) {
      const vm = this;
      const promiseArr = [];
      vm.plans.forEach((_item, index) => {
        promiseArr.push(
          vm.$refs[`plan${index}`][0].getFormData(`plan${index}`),
        );
      });
      Promise.all(promiseArr)
        .then(res => {
          if (type) {
            let params = {};

            this.step > 2 || this.step === 0
              ? (params = {
                  plans: vm.plans,
                  insuranceProductId: this.id
                })
              : (params = {
                  plans: vm.plans,
                  insuranceProductId: this.id,
                  step: 3
                });
            this.loading = true;

            this.createOrUpdatePlan(params)
              .then(res => {
                this.loading = false;
                if (this.step === 0) {
                  this.$message.success(res.message);
                }
                if (this.step > 2) {
                  this.$emit('next', {
                    activeIndex: 3,
                    data: { ...vm.plans, stepState: false }
                  });
                } else {
                  this.$emit('next', {
                    activeIndex: 3,
                    data: { ...vm.plans, stepState: true }
                  });
                }
              })
              .catch(() => {
                this.loading = false;
              });
            return;
          }
          vm.updatePlan(res);
        })
        .catch(err => {
          vm.$message.error(err);
        });
    },
    // 保障计划改变
    changePlan(index, plan) {
      this.plans.forEach((item, orderNumber) => {
        if (orderNumber === index) {
          item = plan;
        }
      });
    },
    // 增加保障计划
    addPlan() {
      if (this.plans.length < 25) {
        const mainRight = [];
        this.mainRight.forEach(item => {
          if (item.mainDeputy) {
            mainRight.push(item);
          }
        });
        this.plans.push({
          name: '',
          premiumRuleType: 1,
          customPremium: {
            formType: '',
            timeUnit: 1,
            table: []
          },
          planDetails: mainRight
        });
      }
    },
    // 删除保障计划
    deletePlan(index) {
      const deletePlan = this.plans.splice(index, 1)[0];
      deletePlan.planDetails.forEach(item => {
        this.$emit('deleteInsurableInterest', item);
      });
    },
    // 获取保障计划
    getDetailPlan() {
      const vm = this;
      vm.$store
        .dispatch('insuranceProducts/getDetailPlan', {
          id: vm.id
        })
        .then(res => {
          if (res.obj.length) {
            this.plans = res.obj;
          }
        });
    },
    // 更新保障计划
    updatePlan() {
      const vm = this;
      this.loading = true;
      this.createOrUpdatePlan({
        plans: vm.plans,
        insuranceProductId: this.id
      })
        .then(res => {
          this.loading = false;
          if (res.status) {
            vm.$message.success(res.message);
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    // 上一步
    back() {
      this.$emit('back', {
        activeIndex: 1
      });
    },
    // 保存并新增
    next() {
      this.save(true);
    }
  }
};
</script>
<style lang="scss" scoped>
.insurance-plan {
    padding-top: 12px;
  padding-bottom: 24px;
      display: flex;
    flex-direction: column;
  // /deep/ .el-card__body {
  //   margin-top: 20px;
  // }
  .data-list:first-child{
    margin-top: 0px;
  }
  .data-list {
    margin-top: 20px;
    padding: 16px 24px;
    margin-bottom: 24px;
    box-shadow: 0px 0px 4px 0px #D4DEE7;
    border: 1px solid #D4DEE7;
    border-radius: 4px;
    .data-name {
      font-size: 14px;
      color: #282828;
      font-weight: 600;
    }
    .delete {
      font-size: 14px;
      margin-left: 10px;
      font-weight: 600;
      color:#F64E60;
      cursor: pointer;
      &:hover {
        font-weight: 500;
      }
    }
    .data-name-border {
      padding-left: 10px;
      position: relative;
      &::before {
        content: '';
        width: 4px;
        height: 14px;
        background: rgba(34, 118, 255, 1);
        position: absolute;
        top: 1px;
        left: 0;
      }
    }
    .data-name-none {
      font-size: 12px;
      color: #9f9f9f;
    }
    .data-item-table {
      padding: 24px 0;
    }
    .data-item {
      // padding: 24px 0;
      .add-certificates {
        margin-top: 20px;
      }
      span {
        margin-right: 24px;
      }
    }
  }
  .insurance-fee {
    width: 100%;
    display: flex;
    align-items: center;
    .insurance-fee-input {
      flex: 1;
    }
    .insurance-fee-select {
      width: 200px;
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
  .footer {
    margin: 10px 0;
  }

  .add-button {
    text-align: center;
    margin: 24px 0;
  }
}
</style>
