<template>
  <div class="policy-report-page">
    <el-container>
      <el-scrollbar
        v-loading="tableLoading"
        :native="false"
        wrap-class="el-main"
        tag="main"
        :noresize="false"
      >
        <div class="policy-info">
          <div class="policy-info-title">服务单信息</div>
          <el-table :data="[1]" class="table-large">
            <el-table-column label="服务项">
              <template>
                <div
                  class="table-maintext link-skip"
                  @click="toService(data.serviceRecordVo)"
                >
                  {{ $route.query.id || '-' }}
                </div>
                <div class="table-sectext">
                  {{ data.serviceInfoName || '-' }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="供应商">
              <template>
                <div class="table-maintext">
                  {{ data.supplierName || '-' }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="来源">
              <template>
                <div class="table-maintext">
                  {{ data.policyNumber || '-' }}
                </div>
                <div class="table-sectext">
                  {{ data.insuranceName || '-' }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="保单结算">
              <template>
                <div class="table-maintext">
                  保单结算单：<span
                    class="link-skip"
                    @click="toNewPage(data.policySettlementId, 'policy')"
                    >{{ data.policySettlementNo || '-' }}</span
                  >
                </div>
                <div class="table-sectext">
                  ￥{{ data.policeSettlementPrice || '-' }}({{
                    data.policySettlementState || '-'
                  }})
                </div>
              </template>
            </el-table-column>
            <el-table-column label="理赔结算">
              <template>
                <div class="table-maintext">
                  理赔结算单：<span
                    class="link-skip"
                    @click="toNewPage(data.claimSettlementId, 'claim')"
                    >{{ data.claimSettlementNo || '-' }}</span
                  >
                </div>
                <div class="table-sectext">
                  ￥{{ data.claimSettlementPrice || '-' }} ({{
                    data.claimSettlementState || '-'
                  }})
                </div>
              </template>
            </el-table-column>
            <el-table-column label="供应商结算">
              <template>
                <div class="table-maintext">
                  供应商结算单：<span
                    class="link-skip"
                    @click="toNewPage(data.supplierSettlementId, 'supplier')"
                    >{{ data.supplierSettlementNo || '-' }}</span
                  >
                </div>
                <div class="table-sectext">
                  ￥{{ data.supplierSettlementPrice || '-' }} ({{
                    data.supplierSettlementState || '-'
                  }})
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-scrollbar>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'ServiceBillReport',
  data() {
    return {
      tableLoading: true,
      data: {}
    };
  },
  created() {
    const params = this.$route.query;
    if (params.endDate) {
      params.endDate = Number(params.endDate);
    }
    if (params.startDate) {
      params.startDate = Number(params.startDate);
    }
    this.$store
      .dispatch('settle/getServiceBillData', params)
      .then(res => {
        this.data = res.data;
        this.tableLoading = false;
      })
      .catch(() => {
        this.tableLoading = false;
      });
  },
  methods: {
    toNewPage(id, type) {
      if (!id) {
        return;
      }
      let url = '';
      type === 'claim' &&
        (url = `/financial-center/claim-settlement-details/detail/${id}`);
      type === 'policy' &&
        (url = `/financial-center/policy-settlement-details/detail/${id}`);
      type === 'supplier' &&
        (url = `/financial-center/service-item-settlement-details/detail/${id}`);
      const routeData = this.$router.resolve({
        path: url
      });
      window.open(routeData.href, '_blank');
    },
    toService(item) {
      if (!item.detailId) {
        return;
      }
      let routeData = '';
      if (item.servicePath === 'DRUG_ORDER_DETAIL') {
        routeData = this.$router.resolve({
          path: `/drugManage/orderDetails/${item.detailId}`
        });
      } else if (item.servicePath === 'COUPON_CODE_DETAIL') {
        routeData = this.$router.resolve({
          path: `/operateManage/commodityExchange/details/${item.detailId}/0`
        });
      } else if (item.servicePath === 'COUPON_DETAIL') {
        routeData = this.$router.resolve({
          path: `/operateManage/commodityExchange/details/${item.detailId}/1`
        });
      } else if (item.servicePath === 'AI_DIAGNOSE_DETAIL') {
        routeData = this.$router.resolve({
          path: `/inquiryManage/inquiryRecord/detail/${item.detailId}`
        });
      } else if (item.servicePath === 'DOCTOR_DIAGNOSE_DETAIL') {
        routeData = this.$router.resolve({
          path: `/inquiryManage/inquiryRecord/detail/${item.detailId}`
        });
      } else if (item.servicePath === 'TEL_DIAGNOSE_DETAIL') {
        routeData = this.$router.resolve({
          path: `/inquiryManage/telWorkOrderManage/detail/${item.detailId}`
        });
      } else if (item.servicePath === 'ONLINE_SERVICE_DETAIL') {
        routeData = this.$router.resolve({
          path: `/operateManage/onlineService/details/${item.detailId}`
        });
      } else {
        routeData = this.$router.resolve({
          path: `/secondaryTreatment/treatments/detail/${item.detailId}`
        });
      }
      window.open(routeData.href, '_blank');
    }
  }
};
</script>

<style lang="scss" scoped>
.policy-report-page {
  .policy-info-red {
    font-size: 14px;

    font-weight: 400;
    color: #f64e60;
    line-height: 14px;
    margin-bottom: 8px;
  }
  .policy-info-green {
    font-size: 14px;

    font-weight: 400;
    color: #18c4bd;
    line-height: 14px;
    margin-bottom: 8px;
  }
  .policy-info {
    box-shadow: 0px 6px 12px 0px rgba(242, 242, 242, 0.5);
    border-radius: 4px;
    background-color: #fff;
    margin-bottom: 24px;
    &-title {
      font-size: 16px;

      font-weight: bold;
      color: #464668;
      line-height: 16px;
      display: flex;
      align-items: center;
      padding-bottom: 24px;
      box-shadow: 0px 1px 0px 0px #ebedf2;
      margin-bottom: 24px;
      &::before {
        content: '';
        width: 16px;
        height: 16px;
        background: url('../../assets/statisticalreport/policy-info.png')
          no-repeat center center;
        background-size: 100% 100%;
        margin-right: 8px;
      }
    }
    &-text {
      font-size: 14px;

      font-weight: bold;
      color: #464668;
      line-height: 14px;
      margin: 24px 0 14px;
    }
    .table-maintext {
      font-size: 14px;

      font-weight: 400;
      color: #464668;
      line-height: 14px;
      margin-bottom: 8px;
    }
  }
}
</style>
