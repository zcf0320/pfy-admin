<template>
  <div class="create-product-page modal-form">
    <el-container>
      <el-main class="flex-col">
        <div class="step">
          <el-steps :active="activeIndex" align-center finish-status="success">
            <el-step title="录入基本资料" />
            <el-step title="确定主险" />
            <el-step title="制定保障计划" />
            <el-step title="添加服务包" />
            <el-step title="完善投保规则" />
            <el-step title="理赔规则" />
            <el-step title="配置保单规则" />
            <el-step title="完成" />
          </el-steps>
        </div>
        <div class="step-content scroll-table">
          <BaseForm
            v-show="activeIndex === 0"
            edit="create"
            :id="id"
            :base-form="form.baseForm"
            :post-status="postStatus"
            :shield="shield"
            :step="form.step"
            @next="nextStep"
          />
          <MainInterest
            edit="create"
            v-show="activeIndex === 1"
            :id="id"
            :main-protect-rights-id="form.mainRiskId"
            :post-status="postStatus"
            :shield="shield"
            :step="form.step"
            @back="backStep"
            @next="nextStep"
          />
          <InsurancePlan
            v-if="activeIndex === 2"
            edit="create"
            :id="id"
            :plans="form.plans"
            :main-right="mainRight"
            :post-status="postStatus"
            :shield="shield"
            :step="form.step"
            @back="backStep"
            @next="nextStep"
            @changeInsurableInterest="changeInsurableInterest"
            @deleteInsurableInterest="deleteInsurableInterest"
          />
          <AddServicePackage
            v-if="activeIndex === 3"
            edit="create"
            :id="id"
            :package-id="form.packageId"
            :post-status="postStatus"
            :shield="shield"
            :step="form.step"
            @back="backStep"
            @next="nextStep"
          />
          <InsuranceRule
            v-if="activeIndex === 4"
            edit="create"
            :id="id"
            :rules="form.rules"
            :post-status="postStatus"
            :shield="shield"
            :step="form.step"
            @back="backStep"
            @next="nextStep"
          />
          <ReviewMaterials
            v-if="activeIndex === 5"
            edit="create"
            :id="id"
            :post-status="postStatus"
            :shield="shield"
            :step="form.step"
            @back="backStep"
            @next="nextStep"
          />

          <PresetSalesVolume
            v-if="activeIndex === 6"
            :id="id"
            edit="create"
            :post-status="postStatus"
            :shield="shield"
            @back="backStep"
            @next="nextStep"
          />
          <Result v-if="activeIndex === 7 && id" :id="id" />
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import BaseForm from './component/baseForm';
import MainInterest from './component/mainInterest';
import InsurancePlan from './component/insurancePlan';
import AddServicePackage from './component/addServicePackage';
import InsuranceRule from './component/insuranceRule';
import Result from './component/result';
import ReviewMaterials from './component/reviewMaterials';
import PresetSalesVolume from './component/presetSalesVolume';
export default {
  name: 'CreateProduct',
  components: {
    BaseForm,
    MainInterest,
    InsurancePlan,
    AddServicePackage,
    InsuranceRule,
    Result,
    ReviewMaterials,
    PresetSalesVolume
  },
  data() {
    return {
      activeIndex: 0,
      form: {
        baseForm: {
          name: '',
          type: [],
          companyId: '',
          suitAge: '',
          insuranceTime: 4430,
          jobId: '',
          coverage: '',
          saleChannel: '',
          signedAreaId: '',
          waitTime: 0,
          insuranceTimeUnit: 1,
          renewalOrNot: false,
          renewalAge: '',
          renewalPeriod: ''
        },
        mainRiskId: [],
        plans: [
          {
            name: '',
            planDetails: [
              {
                protectRightsId: '',
                protectRightsPriceSettingIds: '',
                mainDeputy: ''
              }
            ],
            premiumRuleType: 1,
            customPremium: {
              formType: '',
              timeUnit: 1,
              table: []
            }
          }
        ],
        packageId: '',
        rules: {},
        reviewMaterials: [],
        step: 0
      },
      id: '',
      mainRight: [],
      postStatus: 107,
      shield: 184
    };
  },
  computed: {},
  created() {
    if (this.$route.params.id && this.$route.params.id !== 'add') {
      this.getInsuranceProductsDetails(this.$route.params.id);
    }
  },
  methods: {
    // 下一步
    async nextStep(item) {
      const { activeIndex, data } = item;
      const { step } = this.form;
      if (activeIndex === 1) {
        this.id = data.id;
      }
      if (activeIndex === 2 && step < 2) {
        this.form.plans.forEach(item => {
          item.planDetails.splice(0, 1);
          item.planDetails = data.data;
        });
        this.form.mainProtectRightsId = data.id;
        this.mainRight = data.data;
      } else if (activeIndex === 3 && step < 3) {
        this.plans = data.data;
      } else if (activeIndex === 5 && step < 5) {
        this.form.rules = data.rules;
      }
      this.activeIndex = activeIndex;
      // 是否需要更新步骤
      if (data.stepState) {
        this.changeStep(activeIndex);
      }
    },
    // 上一步
    backStep(item) {
      const { activeIndex } = item;
      this.activeIndex = activeIndex;
    },
    // 保险产品创建
    async createProduct() {
      const postData = {
        ...this.form.baseForm,
        ...this.form
      };
      delete postData.baseForm;
      await this.$store
        .dispatch('insuranceProducts/addInsuranceProducts', postData)
        .then(res => {
          if (!res.code) {
            this.activeIndex = 6;
            this.id = res.obj;
          }
        });
    },
    // 更改创建状态
    changeStep(step) {
      this.form.step = step;
    },
    // 获取保险产品详情
    getInsuranceProductsDetails(id) {
      const vm = this;
      vm.id = id;
      vm.$store
        .dispatch('insuranceProducts/getInsuranceProductsDetails', {
          id
        })
        .then(res => {
          vm.form = {
            ...res.obj,
            // 基础信息
            baseForm: {
              coverage: res.obj.coverage,
              insuranceTime: res.obj.insuranceTime,
              companyId: res.obj.companyDto.id,
              jobId: res.obj.jobId,
              name: res.obj.name,
              orderNumber: res.obj.orderNumber,
              postStatus: res.obj.postStatus,
              saleChannel: res.obj.saleChannel,
              suitAge: res.obj.suitAge,
              type: res.obj.type,
              id: res.obj.id,
              signedAreaId: res.obj.signedAreaId,
              waitTime: res.obj.waitTime,
              insuranceTimeUnit: res.obj.insuranceTimeUnit,
              renewalOrNot: res.obj.renewalOrNot
            },
            // 服务包信息
            packageId: res.obj.servicePackage ? res.obj.servicePackage.id : '',
            // 投保规则
            rules: res.obj.rules,
            plans: res.obj.plans || [],

            step: res.data.step || 0
          };
          // 保障计划的主险信息
          const mainRiskId = [];

          res.obj.mainRightVOList &&
            res.obj.mainRightVOList.forEach(element => {
              mainRiskId.push(element.mainRightId);
              this.mainRight.push({
                protectRightsId: element.mainRightId,
                protectRightsPriceSettingIds: '',
                protectRightsName: element.name,
                protectRightsPrice: '',
                mainDeputy: 158
              });
            });
          vm.form.mainRiskId = mainRiskId;
          // vm.mainRight = {
          //     protectRightsId: res.obj.mainRiskId,
          //     protectRightsPriceSettingIds: '',
          //     protectRightsName: res.obj.mainRiskName,
          //     protectRightsPrice: ''
          // }
          // 发布状态
          vm.postStatus = res.obj.postStatus;
          // 链接屏蔽状态
          vm.shield = res.obj.shield;
          vm.activeIndex = res.data.step;
        });
    },
    // 保险权益审核资料
    changeInsurableInterest(item) {
      if (
        this.form.insurableInterest.some(
          obj => obj.protectRightsId === item.protectRightsId,
        )
      ) {
        return;
      } else {
        this.form.insurableInterest.push({
          diseaseIds: [],
          hasReview: false,
          materials: [],
          minIntervalDay: 30,
          protectRightsId: item.protectRightsId,
          protectRightsName: item.protectRightsName
        });
      }
    },
    // 删除附险跟新审核资料数据
    deleteInsurableInterest(item) {
      const list = [];
      let index = 0;
      let deleteIndex = 0;

      this.form.plans.forEach(plan => {
        plan.planDetails.forEach(item => {
          list.push(item.protectRightsId);
        });
      });

      list.forEach(id => {
        if (id === item.protectRightsId) {
          index++;
        }
      });
      if (index) {
        return;
      } else {
        this.form.insurableInterest.forEach((m, n) => {
          if (m.protectRightsId === item.protectRightsId) {
            deleteIndex = n;
          }
        });
        this.form.insurableInterest.splice(deleteIndex, 1);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.create-product-page {
  .step {
    padding: 10px 0 20px;
    border-bottom: 1px solid #ebebeb;
  }
  .step-content {
    padding: 20px 50px;
  }
}
</style>
