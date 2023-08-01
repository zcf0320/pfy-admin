<template>
  <div class="page-products-details page-form modal-form">
    <el-container>
      <el-main>
        <div class="details-content flex-col">
          <Tab
            :btns="btns || []"
            :current-key="tabIndex"
            :disable="disable"
            @change="handleClick"
          />
          <div class="scroll-table">
            <div v-show="tabIndex === '0'">
              <div class="title-top content-detail">基础信息</div>
              <BaseForm
                v-if="tabIndex === '0'"
                :id="id"
                :edit="type"
                :base-form="form.baseForm"
                :post-status="postStatus"
                :shield="shield"
                :step="form.step"
              />
            </div>
            <div v-show="tabIndex === '1'">
              <div class="title-top content-detail">主险权益</div>
              <MainInterest
                v-if="tabIndex === '1'"
                :id="id"
                :edit="type"
                :main-protect-rights-id="form.mainRiskId"
                :post-status="postStatus"
                :shield="shield"
                :step="form.step"
              />
            </div>
            <div v-if="tabIndex === '2'">
              <InsurancePlan
                v-if="tabIndex === '2' && init"
                :id="id"
                :edit="type"
                :plans="form.plans"
                :main-right="mainRight"
                :post-status="postStatus"
                :shield="shield"
                :step="form.step"
              />
            </div>
            <div v-show="tabIndex === '3'">
              <!-- <div class="servicePackage"></div> -->
              <div class="title-top content-detail ">服务包</div>
              <AddServicePackage
                v-if="tabIndex === '3'"
                :id="id"
                :edit="type"
                :package-id="form.packageId"
                :post-status="postStatus"
                :shield="shield"
                :step="form.step"
              />
            </div>
            <div v-show="tabIndex === '4'">
              <InsuranceRule
                v-if="tabIndex === '4'"
                :id="id"
                :edit="type"
                :rules="form.rules"
                :post-status="postStatus"
                :shield="shield"
                :step="form.step"
              />
            </div>
            <div v-show="tabIndex === '5'">
              <ReviewMaterials
                v-if="tabIndex === '5'"
                :id="id"
                :edit="type"
                :post-status="postStatus"
                :shield="shield"
                :step="form.step"
              />
            </div>
            <div v-show="tabIndex === '6'">
              <div class="title-top content-detail">保险内容</div>
              <InsuranceContent
                v-if="tabIndex === '6'"
                :id="id"
                :edit="type"
                :base-form="form.content"
                :post-status="postStatus"
                :shield="shield"
                :step="form.step"
              />
            </div>
            <div v-if="tabIndex === '7'">
              <Settlement
                :id="id"
                :edit="type"
                :post-status="postStatus"
                :shield="shield"
              />
            </div>
            <div v-if="tabIndex === '8'">
              <div class="title-top content-detail">保单设置</div>
              <PresetSalesVolume
                v-if="tabIndex === '8'"
                :id="id"
                :post-status="postStatus"
                :shield="shield"
                :edit="type"
              />
            </div>
            <div v-if="tabIndex == '9'">
              <Logs :id="$route.params.id" :type="'4'" :has-o-a-log="true" />
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { operationType, menuType } from '@/utils/enum';
import InsuranceContent from './component/insuranceContent';
import BaseForm from './component/baseForm';
import MainInterest from './component/mainInterest';
import InsurancePlan from './component/insurancePlan';
import AddServicePackage from './component/addServicePackage';
import InsuranceRule from './component/insuranceRule';
import ReviewMaterials from './component/reviewMaterials';
import PresetSalesVolume from './component/presetSalesVolume';
import Settlement from './component/settlement';
export default {
  name: 'ProductDetails',
  components: {
    InsuranceContent,
    BaseForm,
    MainInterest,
    InsurancePlan,
    AddServicePackage,
    InsuranceRule,
    ReviewMaterials,
    PresetSalesVolume,
    Settlement
  },
  data() {
    return {
      init: false,
      disable: true,
      id: '',
      type: 'detail',
      isShow: false,
      tabIndex: '0',
      form: {
        baseForm: {
          name: '',
          type: [],
          companyId: '',
          suitPeople: '',
          suitAge: '',
          insuranceTime: 4430,
          jobId: '',
          packageIds: [],
          packages: [],
          insuranceRules: 1,
          postStatus: 107,
          signedAreaId: '',
          waitTime: 0,
          insuranceTimeUnit: 1,
          renewalOrNot: '',
          renewalAge: '',
          renewalPeriod: ''
        },
        mainRiskId: [],
        step: 0
      },
      needDataShow: {
        0: [],
        1: [],
        2: [],
        3: []
      },
      backDataShow: {
        0: [],
        1: [],
        2: [],
        3: []
      },
      operationType,
      menuType,
      mainRight: [],
      postStatus: 107,
      shield: 184,
      btns: [
        { value: '0', name: '基础信息' },
        { value: '1', name: '主险权益' },
        { value: '2', name: '保障计划' },
        { value: '3', name: '服务包' },
        { value: '4', name: '投保规则' },
        { value: '5', name: '理赔规则' },
        { value: '6', name: '保险内容' },
        { value: '7', name: '结算规则' },
        { value: '8', name: '保单设置' },
        { value: '9', name: '操作日志' }
      ]
    };
  },
  computed: {
    pageAuthority() {
      // 170101 保险产品
      return this.$store.state.user.pageAuthority['170101'];
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.type = this.$route.params.type;
    this.tabIndex = this.$route.query.tab || '0';
    this.getInsuranceProductsDetails(this.id);
  },
  mounted() {},
  methods: {
    // tab切换
    handleClick(tab) {
      this.tabIndex = tab;
      //   this.getInsuranceProductsDetails(this.id);
    },
    // 获取保险产品详情
    getInsuranceProductsDetails(id) {
      this.init = false;
      const vm = this;
      vm.$store
        .dispatch('insuranceProducts/getInsuranceProductsDetails', {
          id
        })
        .then(res => {
          if (res.obj.plans != null) {
            res.obj.plans.forEach(plan => {
            plan.planDetails.forEach(item => {
              item['mainDeputy'] = item.rightType;
            });
          });
          }
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
              renewalOrNot: res.obj.renewalOrNot,
              renewalAge: res.obj.renewalAge,
              renewalPeriod: res.obj.renewalPeriod
            },
            // 服务包信息
            packageId: res.obj.servicePackage ? res.obj.servicePackage.id : '',
            // 投保规则
            rules: res.obj.rules,
            plans: res.obj.plans || []
          };

          // 保障计划的主险信息
          const mainRiskId = [];
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
          // 发布状态
          this.postStatus = res.obj.postStatus;
          // 链接屏蔽状态
          this.shield = res.obj.shield;
          this.disable = false;

          if (vm.$route.params.tabIndex === '8') {
            this.handleClick(vm.$route.params.tabIndex);
          }
          this.init = true;
        });
    },
    // 查看服务包详情
    lookServicePackageDetail(id) {
      const routeData = this.$router.resolve({
        path: `/supplyChainManage/servicePackage/details/${id}/detail`
      });
      window.open(routeData.href, '_blank');
    }
  }
};
</script>
<style lang="scss" scoped>
.el-main {
  &.no-pression {
    padding-bottom: 30px;
  }
  padding-bottom: 0;
}
.page-products-details {
  .btn-group  {
   border-bottom: 1px solid #EBEDF2;
  }
  .log-item {
    margin-top: 12px;
    display: flex;
    align-items: center;
    .circle {
      width: 10px;
      height: 10px;
      background-color: #2276ff;
      border-radius: 50%;
      margin-right: 6px;
    }
    .log-details {
      flex: 1;
      span {
        margin-right: 12px;
        color: #b9b9b9;
      }
      .color-hight {
        color: #282828;
      }
    }
  }
}
</style>
