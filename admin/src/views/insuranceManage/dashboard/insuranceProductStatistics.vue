<template>
  <el-container class="productsReport">
    <el-scrollbar
      :native="false"
      wrap-class="el-main no-padding"
      tag="main"
      :noresize="false"
    >
      <div class="flex-between mb-24">
        <div class="title-top mb-0">保险产品数据</div>
        <div>
          <el-date-picker
            v-model="queryRange"
            value-format="timestamp"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :clearable="false"
            @change="getItemProduct"
          />
          <!--   :picker-options="pickerOptions" -->
        </div>
      </div>
      <div class="flex mb-24">
        <div class="productsTotal flex-center">
          <div>
            <div class="image" />
            <div class="number flex-center">{{ productTotal || 0 }}</div>
            <div class="tips flex-center">保险产品总量</div>
          </div>
        </div>
        <div class="productsType mr-24 flex-grow">
          <div class="title-line">保险产品类型</div>
          <Echarts id="policyAge" :options="productTypes" :width="'100%'" />
        </div>
        <div class="productsType flex-grow">
          <div class="title-line">保险产品分类</div>
          <Echarts id="productSort" :options="productSort" :width="'100%'" />
        </div>
      </div>
      <div class="insuranceDetails">
        <el-select
          v-model="productId"
          class="w-260 mb-24 selectItem"
          filterable
          remote
          :remote-method="getInsuranceProductList"
          placeholder="请输入保险产品"
          @change="getItemProduct"
        >
          <el-option
            v-for="item in productList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <div class="flex">
          <div class="w-720 mr-32">
            <div class="mb-20 h-36">
              <div class="title-line ">数据统计</div>
            </div>
            <div class="report-content flex">
              <div class="report-item mb-40 mr-60 flex">
                <div class="report-icon icon1" />
                <span class="content">
                  <div class="item-title">保障计划</div>
                  <span class="item-Number  w-24 flex skips" @click="goPage(1)">
                    <span>{{ detail.planNum || 0 }}</span>
                    <span class="unit">个</span>
                  </span>
                </span>
              </div>
              <div class="report-item mb-40 flex mr-60">
                <div class="report-icon icon2" />
                <span class="content">
                  <div class="flex-box">
                    <div class="item-title">累计销量</div>
                    <el-popover
                      placement="top-start"
                      width="500"
                      trigger="hover"
                      popper-class="normal"
                    >
                      <div class="tipBox">
                        <div class="tipTitle">
                          累计销量：
                        </div>
                        <div class="tipContent">
                          一段时间范围内，保单累计销量统计（不包含已撤单的数据）；
                        </div>
                      </div>

                      <div slot="reference" class="tips-icon" />
                    </el-popover>
                  </div>
                  <span
class="item-Number flex "
><span>{{ detail.policySales || 0 }}</span></span>
                </span>
              </div>
              <div class="report-item mb-40 flex mr-60">
                <div class="report-icon icon3" />
                <span class="content">
                  <div class="item-title">投保次数/人数</div>
                  <span
class="item-Number flex "
><span>{{ detail.onlinePolicySales || 0 }}/{{
                        detail.onlinePolicyholderNum || 0
                      }}</span></span>
                </span>
              </div>
              <div class="report-item mb-40 flex ">
                <div class="report-icon icon4" />
                <span class="content">
                  <div class="item-title">服务赔付率</div>
                  <span
