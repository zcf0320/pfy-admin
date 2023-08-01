<template>
  <el-container>
    <div class="insurance-dashboard-page">
      <el-scrollbar style="height: 100%; overflow-x: hidden">
        <div class="insurance-data">
          <div class="insurance-data-title flex">整体数据</div>
          <div class="insurance-data-all flex layout">
            <div class="insurance-data-layout-left all-card all-height">
              <div class="all-left-top flex">
                <div class="all-left-top-num">
                  <span>{{ insuranceDetails.partnerCompanyNumAll || 0 }}</span>
                  <div>合作保险机构</div>
                </div>
                <div class="all-left-top-icon" />
              </div>
              <div class="all-progress-box ">
                <div class="all-progress">
                  <div class="all-progress-name">
                    个险
                    <span class="title">{{ policyDetails.personNum }}</span>
                  </div>
                  <el-progress
                    :percentage="policyDetails.personRate || 0"
                    :stroke-width="14"
                    color="#5FAEFF"
                    :show-text="false"
                    class="insurance-bar"
                  />
                  <div class="all-progress-num" style="color:#5FAEFF">
                    {{ policyDetails.personRate || 0 }}%
                  </div>
                </div>
                <div class="all-progress">
                  <div class="all-progress-name">
                    团险
                    <span class="title">{{ policyDetails.groupNum }}</span>
                  </div>
                  <el-progress
                    :percentage="policyDetails.groupRate || 0"
                    :stroke-width="14"
                    color="#18C4BD"
                    :show-text="false"
                    class="insurance-bar"
                  />
                  <div class="all-progress-num" style="color:#18C4BD">
                    {{ policyDetails.groupRate || 0 }}%
                  </div>
                </div>
              </div>
              <div class="all-left-btm flex">
                <div class="all-left-btm-item flex">
                  {{ insuranceDetails.reInsuranceCompanyNum || 0 }}
                  <div>再保公司</div>
                </div>
                <div class="all-left-btm-item flex">
                  {{ insuranceDetails.partnerBrokerageCompanyNum || 0 }}
                  <div>保险经纪公司</div>
                </div>
                <div class="all-left-btm-item flex">
                  {{ insuranceDetails.partnerInsuranceCompanyNum || 0 }}
                  <div>保险公司</div>
                </div>
              </div>
            </div>
            <div class="insurance-data-layout-right card all-height">
              <div class="charts-title flex">
                <div class="icon" />
                保险产品库
              </div>
              <Echarts
                id="productOptions"
                :options="productOptions"
                :width="'100%'"
                style="margin-left:-18%"
              />
            </div>
          </div>
          <div class="insurance-data-picker flex">
            <div class="insurance-data-title flex" style="margin-bottom:0">
              保险数据
            </div>
            <el-date-picker
              v-model="year"
              type="year"
              placeholder="选择年"
              :clearable="false"
              :picker-options="pickerOptions"
              @change="changeTime"
            />
          </div>
          <div class="year-data flex">
            <div class="year-data-left">
              <div class="year-data-fee shadow">
                <div class="fee">
                  <div class="fee-item flex mt0">
                    <div class="fee-item-fee" />
                    <div class="fee-item-right">
                      <div>{{ policyDetails.premium || 0 }}</div>
                      <div class="text">累计保费</div>
                    </div>
                  </div>
                  <div class="fee-item flex">
                    <div class="fee-item-sale" />
                    <div class="fee-item-right">
                      <div>{{ policyDetails.yearAmount || 0 }}</div>
                      <div class="text">总销量</div>
                    </div>
                  </div>
                  <div class="fee-item flex ">
                    <div class="fee-item-total-sale" />
                    <div class="fee-item-right">
                      <div>{{ policyDetails.monthAmount || 0 }}</div>
                      <div class="text">本月累计销量</div>
                    </div>
                  </div>
                </div>
                <div class="all-progress">
                  <div class="all-progress-name">
                    个险
                    <span class="title">{{ policyDetails.personNum }}</span>
                  </div>
                  <el-progress
                    :percentage="policyDetails.personRate || 0"
                    :stroke-width="14"
                    color="#5FAEFF"
                    :show-text="false"
                    class="insurance-bar"
                  />
                  <div class="all-progress-num" style="color:#5FAEFF">
                    {{ policyDetails.personRate || 0 }}%
                  </div>
                </div>
                <div class="all-progress">
                  <div class="all-progress-name">
                    团险
                    <span class="title">{{ policyDetails.groupNum }}</span>
                  </div>
                  <el-progress
                    :percentage="policyDetails.groupRate || 0"
                    :stroke-width="14"
                    color="#18C4BD"
                    :show-text="false"
                    class="insurance-bar"
                  />
                  <div class="all-progress-num" style="color:#18C4BD">
                    {{ policyDetails.groupRate || 0 }}%
                  </div>
                </div>
              </div>
              <div class="year-data-statistic shadow">
                <div class="charts-title flex">
                  <div class="icon" />
                  核保统计
                </div>
                <div
                  class="year-data-statistic-contianer"
                  style="margin-top:8px"
                >
                  <div class="title flex">
                    <span>核赔通过</span
                    ><span>{{ policyDetails.underwritingPassNum || 0 }}</span>
                  </div>
                  <el-progress
                    :percentage="policyDetails.underwritingPassRate || 0"
                    :text-inside="false"
                    :stroke-width="14"
                    color="#3599FE"
                    :show-text="false"
                    class="insurance-bar2"
                  />
                </div>
                <div class="year-data-statistic-contianer">
                  <div class="title flex">
                    <span>核赔不通过</span
                    ><span>{{ policyDetails.claimReviewNotPassNum || 0 }}</span>
                  </div>
                  <el-progress
                    :percentage="policyDetails.claimReviewNotPassRate || 0"
                    :text-inside="false"
                    :stroke-width="14"
                    color="#3599FE"
                    :show-text="false"
                    class="insurance-bar2"
                  />
                </div>
                <div
                  class="year-data-statistic-contianer"
                  style="margin-bottom:24px"
                >
                  <div class="title flex">
                    <span>初审待审核</span
                    ><span class="link-skip" @click="toDetail(1)">{{
                      policyDetails.claimReviewProcessingNum || 0
                    }}</span>
                  </div>
                  <el-progress
                    :percentage="policyDetails.claimReviewProcessingRate || 0"
                    :text-inside="false"
                    :stroke-width="14"
                    color="#3599FE"
                    :show-text="false"
                    class="insurance-bar2"
                  />
                </div>
                <div class="charts-title flex">
                  <div class="icon1" />
                  智能核赔预警统计
                </div>
                <div class="title flex">
                  <span>有异常</span><span>无异常</span>
                </div>
                <Bar v-bind="processBarModel" />
              </div>
            </div>
            <div class="year-data-right">
              <div class="year-data-age shadow flex">
                <div class="year-data-age-left">
                  <div class="charts-title flex">
                    <div class="icon" />
                    保单年龄分布
                  </div>
                  <Echarts
                    id="policyAge"
                    :options="policyAge"
                    :width="'100%'"
                  />
                </div>
                <div class="year-data-age-line" />
                <div class="year-data-age-right">
                  <div class="charts-title flex">
                    <div class="icon" />
                    核赔统计
                  </div>
                  <Echarts
                    id="policyStatistics"
                    :options="policyStatistics"
                    :width="'100%'"
                  />
                </div>
              </div>
              <div class="year-data-classify shadow">
                <div class="charts-title flex">
                  <div class="icon" />
                  保单分类分布
                </div>
                <Echarts
                  id="policyType"
                  :options="policyType"
                  :width="'100%'"
                />
              </div>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </el-container>
