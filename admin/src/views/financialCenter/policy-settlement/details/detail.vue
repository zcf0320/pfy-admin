<template>
  <div class="companysettlement-detail-page">
    <el-container>
      <el-scrollbar
        v-loading="mainLoading"
        :native="false"
        wrap-class="el-main"
        tag="main"
        :noresize="false"
      >
        <div class="title-top">结算明细详情</div>
        <div class="basisDrugsDetail-table">
          <div class="basisDrugsDetail-table-title">基础信息</div>
          <div class="basisDrugsDetail-table-four">
            <div class="basisDrugsDetail-table-four-l">
              <div class="basisDrugsDetail-type">结算ID</div>

              <div class="basisDrugsDetail-detail">
                {{ objDetail.billItemNo || '-' }}
              </div>
            </div>
            <div class="basisDrugsDetail-table-four-r">
              <div class="basisDrugsDetail-type">结算单编号</div>

              <div class="basisDrugsDetail-detail">
                {{ objDetail.billNo || '-' }}
              </div>
            </div>
          </div>
          <div class="basisDrugsDetail-table-four">
            <div class="basisDrugsDetail-table-four-l">
              <div class="basisDrugsDetail-type">结算帐期</div>

              <div class="basisDrugsDetail-detail">
                {{ objDetail.settlementMonth || '-' }}
              </div>
            </div>
            <div class="basisDrugsDetail-table-four-r">
              <div class="basisDrugsDetail-type">结算状态</div>

              <div class="basisDrugsDetail-detail">
                {{ objDetail.settlementStatus ? '已结算' : '待结算' }}
              </div>
            </div>
          </div>
          <div class="basisDrugsDetail-table-four">
            <div class="basisDrugsDetail-table-four-l">
              <div class="basisDrugsDetail-type">结算方式</div>

              <div class="basisDrugsDetail-detail">
                {{ objDetail.pricingMethod | fliterSettle }}
              </div>
            </div>
            <div class="basisDrugsDetail-table-four-r">
              <div class="basisDrugsDetail-type">结算金额</div>

              <div class="basisDrugsDetail-detail">
                ￥{{ objDetail.itemMoney || '-' }}
              </div>
            </div>
          </div>
          <div class="basisDrugsDetail-table-four">
            <div class="basisDrugsDetail-table-four-l">
              <div class="basisDrugsDetail-type">结算完成时间</div>

              <div class="basisDrugsDetail-detail">
                {{
                  objDetail.finishTime
                    ? $moment(objDetail.finishTime).format('YYYY-MM-DD HH:mm')
                    : '-'
                }}
              </div>
            </div>
            <div class="basisDrugsDetail-table-four-r">
              <div class="basisDrugsDetail-type">结算完成人</div>

              <div class="basisDrugsDetail-detail">
                {{ objDetail.finisherName || '-' }}
              </div>
            </div>
          </div>
          <div class="basisDrugsDetail-table-title">保险信息</div>
          <div class="basisDrugsDetail-table-four">
            <div class="basisDrugsDetail-table-four-l">
              <div class="basisDrugsDetail-type">保单号</div>

              <div class="basisDrugsDetail-detail">
                {{ objDetail.policyNo || '-' }}
              </div>
            </div>
            <div class="basisDrugsDetail-table-four-r">
              <div class="basisDrugsDetail-type">供应商虚拟保单号</div>

              <div class="basisDrugsDetail-detail">
                {{ objDetail.systemPolicyNo || '-' }}
              </div>
            </div>
          </div>
          <div class="basisDrugsDetail-table-four">
            <div class="basisDrugsDetail-table-four-l">
              <div class="basisDrugsDetail-type">保司虚拟保单号</div>

              <div class="basisDrugsDetail-detail">
                {{ objDetail.vcPolicyNo || '-' }}
              </div>
            </div>
            <div class="basisDrugsDetail-table-four-r">
              <div class="basisDrugsDetail-type">保险产品</div>

              <div class="basisDrugsDetail-detail">
                {{ objDetail.productName || '-' }}
              </div>
            </div>
          </div>
          <div class="basisDrugsDetail-table-four">
            <div class="basisDrugsDetail-table-four-l">
              <div class="basisDrugsDetail-type">保费</div>

              <div class="basisDrugsDetail-detail">
                ￥{{ objDetail.premium || '-' }}
              </div>
            </div>
            <div class="basisDrugsDetail-table-four-r">
              <div class="basisDrugsDetail-type">保险公司</div>

              <div class="basisDrugsDetail-detail">
                {{ objDetail.companyName || '-' }}
              </div>
            </div>
          </div>
          <div class="basisDrugsDetail-table-four">
            <div class="basisDrugsDetail-table-four-l">
              <div class="basisDrugsDetail-type">承保机构</div>

              <div class="basisDrugsDetail-detail">
                {{ objDetail.contractorName || '-' }}
              </div>
            </div>
            <div class="basisDrugsDetail-table-four-r">
              <div class="basisDrugsDetail-type">销售渠道</div>

              <div class="basisDrugsDetail-detail">
                {{ objDetail.saleOrgCode || '-' }}
              </div>
            </div>
          </div>
          <div class="basisDrugsDetail-table-four">
            <div class="basisDrugsDetail-table-four-l">
              <div class="basisDrugsDetail-type">保单生效截止时间</div>

              <div class="basisDrugsDetail-detail">
                {{
                  objDetail.effectiveDate
                    ? $moment(objDetail.effectiveDate).format(
                        'YYYY-MM-DD HH:mm',
                      )
                    : '-'
                }} ~ {{
                  objDetail.expireDate
                    ? $moment(objDetail.expireDate).format('YYYY-MM-DD HH:mm')
                    : '-'
                }}
              </div>
            </div>
            <div class="basisDrugsDetail-table-four-r" />
          </div>
          <div class="basisDrugsDetail-table-title">服务项信息</div>
          <div class="table">
            <el-table
              :data="list"
              :row-style="{ borderLeft: '1px solid #e8e8e8' }"
              :cell-style="cellStyle"
              :header-row-style="{ borderBottom: '1px solid #e8e8e8' }"
            >
              <el-table-column label="服务项">
                <template slot-scope="{ row }">
                  <div class="table-maintext">
                    <div class="table-maintext-c">
                      {{ row.serviceInfoName }}
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="使用记录 ID">
                <template slot-scope="{ row }">
                  <div class="table-maintext">
                    <template v-if="row.serviceRecordVOS.length > 0">
                      <div
                        v-for="(item, index) in row.serviceRecordVOS"
                        :key="`使用记录${index}`"
                        :class="
                          `table-item ${item.serialNumber ? 'link-skip' : ''}`
                        "
                        @click="
                          toNewPage1({
                            servicePath: item.servicePath,
                            detailId: item.detailId,
                          })
                        "
                      >
                        {{ item.serialNumber || '-' }}
                      </div>
                    </template>
                    <div
                      v-if="row.serviceRecordVOS.length <= 0"
                      class="table-item"
                    >
                      -
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="理赔结算 ID">
                <template slot-scope="{ row }">
                  <div class="table-maintext">
                    <template v-if="row.serviceRecordVOS.length > 0">
                      <div
                        v-for="(item, index) in row.serviceRecordVOS"
                        :key="`理赔结算${index}`"
                        :class="
                          `table-item ${
                            item.claimSettlementNo ? 'link-skip' : ''
                          }`
                        "
                        @click="toNewPage(item.claimSettlementId, 1)"
                      >
                        {{ item.claimSettlementNo || '-' }}
                      </div>
                    </template>
                    <div
                      v-if="row.serviceRecordVOS.length <= 0"
                      class="table-item"
                    >
                      -
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="供应商结算 ID">
                <template slot-scope="{ row }">
                  <div class="table-maintext">
                    <template v-if="row.serviceRecordVOS.length > 0">
                      <div
                        v-for="(item, index) in row.serviceRecordVOS"
                        :key="`供应商结算${index}`"
                        :class="
                          `table-item ${
                            item.providerSettlementNo ? 'link-skip' : ''
                          }`
                        "
                        @click="toNewPage(item.providerSettlementId, 2)"
                      >
                        {{ item.providerSettlementNo || '-' }}
                      </div>
                    </template>
                    <div
                      v-if="row.serviceRecordVOS.length <= 0"
                      class="table-item"
                    >
                      -
                    </div>
                  </div>
                </template>
              </el-table-column>

              <div slot="empty" class="empty-img" />
            </el-table>
          </div>
        </div>
      </el-scrollbar>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'PolicySettlementDetailsDetail',
  filters: {
    fliterSettle(type) {
      if (type === 1) {
        return '按照固定额度';
      } else if (type === 2) {
        return '按保单固定比例';
      } else {
        return '-';
      }
    }
  },
  data() {
    return {
      mainLoading: true,
      headPic: [],
      objDetail: {},
      list: []
    };
  },
  created() {
    this.$store
      .dispatch('insuranceCompany/getBillDetailDetail', {
        id: this.$route.params.id
      })
      .then(res => {
        this.mainLoading = false;
        this.objDetail = res.data || {};
        this.list = res.data.policyBillServiceInfoVOS || [];
      });
  },
  methods: {
    cellStyle(obj) {
      if (obj.columnIndex === 0) {
        return {
          borderLeft: '1px solid #e8e8e8',
          borderRight: '1px solid #e8e8e8'
        };
      } else {
        return { borderRight: '1px solid #e8e8e8' };
      }
    },
    toNewPage1(item) {
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
    },
    toNewPage(id, type) {
      if (!id) {
        return;
      }
      let url = '';
      type === 1 && (url = `/financial-center/claim-settlement/detail/${id}`);
      type === 2 &&
        (url = `/financial-center/service-item-settlement/detail/${id}`);
      const routeData = this.$router.resolve({
        path: url
      });
      window.open(routeData.href, '_blank');
    }
  }
};
</script>