class="item-Number flex "
><span>{{
                      detail.servicePaidRate
                        ? `${detail.servicePaidRate}%`
                        : '-'
                    }}</span></span>
                </span>
              </div>
              <div class="report-item flex mr-60">
                <div class="report-icon icon5" />
                <span class="content">
                  <div class="flex-box">
                    <div class="item-title">理赔发生率</div>
                    <el-popover
                      placement="top-start"
                      trigger="hover"
                      popper-class="normal"
                    >
                      <div class="tipBox">
                        <div class="tipTitle">
                          理赔发生率说明：
                        </div>
                        <div class="tipContent">
                          1、个险产品的“理赔发生率”=（理赔保单数/保单总数）*
                          100%
                        </div>
                        <div class="tipContent">
                          2、团险产品的“理赔发生率”=（理赔人数/参保人数）* 100%
                        </div>
                        <div class="tipContent fc-yellow">
                          注：理赔人数仅统计已经理赔审核通过的数据
                          参保人数不包含已经撤单的数据
                        </div>
                      </div>

                      <div slot="reference" class="tips-icon" />
                    </el-popover>
                  </div>
                  <span
                    class="item-Number flex skip flex w-75 "
                    @click="goPage(2)"
                    ><span>{{ detail.claimIncidenceRate || '0%' }}</span></span>
                </span>
              </div>
              <div class="report-item flex mr-60">
                <div class="report-icon icon6" />
                <span class="content">
                  <div class="flex-box">
                    <div class="item-title">有效保单</div>
                    <el-popover
                      placement="top-start"
                      trigger="hover"
                      popper-class="normal"
                    >
                      <div class="tipBox">
                        <div class="tipTitle">
                          有效保单：
                        </div>
                        <div class="tipContent">
                          未过期的在保状态的保单数据（不包含已撤单的数据）；
                        </div>
                      </div>

                      <div slot="reference" class="tips-icon" />
                    </el-popover>
                  </div>

                  <span
class="item-Number flex "
><span>{{ detail.validPolicySales || 0 }}</span><span class="unit">个</span></span>
                </span>
              </div>
              <div class="report-item flex mr-60">
                <div class="report-icon icon7" />
                <span class="content">
                  <div class="item-title">理赔申请次数/人数</div>
                  <span
class="item-Number flex "
><span>{{ detail.applyCount || 0 }}/{{
                        detail.applyPeopleCount || 0
                      }}</span></span>
                </span>
              </div>
              <div class="report-item flex ">
                <div class="report-icon icon8" />
                <span class="content">
                  <div class="item-title">累计保费</div>
                  <span
class="item-Number flex "
><span>{{ detail.premium || '-' }}</span></span>
                </span>
              </div>
            </div>
          </div>
          <div class="flex-grow">
            <div class="flex-between-normal h-36 mb-20">
              <div class="title-line">审核情况</div>
              <el-radio-group v-model="activeName" class="btn-radio">
                <el-radio-button label="2">核赔统计</el-radio-button>
                <el-radio-button label="1">核保统计</el-radio-button>
              </el-radio-group>
            </div>
            <div class="mb-14">
              <div class="flex-between">
                <span class="fc-grey-5 fs-14">待审核</span>
                <span
class="fc-black skip"
@click="toDetail()"
>{{
                    activeName === '1'
                      ? detail.underwritingProcessingNum || 0
                      : detail.claimWaitApprovedCount || 0
                  }}
                </span>
              </div>
              <el-progress
                :percentage="
                  activeName === '1'
                    ? detail.underwritingProcessingNum || 0
                    : detail.claimWaitApprovedCount || 0
                "
                :text-inside="true"
                :stroke-width="16"
                color="#5FAEFF"
              />
            </div>
            <div class="mb-14">
              <div class="flex-between">
                <span class="fc-grey-5 fs-14">审核通过</span>
                <span class="fc-black ">
                  {{
                    activeName === '1'
                      ? detail.underwritingPassNum || 0
                      : detail.claimApprovedCount || 0
                  }}
                </span>
              </div>
              <el-progress
                :percentage="
                  activeName === '1'
                    ? detail.underwritingPassNum || 0
                    : detail.claimApprovedCount || 0
                "
                :text-inside="true"
                :stroke-width="16"
                color="#18C4BD"
              />
            </div>
            <div>
              <div class="flex-between">
                <span class="fc-grey-5 fs-14">审核不通过</span>
                <span class="fc-black ">
                  {{
                    activeName === '1'
                      ? detail.underwritingNotPassNum || 0
                      : detail.claimNoApprovedCount || 0
                  }}
                </span>
              </div>
              <el-progress
                :percentage="
                  activeName === '1'
                    ? detail.underwritingNotPassNum || 0
                    : detail.claimNoApprovedCount || 0
                "
                :text-inside="true"
                :stroke-width="16"
                color="#F64E60"
              />
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </el-container>
</template>