</template>

<script>
import {
  productOptions,
  policyAge,
  policyType,
  policyStatistics
} from './config';
import { mapActions } from 'vuex';
import moment from 'moment';
import Bar from './bar.vue';
export default {
  name: 'InsuranceDashboard',
  components: { Bar },
  data() {
    return {
      year: new Date(),
      productOptions,
      policyAge,
      policyType,
      policyStatistics,
      insuranceDetails: {
        partnerCompanyNumAll: 0,
        partnerInsuranceCompanyNum: 0,
        partnerBrokerageCompanyNum: 0,
        reInsuranceCompanyNum: 0,
        productNum: 0
      },
      policyDetails: {
        yearAmount: 0,
        monthAmount: 0,
        genderMaleNum: 0,
        genderFemaleNum: 0,
        genderMaleRate: 0,
        personNum: 0,
        groupNum: 0,
        underwritingPassNum: 0,
        underwritingPassRate: 0,
        underwritingNotPassNum: 0,
        underwritingNotPassRate: 0,
        underwritingProcessingNum: 0,
        underwritingProcessingRate: 0
      },
      pickerOptions: {
        disabledDate(time) {
          return (
            time.getTime() > Date.now() - 8.64e7 ||
            moment(time).format('YYYY') < 2020
          );
        }
      },
      processBarModel: {
        processValue: [0, 0] // 此处是每个进度的值
      }
    };
  },
  created() {
    this.getStatisticsAll().then(res => {
      this.insuranceDetails = res.data;

      const INSURANCE_TYPE = {
        个险: 'productPersonNum',
        团险: 'productGroupNum',
        重疾险: 'productCriticalIllnessNum',
        防癌险: 'productAntiCancerNum',
        意外险: 'productAccidentNum',
        一般医疗险: 'productGeneralMedicalNum',
        百万医疗险: 'productMillionMedicalNum',
        慢性病险: 'productChronicDiseaseNum',
        齿科: 'productDentistryNum',
        中端医疗险: 'productMidrangeMedicalNum',
        高端医疗险: 'productTopMedicalNum',
        医美: 'productMedicalBeautyNum'
      };
      this.productOptions.series.forEach(items => {
        items.data.forEach(item => {
          item.value = res.data[INSURANCE_TYPE[item.name]] || 0;
        });
      });
      this.productOptions.title.text = this.insuranceDetails.productNum || 0;
    });
    this.changeTime(this.year);
  },
  methods: {
    ...mapActions('insuranceProducts', ['getStatisticsAll', 'getStatistics']),
    // 时间改变
    changeTime(year) {
      this.getStatistics({
        year: moment(year).format('YYYY')
      }).then(res => {
        this.policyDetails = res.data || {};
        const arr = [];
        arr.push(
          this.policyDetails.aiClaimReviewExceptionNum || 0,
          this.policyDetails.aiClaimReviewNormalNum || 0,
        );
        this.processBarModel.processValue = arr;
        const STATISTICS_TYPE = {
          核赔通过: 'claimReviewPassNum',
          核赔不通过: 'claimReviewNotPassNum',
          初审待审核: 'claimReviewProcessingNum',
          待医学核赔: 'secondClaimReviewProcessingNum'
        };
        this.policyStatistics.series.forEach(items => {
          items.data.forEach(item => {
            item.value = res.data[STATISTICS_TYPE[item.name]] || 0;
          });
        });
        const AGE_TYPE = {
          小于18岁: 'age018Num',
          '18岁～30岁': 'age1830Num',
          '30岁～45岁': 'age3045Num',
          '45岁～65岁': 'age4565Num',
          大于65岁: 'age65Num',
          未知: 'ageUnknownNum'
        };
        const GENDER_TYPE = {
          男: 'genderMaleNum',
          女: 'genderFemaleNum',
          未知: 'genderUnknownNum'
        };
        const POLICY_TYPE = {
          防癌险: 'antiCancerNum',
          意外险: 'accidentNum',
          重疾险: 'criticalIllnessNum',
          一般医疗险: 'generalMedicalNum',
          百万医疗险: 'millionMedicalNum',
          中端医疗险: 'midrangeMedicalNum',
          医美: 'medicalBeautyNum',
          高端医疗险: 'topMedicalNum',
          齿科: 'dentistryNum',
          特药险: 'specialMedicineNum',
          慢性病用药险: 'chronicDiseaseNum'
        };
        this.policyAge.series.forEach((item, index) => {
          item.data.forEach(child => {
            if (index === 1) {
              child.value = res.data[GENDER_TYPE[child.name]];
              if (child.value) {
                // 为0的时候不显示文本
                child.label.show = true;
              }
            } else {
              child.value = res.data[AGE_TYPE[child.name]];
            }
          });
        });
        this.policyType.series[0].data.forEach(item => {
          item.value = res.data[POLICY_TYPE[item.name]];
        });
      });
    },
    // 跳转页面
    toDetail(type) {
      if (type === 1) {
        // 全局注入 判断是否有菜单权限
        // if (
        //   !this.hasMenuAuth(
        //     'PersonalInsuranceRecord',
        //     '/policyManage',
        //     '/policyManage/personalPolicy'
        //   )
        // ) {
        //   return;
        // }
        const routeData = this.$router.resolve({
          path: `/insuranceRecord/personalInsuranceRecord`,
          query: { state: 0 }
        });
        window.open(routeData.href, '_blank');
      } else if (type === 2) {
        // 全局注入 判断是否有菜单权限
        if (
          !this.hasMenuAuth(
            '/insuranceManage',
            '/claimManagement',
            '/claimManagement/auditRecords',
          )
        ) {
          return;
        }
        const routeData = this.$router.resolve({
          path: `/claimManagement/auditRecords`,
          query: { state: 1 }
        });
        window.open(routeData.href, '_blank');
      } else if (type === 3) {
        const routeData = this.$router.resolve({
          path: `/dataCenter/zhonghan`
        });
        window.open(routeData.href, '_blank');
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.insurance-dashboard-page {
  width: 100%;
  min-height: calc(100vh - 160px);
  max-height: calc(100vh - 160px);
  overflow-y: auto;
  overflow-x: hidden;
  .insurance-data {
    color: #464668;
    &-title {
      font-size: 18px;

      font-weight: bold;
      color: #545473;
      line-height: 18px;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 24px;
    }
    &-title::before {
      content: '';
      display: block;
      width: 4px;
      height: 16px;
      background: #3599fe;
      margin-right: 12px;
    }
    .layout {
      justify-content: space-between;
      align-items: center;
      margin-bottom: 18px;
    }
    .card {
      background: #ffffff;
      box-shadow: 0px 6px 12px 0px rgba(242, 242, 242, 0.5);
      border-radius: 4px;
      padding: 26px 24px;
    }
    .all-card {
      background: #ffffff;
      box-shadow: 0px 6px 12px 0px rgba(242, 242, 242, 0.5);
      border-radius: 4px;
      padding: 18px 24px;
    }
    &-layout-left {
      width: 452px;
      margin-right: 24px;
    }
    &-layout-right {
      flex: 1;
    }
    .all-height {
      height: 323px;
    }
    .all-left-top {
      justify-content: space-between;
      align-items: center;
      padding-bottom: 16px;
      box-shadow: 0px 1px 0px 0px #e8e8e8;
      margin-bottom: 24px;
      &-num {
        span {
          color: #464668;
          font-weight: bold;
          font-size: 38px;
        }
        div {
          font-size: 16px;
        }
      }
      &-icon {
        width: 90px;
        height: 72px;
        background: url('./images/cooperation.svg');
        background-size: 100% 100%;
      }
    }
    .all-progress-box {
      padding-bottom: 8px;
      box-shadow: 0px 1px 0px 0px #e8e8e8;
    }

    .all-left-btm {
      margin-top: 24px;
      justify-content: space-between;
      align-items: center;
      &-item {
        font-size: 18px;
        font-weight: bold;
        color: #464668;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        div {
          font-size: 14px;
          color: #a2a3b7;
          margin-top: 9px;
        }
      }
    }
    .all-progress {
      font-size: 14px;
      color: #a2a3b7;
      position: relative;
      margin-bottom: 16px;

      &-name {
        margin-bottom: 4px;
        .title {
          font-weight: bold;
          margin-left: 3px;
          color: #464668;
        }
      }
      &-box {
        justify-content: space-between;
        align-items: flex-end;
      }
      &-num {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 42px;
        font-size: 18px;
        font-weight: bold;
      }
    }
    .charts-title {
      justify-content: flex-start;
      align-items: center;
      font-weight: bold;
      .icon {
        width: 16px;
        height: 16px;
        background: url('./images/pie.svg');
        background-size: 100% 100%;
        margin-right: 8px;
      }
    }
    &-picker {
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .year-data {
      justify-content: space-between;
      align-items: flex-start;
      &-left {
        width: 452px;
        margin-right: 24px;
      }
      &-right {
        flex: 1;
      }
      .shadow {
        background: #ffffff;
        box-shadow: 0px 6px 12px 0px rgba(242, 242, 242, 0.5);
        border-radius: 4px;
      }
      &-fee {
        padding: 24px;
        height: 386px;
        margin-bottom: 24px;
      }
      .fee {
        padding-bottom: 24px;
        box-shadow: 0px 1px 0px 0px #e8e8e8;
        margin-bottom: 24px;
        .fee-item {
          margin-left: 10px;
          justify-content: flex-start;
          align-items: center;
          margin-top: 32px;
          &-fee {
            width: 46px;
            height: 46px;
            background: url('./images/fee.svg');
            background-size: 100% 100%;
          }
          &-sale {
            width: 46px;
            height: 46px;
            background: url('./images/sale.svg');
            background-size: 100% 100%;
          }
          &-total-sale {
            width: 46px;
            height: 46px;
            background: url('./images/total-sale.svg');
            background-size: 100% 100%;
          }
          &-right {
            margin-left: 20px;
            font-size: 24px;
            font-weight: bold;
            .text {
              font-size: 14px;
              margin-top: 6px;
              font-weight: normal;
            }
          }
        }
      }

      &-statistic {
        height: 323px;
        padding: 24px;
        .icon {
          width: 16px;
          height: 16px;
          background: url('./images/policy.svg');
          background-size: 100% 100%;
          margin-right: 8px;
        }
        .icon1 {
          width: 16px;
          height: 16px;
          background: url('./images/alert.svg');
          background-size: 100% 100%;
          margin-right: 8px;
        }
        .title {
          justify-content: space-between;
          align-items: center;
          margin: 18px 0 7px;
          font-size: 14px;
        }
        &-contianer {
          margin-bottom: 18px;
        }
      }
      &-age {
        height: 323px;
        margin-bottom: 24px;
        justify-content: flex-start;
        align-items: center;
        padding: 24px;
        &-left {
          width: 56%;
          height: 100%;
          .icon {
            width: 16px;
            height: 16px;
            background: url('./images/distribution.svg');
            background-size: 100% 100%;
            margin-right: 8px;
          }
        }
        &-right {
          flex: 1;
          height: 100%;
          .icon {
            width: 16px;
            height: 16px;
            background: url('./images/policy.svg');
            background-size: 100% 100%;
            margin-right: 8px;
          }
        }
        &-line {
          width: 24px;
          height: 225px;
          box-shadow: -1px 0px 0px 0px #e8e8e8;
        }
      }
      &-classify {
        height: 386px;
        padding: 24px;
        .icon {
          width: 16px;
          height: 16px;
          background: url('./images/insurance.svg');
          background-size: 100% 100%;
          margin-right: 8px;
        }
      }
    }
    .mt0 {
      margin-top: 0 !important;
    }
  }
}
</style>