<style lang="scss" scoped>
.companysettlement-detail-page {
  .basisDrugsDetail-table {
     width: 99%;
    background: #ffffff;
    box-shadow: rgba(158, 158, 158, 0.5) 0px 0px 5px;
    border-radius: 4px;
    // margin-bottom: 20px;
    margin: 24px auto 0;
    &-title {
      height: 48px;
      background: #f3f6f9;
      border: 1px solid #e8e8e8;
      border-top: none;
      width: 100%;
      font-size: 16px;

      font-weight: bold;
      color: #545473;
      line-height: 48px;
      padding: 0 16px;
      display: flex;
      align-items: center;
      &::before {
        content: '';
        display: block;
        width: 4px;
        height: 16px;
        background: #3599fe;
        margin-right: 12px;
      }
    }
    &-four {
      // height: 48px;
      // display: flex;
      // border: 1px solid #e8e8e8;
      // border-top: none;
      // font-size: 14px;
      // color: #545473;
      // line-height: 48px;
        min-height: 48px;
    height: 100%;
    display: flex;
    border: 1px solid #e8e8e8;
    border-top: none;
    font-size: 14px;
    color: #545473;
      &-l,
      &-r {
        // flex: 1;
        // width: 50%;
        // display: flex;
        // align-items: center;
         flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .el-form-item,
        .el-select {
          margin: 0;
          width: 100%;
        }
      }
      &-l {
        border-right: 1px solid #e8e8e8;
      }
      .basisDrugsDetail-type {
        // width: 204px;
        // font-weight: bold;
        // padding-left: 32px;
        // border-right: 1px solid #e8e8e8;
          display: flex;
        align-items: center;
        min-height: 48px;
        height: 100%;
        width: 165px;
        font-weight: bold;
        padding-left: 32px;
      }
      .basisDrugsDetail-detail {
        flex: 1;
        // padding: 0 61px;
        display: flex;
        padding-left: 42px;
        align-items: center;
        color: #545473;
        min-height: 48px;
        height: 100%;
        border-left: 1px solid #ebedf2;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
    &-two {
      display: flex;
      border: 1px solid #e8e8e8;
      border-top: none;
      font-size: 14px;
      color: #545473;
      line-height: 48px;
      &-l {
        width: 204px;
        font-weight: bold;
        padding-left: 32px;
        border-right: 1px solid #e8e8e8;
        display: flex;
        align-items: center;
      }
      &-r {
        flex: 1;
        padding: 15px 61px;
        .basisDrugsDetail-img {
          &-list {
            &-item {
              display: flex;
              flex-wrap: wrap;
              .img {
                margin-right: 24px;
                margin-bottom: 24px;
                width: 184px;
                height: 124px;
              }
            }
          }
        }
      }
    }
    .table {
      width: 100%;
      /deep/ .el-table th {
        background-color: #fff;
        border-bottom: 1px solid #e8e8e8;
      }
      /deep/.el-table td .cell {
        padding: 0;
      }
      /deep/.el-table th.is-leaf,
      .el-table td {
        border-bottom: 1px solid #e8e8e8;
      }
      /deep/.el-table tbody {
        border-left: 1px solid #e8e8e8;
      }
      .table-maintext {
        font-size: 14px;

        font-weight: 400;
        color: #464668;
        line-height: 14px;
        &-c {
          padding: 16px;
          box-sizing: border-box;
        }
        .table-item {
          border-bottom: 1px solid #e8e8e8;
          padding: 12px 16px;
          &:last-of-type {
            border-bottom: none;
          }
        }
      }
    }
  }
}
</style>
