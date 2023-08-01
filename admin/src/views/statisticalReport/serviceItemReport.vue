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
        <div class="policy-service">
          <div class="policy-service-title">
            服务项：{{ data.serviceInfoName || '-' }}
          </div>
          <div class="company-item">
            <div class="policy-service-table">
              <el-table
                :data="data.serviceInfoFinancials"
                :row-style="{ borderLeft: '1px solid #F3F6F9' }"
                :cell-style="cellStyle"
                :header-row-style="{ borderBottom: '1px solid #F3F6F9' }"
              >
                <el-table-column label="分类">
                  <template slot-scope="{ row }">
                    <div class="table-maintext">
                      <div
                        class="table-maintext-c link-skip"
                        @click="goPath(row.serviceInfoType)"
                      >
                        {{ row.serviceInfoType || '-' }}
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="结算数量(总量|已结算|待结算)">
                  <template slot-scope="{ row }">
                    <div class="table-maintext">
                      <div class="table-maintext-c">
                        总量：{{ row.financialDataCompute.totalNum || '-' }} /
                        已结算：<span class="policy-info-green">{{
                          row.financialDataCompute.completeNum || '-'
                        }}</span>
                        / 待结算：<span class="policy-info-red">{{
                          row.financialDataCompute.waitNum || '-'
                        }}</span>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="结算金额(总金额|已结算|待结算)">
                  <template slot-scope="{ row }">
                    <div class="table-maintext">
                      <div class="table-maintext-c">
                        总金额：{{
                          row.financialDataCompute.totalPrice || '-'
                        }}
                        / 已结算：<span class="policy-info-green">{{
                          row.financialDataCompute.completePrice || '-'
                        }}</span>
                        / 待结算：<span class="policy-info-red">{{
                          row.financialDataCompute.waitPrice || '-'
                        }}</span>
                      </div>
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
  name: 'ServiceItemReport',
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
    this.$store.dispatch('settle/getServiceItemData', params).then(res => {
      this.data = res.data || {};
      this.tableLoading = false;
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
    goPath(serviceInfoType) {
      const type = serviceInfoType;
      //   let showNo = obj.showNo
      if (type === '供应商结算') {
        // 供应商结算
        localStorage.setItem('serviceInfoId', this.$route.query.id);
        this.$router.push({
          path: `/financial-center/service-item-settlement-details`
        });
      } else if (type === '理赔结算') {
        // 理赔结算
        localStorage.setItem('serviceInfoId', this.$route.query.id);
        this.$router.push({
          path: `/financial-center/claim-settlement-details`
        });
      } else {
        // 保单结算
        this.$router.push({
          path: `/financial-center/policy-settlement-details`
        });
      }
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

  .policy-info-text {
    font-size: 14px;

    font-weight: bold;
    color: #464668;
    line-height: 14px;
    margin: 24px 0 14px;
  }
  .policy-service {
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
