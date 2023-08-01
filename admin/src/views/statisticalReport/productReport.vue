<template>
  <div class="policy-report-page">
    <el-container>
      <el-scrollbar
        v-loading="tableLoading"
        :native="false"
        wrap-class="el-main spacing"
        tag="main"
        :noresize="false"
      >
        <div class="policy-service">
          <div class="policy-service-title">
            保险产品：{{ data.insuranceProductName || '-' }}
          </div>
          <div class="company-item">
            <!-- <div class="policy-info-text">保单号：1111111111111</div> -->
            <div class="policy-service-money">
              <div class="policy-service-money-l">
                <div class="company-buy-l">
                  <div class="company-buy-img1" />
                  <div class="company-buy-num">
                    {{ data.saleNumber || '0' }}
                  </div>
                  <div class="company-buy-text">保单销量</div>
                </div>
                <div class="company-buy-r">
                  <div class="company-buy-l">
                    <div class="company-buy-img2" />
                    <div class="company-buy-num">{{ data.premium || '0' }}</div>
                    <div class="company-buy-text">保费</div>
                  </div>
                </div>
              </div>
              <div class="policy-service-money-r">
                <!-- <div class="claim-percentage-item">
                                <div class="claim-percentage">
                                    <div class="flex-between">
                                        <div class="title">已结算 </div>
                                        <div class="money-num"> {{ 0}}</div>
                                    </div>
                                    <el-progress
                                        :percentage=" 0"
                                        :stroke-width="8"
                                        color="#3599FE"
                                        :show-text="false"
                                    ></el-progress>
                                </div>
                                <div class="icon-money"></div>
                                <div class="claim-percentage-text">待结算</div>
                                <div class="claim-percentage-num">20.9</div>
                            </div>
                            <div class="claim-percentage-item">
                                <div class="claim-percentage">
                                    <div class="flex-between">
                                        <div class="title">已结算 </div>
                                        <div class="money-num"> {{ 0}}</div>
                                    </div>
                                    <el-progress
                                        :percentage=" 0"
                                        :stroke-width="8"
                                        color="#3599FE"
                                        :show-text="false"
                                    ></el-progress>
                                </div>
                                <div class="icon-money"></div>
                                <div class="claim-percentage-text">待结算</div>
                                <div class="claim-percentage-num">20.9</div>
                            </div>
                            <div class="claim-percentage-item">
                                <div class="claim-percentage">
                                    <div class="flex-between">
                                        <div class="title">已结算 </div>
                                        <div class="money-num"> {{ 0}}</div>
                                    </div>
                                    <el-progress
                                        :percentage=" 0"
                                        :stroke-width="8"
                                        color="#3599FE"
                                        :show-text="false"
                                    ></el-progress>
                                </div>
                                <div class="icon-money"></div>
                                <div class="claim-percentage-text">待结算</div>
                                <div class="claim-percentage-num">20.9</div>
                            </div> -->
                <div class="service-money-r-item mb-50">
                  <div class="service-money-r-item-t">保单结算</div>
                  <div class="service-money-r-item-b mb-50">
                    <div class="icon-ok" />
                    <div class="claim-percentage-text">
                      已结算:{{ data.policeSettlementPriceComplete || '0' }}
                    </div>
                    <div class="icon-money" />
                    <div class="claim-percentage-text">
                      待结算:{{ data.policeSettlementPriceWait || '0' }}
                    </div>
                  </div>
                </div>
                <div class="service-money-r-item mb-50">
                  <div class="service-money-r-item-t">理赔结算</div>
                  <div class="service-money-r-item-b">
                    <div class="icon-ok" />
                    <div class="claim-percentage-text">
                      已结算:{{ data.claimSettlementPriceComplete || '0' }}
                    </div>
                    <div class="icon-money" />
                    <div class="claim-percentage-text">
                      待结算:{{ data.claimSettlementPriceWait || '0' }}
                    </div>
                  </div>
                </div>
                <div class="service-money-r-item">
                  <div class="service-money-r-item-t">供应商结算</div>
                  <div class="service-money-r-item-b">
                    <div class="icon-ok" />
                    <div class="claim-percentage-text">
                      已结算:{{ data.supplierSettlementPriceComplete || '0' }}
                    </div>
                    <div class="icon-money" />
                    <div class="claim-percentage-text">
                      待结算:{{ data.supplierSettlementPriceWait || '0' }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="policy-service-table">
              <el-table
                :data="data.reportFormTypeList"
                :row-style="{ borderLeft: '1px solid #F3F6F9' }"
                :cell-style="cellStyle"
                :header-row-style="{ borderBottom: '1px solid #F3F6F9' }"
              >
                <el-table-column label="分类">
                  <template slot-scope="{ row }">
                    <div class="table-maintext">
                      <div class="table-maintext-c">{{ row.type || '-' }}</div>
                    </div>
                  </template>
                </el-table-column>

                <el-table-column label="服务项">
                  <template slot-scope="{ row }">
                    <div class="table-maintext">
                      <template v-if="row.reportFormList.length > 0">
                        <div
                          v-for="(ele, index) in row.reportFormList"
                          :key="`保险公司3${index}`"
                          class="table-item"
                        >
                          {{ ele.serviceInfoName || '-' }}
                        </div>
                      </template>
                      <div v-else class="table-item">-</div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="供应商" show-overflow-tooltip>
                  <template slot-scope="{ row }">
                    <div class="table-maintext">
                      <template v-if="row.reportFormList.length > 0">
                        <div
                          v-for="(ele, index) in row.reportFormList"
                          :key="index"
                          class="table-item"
                        >
                          {{ ele.supplierName || '-' }}
                        </div>
                      </template>
                      <div v-else class="table-item">-</div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="供应商结算信息">
                  <template slot-scope="{ row }">
                    <div class="table-maintext">
                      <template v-if="row.reportFormList.length > 0">
                        <div
                          v-for="(ele, index) in row.reportFormList"
                          :key="`保险公司4${index}`"
                          class="table-item"
                          @click="toSupplier(ele.supplierSettlementId)"
                        >
                          <div v-if="ele.supplierSettlementCompleteState">
                            已结算：<span class="policy-info-green">{{
                              ele.supplierSettlementPriceComplete || '-'
                            }}</span
                            >/待结算：<span class="policy-info-red">{{
                              ele.supplierSettlementPriceWait || '-'
                            }}</span>
                          </div>
                          <div v-else>无需结算</div>
                        </div>
                      </template>
                      <div v-else class="table-item">-</div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="理赔结算信息">
                  <template slot-scope="{ row }">
                    <div class="table-maintext">
                      <template v-if="row.reportFormList.length > 0">
                        <div
                          v-for="(ele, index) in row.reportFormList"
                          :key="`保险公司4${index}`"
                          class="table-item"
                          @click="toClaim(ele.claimSettlementId)"
                        >
                          <div v-if="ele.claimSettlementCompleteState">
                            已结算：<span class="policy-info-green">{{
                              ele.claimSettlementPriceComplete || '-'
                            }}</span
                            >/待结算：<span class="policy-info-red">{{
                              ele.claimSettlementPriceWait || '-'
                            }}</span>
                          </div>
                          <div v-else>无需结算</div>
                        </div>
                      </template>
                      <div v-else class="table-item">-</div>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'ProductReport',
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
    this.$store.dispatch('settle/getProductData', params).then(res => {
      this.tableLoading = false;
      this.data = res.data || {};
    });
  },
  methods: {
    cellStyle(obj) {
      if (obj.columnIndex === 0) {
        return {
          borderLeft: '1px solid #F3F6F9',
          borderRight: '1px solid #F3F6F9'
        };
      } else {
        return { borderRight: '1px solid #F3F6F9' };
      }
    },
    getPercentage(num1, num2) {
      return (num1 / (num1 + num2)) * 100;
    },
    toSupplier(id) {
      if (!id) {
        return;
      }
      const routeData = this.$router.resolve({
        path: `/financial-center/service-item-settlement/detail/${id}`
      });
      window.open(routeData.href, '_blank');
    },
    toClaim(id) {
      if (!id) {
        return;
      }
      // localStorage.setItem("settlementId",id)
      const routeData = this.$router.resolve({
        path: `/financial-center/claim-settlement-details/detail/${id}`
      });
      window.open(routeData.href, '_blank');
    }
  }
};
</script>