<script>
import { productTypes, productSort } from './config';
export default {
  name: 'insuranceProductStatistics',

  data() {
    return {
      activeName: '2',
      productTotal: null,
      productTypes: productTypes,
      productSort: productSort,
      queryRange: [],
      settlementMedicalInsuranceTypes: [],
      productId: null,
      productList: [],
      detail: {},
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() >= Date.now();
        }
      }
    };
  },
  computed: {},
  created() {
    const date = new Date();
    const month = date.getMonth();
    const lastDate = date.setMonth(month - 6);
    this.queryRange = [lastDate, new Date().getTime()];
    this.getProductTotal();
    this.getInsuranceProductList();
  },
  methods: {
    // 获取汇总数据
    getProductTotal() {
      this.$store.dispatch('insuranceProducts/getStatisticsAll').then(res => {
        const productType = [
          {
            value: 0,
            name: '个险',
            selected: false
          },
          {
            value: 0,
            name: '团险'
          }
        ];
        const INSURANCE_TYPE = {
          重疾险: 'productCriticalIllnessNum',
          防癌险: 'productAntiCancerNum',
          意外险: 'productAccidentNum',
          一般医疗险: 'productGeneralMedicalNum',
          百万医疗险: 'productMillionMedicalNum'
        };
        if (res.data) {
          this.productTotal = res.data.productNum;
          productType[0].value = res.data.productPersonNum || 0;
          productType[1].value = res.data.productGroupNum || 0;
          this.productTypes.series[0].data = productType;
          this.productSort.series.forEach(items => {
            items.data.forEach(item => {
              item.value = res.data[INSURANCE_TYPE[item.name]] || 0;
            });
          });
        }
      });
    },
    // 获取保险产品列表
    getInsuranceProductList(name) {
      this.$store
        .dispatch('insuranceProducts/getInsuranceProductByName', {
          name,
          defaultFlag: 1
        })
        .then(res => {
          this.productList = res.data || [];
          // //默认选中第一个
          if (this.$isEmpty(this.productId)) {
            this.productId = this.productList[0].id;
            this.getItemProduct();
          }
        });
    },
    // 根据保险产品获取明细
    getItemProduct() {
      this.$store
        .dispatch('insuranceProducts/getStatisticsProduct', {
          endDate: this.queryRange[1],
          startDate: this.queryRange[0],
          productId: this.productId
        })
        .then(res => {
          this.detail = res.data || {};
          this.$store
            .dispatch('insuranceProducts/getProductData', {
              endDate: Number(this.queryRange[1]),
              startDate: Number(this.queryRange[0]),
              insuranceProductId: this.productId
            })
            .then(data => {
              data.data = data.data || {};
              this.detail = { ...this.detail, ...data.data };
            });
        });
    },

    // 跳转页面
    toDetail() {
      if (this.activeName === '1') {
        // 全局注入 判断是否有菜单权限
        if (
          !this.hasMenuAuth(
            '/insuranceManage',
            '/policyManage',
            '/policyManage/personalPolicy'
          )
        ) {
          return;
        }
        const query = {
          state: 0,
          filterTime: this.queryRange,
          insuranceProductId: this.productId
        };
        const routeData = this.$router.resolve({
          path: `/insuranceRecord/personalInsuranceRecord`,
          query
        });
        window.open(routeData.href, '_blank');
      } else if (this.activeName === '2') {
        // 全局注入 判断是否有菜单权限
        if (
          !this.hasMenuAuth(
            '/insuranceManage',
            '/claimManagement',
            '/claimManagement/auditRecords'
          )
        ) {
          return;
        }
        const insuranceProductName = this.productList.find(
          item => item.id === this.productId
        )['name'];
        const query = {
          state: '1',
          filterTime: this.queryRange,
          insuranceProductName
        };
        const routeData = this.$router.resolve({
          path: `/claimManagement/auditRecords`,
          query
        });
        window.open(routeData.href, '_blank');
      }
    },
    // 跳转页面
    goPage(type) {
      if (type === 1) {
        if (
          !this.hasMenuAuth(
            '/insuranceManage',
            '/insuranceManage',
            '/insuranceManage/insuranceProducts'
          )
        ) {
          return;
        }
        const query = {
          tab: '2'
        };
        const routeData = this.$router.resolve({
          path: `/insuranceManage/insuranceProducts/details/${this.productId}/detail`,
          query
        });
        window.open(routeData.href, '_blank');
      } else if (type === 2) {
        const query = {
          filterTime: this.queryRange,
          productId: this.productId
        };
        const routeData = this.$router.resolve({
          path: `/dashboard/insuranceProduct/claim/statistics`,
          query
        });
        window.open(routeData.href, '_blank');
      }
    }
  }
};
</script>

