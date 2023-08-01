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
        <div class="policy-info">
          <div class="policy-info-title">保单信息</div>
          <div
            class="policy-info-text link-skip"
            @click="toPolicyNo(data.policyId)"
          >
            保单号：{{ data.policyNo || '-' }}
          </div>
          <el-table :data="[1]" class="table-large">
            <el-table-column label="保险产品">
              <template>
                <div class="table-maintext">
                  {{ data.insuranceProductName || '-' }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="保险公司">
              <template>
                <div class="table-maintext">
                  {{ data.insuranceCompanyName || '-' }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="承保机构">
              <template>
                <div class="table-maintext">
                  {{ data.insuranceCompanyInstitutionName || '-' }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="被保人">
              <template>
                <div class="table-maintext">
                  {{ data.name || '-' }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="保单状态">
              <template>
                <div class="table-maintext">
                  {{ data.policyStatus || '-' }}
                </div>
                <div class="table-sectext">
                  {{
                    data.policyDateStart
                      ? $moment(data.policyDateStart).format('YYYY-MM-DD')
                      : '-'
                  }}-
                  {{
                    data.policyDateEnd
                      ? $moment(data.policyDateEnd).format('YYYY-MM-DD')
                      : '-'
                  }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="保费">
              <template>
                <div class="table-maintext">
                  {{ data.premium || '-' }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="保单结算信息">
              <template>
                <template v-if="data.policySettlementState">
                  <div
                    :class="
                      `${
                        data.policySettlementState === 1
                          ? 'policy-info-red'
                          : 'policy-info-green'
                      }`
                    "
                  >
                    ￥{{ data.policySettlement || '-' }}
                  </div>
                  <div class="table-sectext">
                    {{ data.policySettlementState | policySettlementState }}
                    {{
                      data.policySettlementTime
                        ? $moment(data.policySettlementTime).format(
                            'YYYY-MM-DD',
                          )
                        : '-'
                    }}
                  </div>
                </template>
                <div
                  v-else-if="data.policySettlementState === 0"
                  class="table-maintext"
                >
                  保单无需结算
                </div>
                <div v-else class="table-maintext">-</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="policy-service">
          <div class="policy-service-title">保单增值服务</div>
          <div class="policy-service-money">
            <div class="policy-service-money-l">
              <div class="money-title">理赔结算金额</div>
              <div class="claim-percentage">
                <div class="flex-between">
                  <div class="title">已结算</div>
                  <div class="money-num">
                    {{ data.claimSettlementCompletePriceTotal || '-' }}
                  </div>
                </div>
                <el-progress
                  :percentage="data.per1"
                  :show-text="false"
                  :stroke-width="16"
                  color="#3599FE"
                />
              </div>
              <div class="claim-percentage">
                <div class="flex-between">
                  <div class="title">未结算</div>
                  <div class="money-num">
                    {{ data.claimSettlementWaitPriceTotal || '-' }}
                  </div>
                </div>
                <el-progress
                  :percentage="data.per2"
                  :show-text="false"
                  :stroke-width="16"
                  color="#3599FE"
                />
              </div>
            </div>
            <div class="policy-service-money-r">
              <div class="money-title">供应商结算金额</div>
              <div class="claim-percentage">
                <div class="flex-between">
                  <div class="title">已结算</div>
                  <div class="money-num">
                    {{ data.supplierSettlementCompletePriceTotal || '-' }}
                  </div>
                </div>
                <el-progress
                  :percentage="data.per3"
                  :show-text="false"
                  :stroke-width="16"
                  color="#3599FE"
                />
              </div>
              <div class="claim-percentage">
                <div class="flex-between">
                  <div class="title">未结算</div>
                  <div class="money-num">
                    {{ data.supplierSettlementWaitPriceTotal || '-' }}
                  </div>
                </div>
                <el-progress
                  :percentage="data.per4"
                  :show-text="false"
                  :stroke-width="16"
                  color="#3599FE"
                />
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
                        :key="`保险公司2${index}`"
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
              <el-table-column label="已使用次数/剩余次数">
                <template slot-scope="{ row }">
                  <div class="table-maintext">
                    <div v-if="row.reportFormList.infinite" class="table-item">
                      无限次
                    </div>
                    <template v-else-if="row.reportFormList.length > 0">
                      <div
                        v-for="(ele, index) in row.reportFormList"
                        :key="`保险公司3${index}`"
                        class="table-item"
                      >
                        {{ ele.usedAndSurplus[0] || '0' }}次/{{
                          ele.usedAndSurplus[1] == -1
                            ? '无限'
                            : ele.usedAndSurplus[1] || '0'
                        }}次
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
                        <template v-if="ele.supplierSettlementCompleteState">
                          已结算：<span class="policy-info-green" />{{
                            ele.supplierSettlementCompletePrice || '-'
                          }}/待结算：<span class="policy-info-red">{{
                            ele.supplierSettlementWaitPrice || '-'
                          }}</span>
                        </template>
                        <template v-else>无需结算</template>
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
                        <template v-if="ele.claimSettlementCompleteState">
                          已结算：<span class="policy-info-green" />{{
                            ele.claimSettlementCompletePrice || '-'
                          }}/待结算：<span class="policy-info-red">{{
                            ele.claimSettlementWaitPrice || '-'
                          }}</span>
                        </template>
                        <template v-else>无需结算</template>
                      </div>
                    </template>
                    <div v-else class="table-item">-</div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-scrollbar>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'policyReport',
  filters: {
    policySettlementState(val) {
      if (val === 2) {
        return '待结算';
      } else if (val === 3) {
        return '已结算';
      } else if (val === 1) {
        return '-/-';
      } else {
        return '-';
      }
    }
  },
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
      .dispatch('settle/getPolicyData', params)
      .then(res => {
        this.data = res.data || {};
        this.data.per1 =
          this.data.claimSettlementCompletePriceTotal +
            this.data.claimSettlementWaitPriceTotal ===
          0
            ? 0
            : this.getPercentage(
                this.data.policeSettlementPriceComplete,
                this.data.policeSettlementPriceWait,
              );
        this.data.per2 =
          this.data.claimSettlementCompletePriceTotal +
            this.data.claimSettlementWaitPriceTotal ===
          0
            ? 0
            : this.getPercentage(
                this.data.policeSettlementPriceWait,
                this.data.policeSettlementPriceComplete,
              );
        this.data.per3 =
          this.data.supplierSettlementCompletePriceTotal +
            this.data.supplierSettlementWaitPriceTotal ===
          0
            ? 0
            : this.getPercentage(
                this.data.supplierSettlementCompletePriceTotal,
                this.data.supplierSettlementWaitPriceTotal,
              );
        this.data.per4 =
          this.data.supplierSettlementCompletePriceTotal +
            this.data.supplierSettlementWaitPriceTotal ===
          0
            ? 0
            : this.getPercentage(
                this.data.supplierSettlementWaitPriceTotal,
                this.data.supplierSettlementCompletePriceTotal,
              );

        this.tableLoading = false;
      })
      .catch(() => {
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
    toPolicyNo(id) {
      if (!id) {
        return;
      }
      const routeData = this.$router.resolve({
        path: `/policyManage/personalPolicy/details/${id}`
      });
      window.open(routeData.href, '_blank');
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
  .policy-service {
    padding: 24px;
    box-shadow: 0px 6px 12px 0px rgba(242, 242, 242, 0.5);
    border-radius: 4px;
    margin-bottom: 24px;
    background-color: #fff;
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
        background: url('../../assets/statisticalreport/policy-service.png')
          no-repeat center center;
        background-size: 100% 100%;
        margin-right: 8px;
      }
    }
    &-money {
      padding: 24px 0;
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
        border-right: 1px solid #e8e8e8;
        padding-right: 70px;
        box-sizing: border-box;
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
      }
      &-r {
        width: 50%;
        padding-left: 70px;
        box-sizing: border-box;
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