<style lang="scss" scoped>
.policy-report-page {
  .mb-50 {
    margin-bottom: 24px;
  }
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

  .policy-info-text {
    font-size: 14px;

    font-weight: bold;
    color: #464668;
    line-height: 14px;
    margin: 24px 0 14px;
  }
  .policy-info {
    padding: 24px;
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
      &::before {
        content: '';
        width: 16px;
        height: 16px;
        background: url('../../assets/statisticalreport/policy-company.png')
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
  .policy-service {
    padding: 24px;
    box-shadow: 0px 6px 12px 0px rgba(242, 242, 242, 0.5);
    border-radius: 4px;
    margin-bottom: 24px;
    background-color: #fff;
    .company-item {
      padding-bottom: 24px;
      box-shadow: 0px 1px 0px 0px #ebedf2;
    }
    &-title {
      font-size: 16px;

      font-weight: bold;
      color: #464668;
      line-height: 16px;
      display: flex;
      align-items: center;
      padding-bottom: 24px;
      box-shadow: 0px 1px 0px 0px #ebedf2;
      &::before {
        content: '';
        width: 16px;
        height: 16px;
        background: url('../../assets/statisticalreport/policy-company.png')
          no-repeat center center;
        background-size: 100% 100%;
        margin-right: 8px;
      }
    }
    &-money {
      padding: 24px;
      display: flex;
      margin-bottom: 32px;
      .money-title {
        font-size: 14px;

        font-weight: bold;
        color: #464668;
        line-height: 14px;
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
      &-l {
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .claim-percentage {
          margin-top: 24px;
          .title {
            font-size: 14px;

            font-weight: 400;
            color: #a2a3b7;
            line-height: 16px;
            margin-bottom: 7px;
          }
          .money-num {
            font-size: 18px;

            font-weight: bold;
            color: #464668;
            line-height: 18px;
          }
          .clickNum {
            color: #3599fe;
            text-decoration: underline;
            font-weight: bold;
          }
        }
        .company-buy-l,
        .company-buy-r {
          display: flex;
          flex-direction: column;
          align-items: center;
          .company-buy-img1 {
            width: 90px;
            height: 72px;
            background: url('../../assets/statisticalreport/policy-buy.png')
              no-repeat center center;
            background-size: 100% 100%;
          }
          .company-buy-img2 {
            width: 90px;
            height: 72px;
            background: url('../../assets/statisticalreport/policy-buymoney.png')
              no-repeat center center;
            background-size: 100% 100%;
          }
          .company-buy-num {
            font-size: 32px;

            font-weight: bold;
            color: #464668;
            line-height: 32px;
            margin-top: 24px;
            text-align: center;
            max-width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .company-buy-text {
            font-size: 14px;

            font-weight: 400;
            color: #464668;
            line-height: 16px;
            margin-top: 12px;
            text-align: center;
          }
        }
      }
      &-r {
        width: 50%;
        padding-left: 26px;
        box-sizing: border-box;
        border-left: 1px solid #e8e8e8;
        padding-bottom: 24px;
        display: flex;
        flex-wrap: wrap;
        .claim-percentage {
          flex: 1;
          margin-top: 24px;
          .title {
            font-size: 12px;

            font-weight: bold;
            color: #464668;
            line-height: 16px;
            margin-bottom: 7px;
          }
          .money-num {
            font-size: 14px;

            font-weight: bold;
            color: #464668;
            line-height: 18px;
          }
          .clickNum {
            color: #3599fe;
            text-decoration: underline;
            font-weight: bold;
          }
        }
        .claim-percentage-item {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          .icon-money {
            width: 16px;
            height: 16px;
            background: url('../../assets/statisticalreport/policy-yuan.png')
              no-repeat center center;
            background-size: 100% 100%;
            margin: 0 10px 0 24px;
          }
          .claim-percentage-text {
            font-size: 14px;

            font-weight: 400;
            color: #a2a3b7;
            line-height: 14px;
            margin-right: 10px;
          }
          .claim-percentage-num {
            font-size: 14px;

            font-weight: 400;
            color: #f64e60;
            line-height: 14px;
          }
        }
        .service-money-r-item {
          width: 50%;
          &-t {
            font-size: 16px;

            font-weight: bold;
            color: #464668;
            line-height: 16px;
            margin-bottom: 16px;
          }
          &-b {
            display: flex;
            align-items: center;
            .icon-money {
              width: 16px;
              height: 16px;
              background: url('../../assets/statisticalreport/policy-yuan.png')
                no-repeat center center;
              background-size: 100% 100%;
              margin: 0 4px;
            }
            .icon-ok {
              width: 16px;
              height: 16px;
              background: url('../../assets/statisticalreport/policy-ok.png')
                no-repeat center center;
              background-size: 100% 100%;
              margin: 0 4px;
            }
            .claim-percentage-text {
              font-size: 14px;

              font-weight: 400;
              color: #464668;
              line-height: 14px;
              margin-right: 10px;
            }
            .claim-percentage-num {
              font-size: 14px;

              font-weight: 400;
              color: #a2a3b7;
              line-height: 14px;
            }
          }
        }
      }
    }
    &-table {
      /deep/.el-table td .cell {
        padding: 0;
      }
      /deep/.el-table th.is-leaf,
      .el-table td {
        border-bottom: 1px solid #f3f6f9;
      }
      /deep/.el-table tbody {
        border-left: 1px solid #f3f6f9;
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
          border-bottom: 1px solid #f3f6f9;
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