<style scoped lang="scss">
.productsReport {
  .productsTotal {
    width: 210px;
    height: 228px;
    background: #ffffff;
    box-shadow: 0px 6px 12px 0px rgba(242, 242, 242, 0.5);
    border-radius: 4px;
    margin-right: 24px;
    .image {
      width: 90px;
      height: 72px;
      background-image: url('../../../assets/insurance/icon9.png');
      background-size: 100% 100%;
    }
    .number {
      font-size: 38px;
      font-weight: bold;
      color: #464668;
      line-height: 38px;
      margin-top: 27px;
    }
    .tips {
      color: #464668;
      margin-top: 8px;
    }
  }
  .productsType {
    width: 408px;
    height: 228px;
    background: #ffffff;
    box-shadow: 0px 6px 12px 0px rgba(242, 242, 242, 0.5);
    border-radius: 4px;
    padding: 24px;
  }

  .productsClassification {
    height: 228px;
    background: #ffffff;
    box-shadow: 0px 6px 12px 0px rgba(242, 242, 242, 0.5);
    border-radius: 4px;
  }
  .insuranceDetails {
    height: 306px;
    background: #ffffff;
    box-shadow: 0px 6px 12px 0px rgba(242, 242, 242, 0.5);
    border-radius: 4px;
    padding: 24px 30px;
    .report-content {
      flex-wrap: wrap;
      border-right: 1px solid #e8e8e8;
      .report-item {
        width: 179px;
        &.mr-60 {
          margin-right: 0px;
        }
        .content {
          position: relative;
          top: 6px;
        }
        .item-title {
          font-size: 14px;
          color: #a2a3b7;
        }
        .item-Number {
          font-size: 22px;
          font-weight: bold;
          color: #464668;
          position: relative;
          .unit {
            font-size: 12px;
            position: relative;
            top: 8px;
            left: 2px;
          }
          // &.skip {
          //     color: #3599fe;
          // }
          // &.skip::before {
          //     position: absolute;
          //     content: "";
          //     left: 0;
          //     right: 0;
          //     bottom: 0;
          //     height: 2px;
          //     background: #3599fe;
          // }
        }
        .report-icon {
          width: 46px;
          height: 46px;
          margin-right: 4px;
          &.icon1 {
            background-image: url('../../../assets/insurance/icon1.png');
            background-size: 100% 100%;
          }
          &.icon2 {
            background-image: url('../../../assets/insurance/icon2.png');
            background-size: 100% 100%;
          }
          &.icon3 {
            background-image: url('../../../assets/insurance/icon3.png');
            background-size: 100% 100%;
          }
          &.icon4 {
            background-image: url('../../../assets/insurance/icon14.png');
            background-size: 100% 100%;
          }
          &.icon5 {
            background-image: url('../../../assets/insurance/icon5.png');
            background-size: 100% 100%;
          }
          &.icon6 {
            background-image: url('../../../assets/insurance/icon6.png');
            background-size: 100% 100%;
          }
          &.icon7 {
            background-image: url('../../../assets/insurance/icon7.png');
            background-size: 100% 100%;
          }
          &.icon8 {
            background-image: url('../../../assets/insurance/icon8.png');
            background-size: 100% 100%;
          }
        }
      }
      .tips-icon {
        width: 14px;
        height: 14px;
        background-image: url('../../../assets/insurance/icon10.png');
        background-size: 100% 100%;
        margin-left: 4px;
        cursor: pointer;
      }
    }
  }
  .skip {
    color: #3599fe !important;
    position: relative;
    cursor: pointer;
    text-decoration: underline;
  }

  .skips {
    color: #3599fe !important;
    position: relative;
    cursor: pointer;
    &::before {
      position: absolute;
      content: '';
      left: 0;
      right: 0;
      bottom: 0;
      height: 1px;
      background: #3599fe;
    }
  }
}
.tipBox {
  padding: 12px;
  .tipTitle {
    font-size: 18px;
    font-weight: 600;
    color: #464668;
    text-align: left;
  }
  .tipContent {
    font-size: 16px;
    color: #464668;
    margin-top: 12px;
    &.fc-yellow {
      color: #ffa800;
    }
  }
}
</style>
