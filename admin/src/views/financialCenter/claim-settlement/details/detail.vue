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
        <div class="title-top">
          结算明细详情
        </div>
        <div class="basisDrugsDetail-table">
          <div class="basisDrugsDetail-table-title">基础信息</div>
          <div class="basisDrugsDetail-table-four">
            <div class="basisDrugsDetail-table-four-l">
              <div class="basisDrugsDetail-type">结算ID</div>

              <div class="basisDrugsDetail-detail">
                {{ objDetail.bill.billItemNo || '-' }}
              </div>
            </div>
            <div class="basisDrugsDetail-table-four-r">
              <div class="basisDrugsDetail-type">结算单编号</div>

              <div class="basisDrugsDetail-detail">
                {{ objDetail.bill.bizNo || '-' }}
              </div>
            </div>
          </div>
          <div class="basisDrugsDetail-table-four">
            <div class="basisDrugsDetail-table-four-l">
              <div class="basisDrugsDetail-type">结算帐期</div>

              <div class="basisDrugsDetail-detail">
                {{ objDetail.bill.settlementMonth || '-' }}
              </div>
            </div>
            <div class="basisDrugsDetail-table-four-r">
              <div class="basisDrugsDetail-type">结算状态</div>

              <div class="basisDrugsDetail-detail">
                {{ objDetail.bill.settlementStatus ? '已结算' : '待结算' }}
              </div>
            </div>
          </div>
          <div class="basisDrugsDetail-table-four">
            <div class="basisDrugsDetail-table-four-l">
              <div class="basisDrugsDetail-type">结算金额</div>

              <div class="basisDrugsDetail-detail">
                ￥{{ objDetail.bill.sumMoney || '-' }}
              </div>
            </div>
            <div class="basisDrugsDetail-table-four-r">
              <div class="basisDrugsDetail-type">结算单生成时间</div>

              <div class="basisDrugsDetail-detail">
                {{
                  objDetail.bill.createTime
                    ? $moment(objDetail.bill.createTime).format(
                        'YYYY-MM-DD HH:mm:ss',
                      )
                    : '-'
                }}
              </div>
            </div>
          </div>
          <div class="basisDrugsDetail-table-four">
            <div class="basisDrugsDetail-table-four-l">
              <div class="basisDrugsDetail-type">结算完成时间</div>

              <div class="basisDrugsDetail-detail">
                {{
                  objDetail.bill.settlementStatus == 1
                    ? $moment(objDetail.bill.updateTime).format(
                        'YYYY-MM-DD HH:mm:ss',
                      )
                    : '-'
                }}
              </div>
            </div>
            <div class="basisDrugsDetail-table-four-r">
              <div class="basisDrugsDetail-type">完成人</div>

              <div class="basisDrugsDetail-detail">
                {{ objDetail.bill.finisherName || '-' }}
              </div>
            </div>
          </div>
          <div class="basisDrugsDetail-table-title">保险信息</div>
          <div class="basisDrugsDetail-table-four">
            <div class="basisDrugsDetail-table-four-l">
              <div class="basisDrugsDetail-type">保单编号</div>

              <div
                class="basisDrugsDetail-detail link-skip"
                @click="topolicyNo(objDetail.insurance.policyId)"
              >
                {{ objDetail.insurance.policyNo || '-' }}
              </div>
            </div>
            <div class="basisDrugsDetail-table-four-r">
              <div class="basisDrugsDetail-type">保险名称</div>

              <div class="basisDrugsDetail-detail">
                {{ objDetail.insurance.productName || '-' }}
              </div>
            </div>
          </div>
          <div class="basisDrugsDetail-table-four">
            <div class="basisDrugsDetail-table-four-l">
              <div class="basisDrugsDetail-type">保险公司名称</div>

              <div class="basisDrugsDetail-detail">
                {{ objDetail.insurance.companyName || '-' }}
              </div>
            </div>
            <div class="basisDrugsDetail-table-four-r">
              <div class="basisDrugsDetail-type">承保机构</div>

              <div class="basisDrugsDetail-detail">
                {{ objDetail.insurance.contractorName || '-' }}
              </div>
            </div>
          </div>
          <div class="basisDrugsDetail-table-four">
            <div class="basisDrugsDetail-table-four-l">
              <div class="basisDrugsDetail-type">保单生效-截止时间</div>

              <div class="basisDrugsDetail-detail">
                {{
                  $moment(objDetail.insurance.effectiveDate).format(
                    'YYYY-MM-DD HH:mm:ss',
                  )
                }} - {{
                  $moment(objDetail.insurance.expiryDate).format(
                    'YYYY-MM-DD HH:mm:ss',
                  )
                }}
              </div>
            </div>
            <div class="basisDrugsDetail-table-four-r" >
               <div class="basisDrugsDetail-type"></div>

              <div class="basisDrugsDetail-detail">
              </div>
            </div>
          </div>
          <div class="basisDrugsDetail-table-title">理赔信息</div>
          <div class="basisDrugsDetail-table-four">
            <div class="basisDrugsDetail-table-four-l">
              <div class="basisDrugsDetail-type">理赔记录编号</div>

              <div
                class="basisDrugsDetail-detail link-skip"
                @click="toserialNumber(objDetail.claim.id)"
              >
                {{ objDetail.claim.serialNumber || '-' }}
              </div>
            </div>
            <div class="basisDrugsDetail-table-four-r">
              <div class="basisDrugsDetail-type">服务项</div>

              <div class="basisDrugsDetail-detail">
                {{ objDetail.claim.serviceItemName || '-' }}
              </div>
            </div>
          </div>
          <div class="basisDrugsDetail-table-four">
            <div class="basisDrugsDetail-table-four-l">
              <div class="basisDrugsDetail-type">理赔申请日期</div>

              <div class="basisDrugsDetail-detail">
                {{
                  objDetail.claim.submitTime
                    ? $moment(objDetail.claim.submitTime).format(
                        'YYYY-MM-DD HH:mm:ss',
                      )
                    : '-'
                }}
              </div>
            </div>
            <div class="basisDrugsDetail-table-four-r" >
               <div class="basisDrugsDetail-type"></div>

              <div class="basisDrugsDetail-detail">
              </div>
            </div>
          </div>
          <div class="basisDrugsDetail-table-title">订单信息</div>
          <div class="basisDrugsDetail-table-four">
            <div class="basisDrugsDetail-table-four-l">
              <div class="basisDrugsDetail-type">订单编号</div>

              <div
                class="basisDrugsDetail-detail link-skip"
                @click="toOrderNo(objDetail.order.id)"
              >
                {{ objDetail.order.orderNo || '-' }}
              </div>
            </div>
            <div class="basisDrugsDetail-table-four-r">
              <div class="basisDrugsDetail-type">供应商</div>

              <div class="basisDrugsDetail-detail">
                {{ objDetail.order.providerName || '-' }}
              </div>
            </div>
          </div>
          <div class="basisDrugsDetail-table-four">
            <div class="basisDrugsDetail-table-four-l">
              <div class="basisDrugsDetail-type">订单时间</div>

              <div class="basisDrugsDetail-detail">
                {{
                  $moment(objDetail.order.createTime).format(
                    'YYYY-MM-DD HH:mm:ss',
                  )
                }}
              </div>
            </div>
            <div class="basisDrugsDetail-table-four-r">
              <div class="basisDrugsDetail-type">供应商结算单编号</div>

              <div class="basisDrugsDetail-detail">
                {{ objDetail.order.settlSerialNumber || '-' }}
              </div>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'ClaimSettlementDetailsDetail',
  data() {
    return {
      mainLoading: false,
      headPic: [],
      objDetail: {
        bill: {},
        claim: {},
        insurance: {},
        order: {}
      }
    };
  },
  created() {
    this.$store
      .dispatch('supplier/getCompanySettlementDetailDetail', {
        id: this.$route.params.id
      })
      .then(res => {
        this.objDetail = res.data || {};
      });
  },
  methods: {
    topolicyNo(id) {
      if (!id) {
        return;
      }
      const routeData = this.$router.resolve({
        path: `/policyManage/personalPolicy/details/${id}`
      });
      window.open(routeData.href, '_blank');
    },
    toserialNumber(id) {
      if (!id) {
        return;
      }
      const routeData = this.$router.resolve({
        path: `/claimManagement/auditRecordsDetail/${id}`
      });
      window.open(routeData.href, '_blank');
    },
    toOrderNo(id) {
      if (!id) {
        return;
      }
      const routeData = this.$router.resolve({
        path: `/drugManage/orderDetails/${id}`
      });
      window.open(routeData.href, '_blank');
    }
  }
};
</script>

<style lang="scss" scoped>
.companysettlement-detail-page {
  .basisDrugsDetail-table {
    // box-shadow: 0px 0px 2px 2px #e8e8e8;
    // margin-bottom: 20px;
     width: 99%;
    background: #ffffff;
    box-shadow: rgba(158, 158, 158, 0.5) 0px 0px 5px;
    border-radius: 4px;
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
        // flex: 1;
        // padding: 0 61px;
         flex: 1;
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
  }
}
</style>
