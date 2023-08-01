<template>
  <el-container class="claimStatisticsDetail">
    <el-main class="no-padding">
      <div class="flex-between mb-14">
        <div class="flex-box">
          <div class="title fs-18">
            {{ productObj.name }}（{{ productObj.orderNumber }}）
          </div>
          <div class="split"/>
          <div class="title title-line">{{ productObj.company.name }}</div>
        </div>
        <div>
          <el-select
            v-model="insuranceProductPlanId"
            placeholder="全部"
            class="w-200 mr-24"
            filterable
            @change="getData"
          >
            <el-option
              v-for="item in productPlanList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
          <el-date-picker
            v-model="queryRange"
            class="mr-24"
            value-format="timestamp"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :clearable="false"
            @change="getData"
          />
          <!-- :picker-options="pickerOptions" -->
        </div>
      </div>
      <div class="flex">
        <div class="left-content mr-24">
          <el-scrollbar
            :native="false"
            tag="div"
            :noresize="false"
            wrap-class="pd-30"
            :style="{ height: clientHeight - 220 + 'px' }"
          >
            <div class="flex-between">
              <div class="productNumber">
                <div class="number">{{ detail.policySaleNum }}</div>
                <div class="content-title">保单销量</div>
              </div>
              <div class="icon-img"/>
            </div>
            <div class="line-solid mt-16 mb-16"/>
            <div class="report-item">
              <div class="item flex-between">
                <div class="content">
                  <div class="fs-14 fc-grey-5">理赔发生率</div>
                  <div class="fs-24 fc-red mt-6">
                    {{ detail.claimIncidenceRate || '0%' }}
                  </div>
                </div>
                <div class="report-icon icon11 "/>
              </div>
              <div class="line-solid mt-16 mb-16"/>
            </div>
            <div class="report-item">
              <div class="item flex-between">
                <div class="content">
                  <div class="fs-14 fc-grey-5">理赔申请次数</div>
                  <div class="fs-24 fc-black mt-6">
                    {{ detail.claimCount || 0 }}
                  </div>
                </div>
                <div class="report-icon icon12 "/>
              </div>
              <div class="line-solid mt-16 mb-16"/>
            </div>
            <div class="report-item">
              <div class="item flex-between">
                <div class="content">
                  <div class="fs-14 fc-grey-5">理赔申请人数</div>
                  <div class="fs-24 fc-black mt-6">
                    {{ detail.claimPeopleCount || 0 }}
                  </div>
                </div>
                <div class="report-icon icon13 "/>
              </div>
              <div class="line-solid mt-16 mb-16"/>
            </div>
            <div>
              <div class="title-line fw-normal mb-12">审核情况</div>
              <div class="mb-14">
                <div class="flex-between">
                  <span class="fc-grey-5 fs-14">待审核</span>
                  <span
                    class="fc-blue underline pointer"
                    @click="toDetail(1, {})"
                    >{{ claimData.claimWaitApprovedCount || 0 }}
                  </span>
                </div>
                <el-progress
                  :percentage="claimData.claimWaitApprovedCount"
                  :text-inside="true"
                  :stroke-width="16"
                  color="#5FAEFF"
                />
              </div>
              <div class="mb-14">
                <div class="flex-between">
                  <span class="fc-grey-5 fs-14">审核通过</span>
                  <span class="fc-black ">
                    {{ claimData.claimApprovedCount }}
                  </span>
                </div>
                <el-progress
                  :percentage="claimData.claimApprovedCount"
                  :text-inside="true"
                  :stroke-width="16"
                  color="#18C4BD"
                />
              </div>
              <div>
                <div class="flex-between">
                  <span class="fc-grey-5 fs-14">审核不通过</span>
                  <span class="fc-black ">
                    {{ claimData.claimNoApprovedCount }}
                  </span>
                </div>
                <el-progress
                  :percentage="claimData.claimNoApprovedCount"
                  :text-inside="true"
                  :stroke-width="16"
                  color="#F64E60"
                />
              </div>
            </div>
          </el-scrollbar>
        </div>
        <div class="right-content flex-grow">
          <el-scrollbar
            :native="false"
            tag="div"
            :noresize="false"
            wrap-class="pd-30"
            :style="{ height: clientHeight - 220 + 'px' }"
          >
            <div class="title-line fw-normal mb-12">保障计划理赔数据统计</div>
            <el-table :data="detail.claimDataList" class="table-large">
              <el-table-column label="保障内容">
                <template slot-scope="{ row }">
                  <span class="link-skip" @click="goPage(1, row)">{{
                    row.serviceItemName || '-'
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column label="理赔申请次数 / 人数">
                <template slot-scope="{ row }">
                  <span>{{ row.claimCount || 0 }} /
                    {{ row.claimPeopleCount || 0 }}</span>
                </template>
              </el-table-column>
              <el-table-column label="结算方式">
                <template slot-scope="{ row }">
                  <!-- /  -->
                  <span
                    v-if="$isNotEmpty(row.settlementMethod)"
                    class="link-skip"
                    @click="goPage(2, row)"
                  >
                    {{ $enums['settlementMethod'][row.settlementMethod] }}
                  </span>
                  <span v-else>-</span>
                </template>
              </el-table-column>
              <el-table-column label="赔付金额">
                <template slot-scope="{ row }">
                  <span
                    v-if="row.payForPrice"
                    class="tips-err"
                    @click="toDetail(2, row)"
                    >{{ row.payForPrice.toFixed(2) }}</span>
                  <span v-else>-</span>
                </template>
              </el-table-column>

              <div slot="empty" class="empty-img"/>
            </el-table>
          </el-scrollbar>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'claimStatisticsDetail',
  data() {
    return {
      productObj: {
        name: '',
        orderNumber: '',
        company: {}
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() >= Date.now();
        }
      },
      insuranceProductPlanId: null,
      queryRange: [],
      productPlanList: [],
      claimData: {
        claimWaitApprovedCount: 0,
        claimApprovedCount: 0,
        claimNoApprovedCount: 0
      },
      detail: {
        claimCount: 0,
        claimIncidenceRate: 0,
        claimPeopleCount: 0,
        policySaleNum: 0,
        claimDataList: []
      },
      productId: null,
      claimDataList: []
    };
  },
  computed: {},
  created() {
    this.queryRange = this.$route.query.filterTime || [];
    this.productId = this.$route.query.productId || null;
    this.initData();
  },
  methods: {
    initData() {
      this.$store
        .dispatch('insuranceProducts/getInsuranceShort', {
          id: this.productId
        })
        .then(res => {
          this.$copyProps(this.productObj, res.data);
          this.productPlanList = res.data.plans || [];
          if (this.$isNotEmpty(this.productPlanList)) {
            this.insuranceProductPlanId = this.productPlanList[0].id;
            this.getData();
          }
        });
    },

    // 根据保障计划获取数据
    getData() {
      this.$store
        .dispatch('insuranceProducts/getInsuranceClaim', {
          endDate: Number(this.queryRange[1]),
          startDate: Number(this.queryRange[0]),
          insuranceProductPlanId: this.insuranceProductPlanId
        })
        .then(res => {
          this.$copyProps(this.detail, res.data);
          if (this.$isNotEmpty(this.detail.claimDataList)) {
            // 计算审核数据
            const claimData = {
              claimWaitApprovedCount: 0,
              claimApprovedCount: 0,
              claimNoApprovedCount: 0
            };
            this.detail.claimDataList.forEach(item => {
              claimData.claimWaitApprovedCount += Number(
                item.claimWaitApprovedCount
              );
              claimData.claimApprovedCount += Number(item.claimApprovedCount);
              claimData.claimNoApprovedCount += Number(
                item.claimNoApprovedCount
              );
            });
            this.$copyProps(this.claimData, claimData);
          }
        });
    },
    // 跳转详情页面
    toDetail(type, { serviceItemId, serviceItemName }) {
      if (type === 1) {
        if (this.claimData.claimWaitApprovedCount > 0) {
          const query = {
            state: '1',
            filterTime: this.queryRange,
            name: this.productObj.name
          };
          const routeData = this.$router.resolve({
            path: `/claimManagement/auditRecords`,
            query
          });
          window.open(routeData.href, '_blank');
        }
      } else if (type === 2) {
        const query = {
          serviceItemId,
          filterTime: this.queryRange,
          insuranceProductPlanId: this.insuranceProductPlanId,
          productId: this.productId,
          serviceItemName: serviceItemName
        };
        const routeData = this.$router.resolve({
          path: `/dashboard/insuranceProduct/claim/medicine`,
          query
        });
        window.open(routeData.href, '_blank');
      }
    },
    // 跳转页面
    goPage(type, row) {
      // 跳转服务项
      if (type === 2) {
        // 全局注入 判断是否有菜单权限
        if (
          !this.hasMenuAuth(
            '/healthManage',
            '/supplyChainManage',
            '/supplyChainManage/serviceItems'
          )
        ) {
          return;
        }
        const routeData = this.$router.resolve({
          path: `/supplyChainManage/serviceItems/details/${
            row.serviceItemId
          }/detail/8`
        });
        window.open(routeData.href, '_blank');
      } else {
        if (row.serviceType === 1) {
          // 全局注入 判断是否有菜单权限
          if (
            !this.hasMenuAuth(
              '/healthManage',
              '/supplyChainManage',
              '/supplyChainManage/serviceItems'
            )
          ) {
            return;
          }
          const routeData = this.$router.resolve({
            path: `/supplyChainManage/serviceItems/details/${
              row.serviceItemId
            }/detail`
          });
          window.open(routeData.href, '_blank');
        } else {
          // 全局注入 判断是否有菜单权限
          if (
            !this.hasMenuAuth(
              '/insuranceManage',
              '/insuranceManage',
              '/insuranceManage/guaranteePower'
            )
          ) {
            return;
          }
          const routeData = this.$router.resolve({
            path: `/insuranceManage/guaranteePower/guaranteePowerDetails/${
              row.serviceItemId
            }`
          });
          window.open(routeData.href, '_blank');
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.claimStatisticsDetail {
  .title {
    font-size: 18px;
    font-weight: 500;
    height: 18px;
    color: #464668;
  }
  .left-content {
    // overflow: auto;
    width: 357px;
    height: 100%;
    background: #ffffff;
    box-shadow: 0px 6px 12px 0px rgba(242, 242, 242, 0.5);
    border-radius: 4px;
    // padding: 30px;
    .productNumber {
      width: 90px;
      height: 72px;
      .number {
        font-size: 38px;
        font-weight: bold;
        color: #464668;
        height: 38px;
      }
      .content-title {
        height: 16px;
        font-size: 16px;
        font-weight: 400;
        color: #464668;
        margin-top: 6px;
      }
    }
    .icon-img {
      width: 90px;
      height: 72px;
      background-image: url('../../../assets/insurance/icon9.png');
      background-size: 100% 100%;
    }
    .report-icon {
      height: 42px;
      width: 42px;
      &.icon11 {
        background-image: url('../../../assets/insurance/icon11.png');
        background-size: 100% 100%;
      }
      &.icon12 {
        background-image: url('../../../assets/insurance/icon12.png');
        background-size: 100% 100%;
      }
      &.icon13 {
        background-image: url('../../../assets/insurance/icon13.png');
        background-size: 100% 100%;
      }
    }
  }
  .right-content {
    height: 100%;
    background: #ffffff;
    box-shadow: 0px 6px 12px 0px rgba(242, 242, 242, 0.5);
    border-radius: 4px;
    .tips-err {
      font-size: 14px;
      color: #f64e60;
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>
