<template>
  <el-container>
    <el-scrollbar
      :native="false"
      wrap-class="el-main"
      tag="main"
      :noresize="false"
    >
      <div class="title-top">供应商结算明细详情</div>
      <div class="supplier-detail new-form">
        <div class="content-detail flex">
          <div class="blue-line"/>
          结算信息
        </div>
        <div class="content-row flex">
          <div class="content-left">结算ID</div>
          <div class="content-right normal">
            {{ detail.settelmentBaseMsgVO.settlementDetailNumber || '-' }}
          </div>
          <div class="content-left">结算单编号</div>
          <div class="normal">
            <div class="link" @click="goSettle(detail.settelmentBaseMsgVO.id)">
              {{ detail.settelmentBaseMsgVO.serialNumber || '-' }}
            </div>
          </div>
        </div>
        <div class="content-row flex">
          <div class="content-left">结算状态</div>
          <div class="content-right normal overflow">
            <div
              v-if="detail.settelmentBaseMsgVO.state === '1012'"
              class="check-status-tag check-passin"
            >
              待结算
            </div>
            <div
              v-if="detail.settelmentBaseMsgVO.state === '1011'"
              class="check-status-tag check-pass"
            >
              已结算
            </div>
          </div>
          <div class="content-left">结算帐期</div>
          <div class="normal">
            {{ detail.settelmentBaseMsgVO.accountPeriod || '-' }}
          </div>
        </div>
        <div class="content-row flex">
          <div class="content-left">结算金额</div>
          <div class="content-right normal">
            ￥{{ detail.settelmentBaseMsgVO.settlementPrice || '-' }}
          </div>
          <div class="content-left">生成时间</div>
          <div class="normal">
            {{
              detail.settelmentBaseMsgVO.applicationTime
                ? $moment(detail.settelmentBaseMsgVO.applicationTime).format(
                    'YYYY-MM-DD'
                  )
                : '-'
            }}
          </div>
        </div>
        <div class="content-row flex">
          <div class="content-left">完成人</div>
          <div class="content-right normal overflow">
            {{ detail.settelmentBaseMsgVO.updator || '-' }}
          </div>
          <div class="content-left">结算完成时间</div>
          <div class="normal">
            {{
              detail.settelmentBaseMsgVO.updateTime
                ? $moment(detail.settelmentBaseMsgVO.updateTime).format(
                    'YYYY-MM-DD'
                  )
                : '-'
            }}
          </div>
        </div>
        <div class="content-detail flex">
          <div class="blue-line"/>
          服务单信息
        </div>
        <div class="content-row flex">
          <div class="content-left">服务单编号</div>
          <div class="content-right normal">
            <div
              class="link"
              @click="
                goService(
                  detail.serviceInfo.serviceRecordVo.detailId,
                  detail.serviceInfo.serviceRecordVo.servicePath
                )
              "
            >
              {{ detail.serviceInfo.serviceRecordVo.serialNumber || '-' }}
            </div>
          </div>
          <div class="content-left">供应商订单编号</div>
          <div class="normal">{{ detail.serviceInfo.outOrderNo || '-' }}</div>
        </div>
        <div class="content-row flex">
          <div class="content-left">服务项信息</div>
          <div class="content-right normal overflow">
            {{ detail.serviceInfo.serviceInfoName || '-' }}
          </div>
          <div class="content-left">供应商编号</div>
          <div class="normal">{{ detail.serviceInfo.supplierCode || '-' }}</div>
        </div>
        <div class="content-row flex">
          <div class="content-left">供应商名称</div>
          <div class="content-right normal">
            {{ detail.serviceInfo.supplierName || '-' }}
          </div>
          <div class="content-left">服务单完成时间</div>
          <div class="normal">
            {{
              detail.serviceInfo.serviceRecordVo.updateTime
                ? $moment(detail.serviceInfo.serviceRecordVo.updateTime).format(
                    'YYYY-MM-DD'
                  )
                : '-'
            }}
          </div>
        </div>
        <div class="content-detail flex">
          <div class="blue-line"/>
          保险信息
        </div>
        <div class="content-row flex">
          <div class="content-left">保单编号</div>
          <div class="content-right normal">
            <div class="link" @click="goPolicy(detail.insuranceInfo.policyId)">
              {{ detail.insuranceInfo.policyNo || '-' }}
            </div>
          </div>
          <div class="content-left">被保人姓名</div>
          <div class="normal">
            {{ detail.insuranceInfo.insuredName || '-' }}
          </div>
        </div>
        <div class="content-row flex">
          <div class="content-left">保险结算ID</div>
          <div class="content-right normal overflow">
            <div
              class="link"
              @click="goPolicyID(detail.insuranceInfo.policyId)"
            >
              {{ detail.insuranceInfo.insuranceBillSerialNumber || '-' }}
            </div>
          </div>
          <div class="content-left">保险公司名称</div>
          <div class="normal">
            {{ detail.insuranceInfo.insuranceCompanyName || '-' }}
          </div>
        </div>
        <div class="content-row flex">
          <div class="content-left">保险名称</div>
          <div class="content-right normal">
            {{ detail.insuranceInfo.insuranceName || '-' }}
          </div>
          <div class="content-left">保障计划名称</div>
          <div class="normal">
            {{ detail.insuranceInfo.insurancePlanName || '-' }}
          </div>
        </div>
        <div class="content-detail flex">
          <div class="blue-line"/>
          理赔信息
        </div>
        <div class="content-row flex">
          <div class="content-left">理赔编号</div>
          <div class="content-right normal">
            <div
              class="link"
              @click="goClaimInfo(detail.claimInfo.claimRecord)"
            >
              {{ detail.claimInfo.serialNumber || '-' }}
            </div>
          </div>
          <div class="content-left">理赔通过日期</div>
          <div class="normal">
            {{
              detail.claimInfo.passTime
                ? $moment(detail.claimInfo.passTime).format('YYYY-MM-DD')
                : '-'
            }}
          </div>
        </div>
        <div class="content-row flex">
          <div class="content-left">理赔结算ID</div>
          <div class="normal">
            <div
              class="link"
              @click="goClaimInfoID(detail.claimInfo.claimBillSerialNumber)"
            >
              {{ detail.claimInfo.claimBillSerialNumber || '-' }}
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </el-container>
</template>

<script>
export default {
  name: 'supplierDetail',
  data() {
    return {
      detail: {
        insuranceInfo: {
          policyNo: '',
          insuredName: '',
          insuranceBillSerialNumber: '',
          insuranceCompanyName: '',
          insuranceName: '',
          insurancePlanName: ''
        },
        claimInfo: {
          serialNumber: '',
          passTime: '',
          claimBillSerialNumber: ''
        },
        serviceInfo: {
          serviceRecordVo: {
            serialNumber: '',
            updateTime: ''
          },
          outOrderNo: '',
          serviceInfoName: '',
          supplierName: '',
          supplierCode: ''
        },
        settelmentBaseMsgVO: {
          serialNumber: '',
          settlementDetailNumber: '',
          state: '',
          settlementPrice: '',
          accountPeriod: '',
          applicationTime: '',
          updator: '',
          updateTime: ''
        }
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$store
        .dispatch('settle/getSupplierDetail', { id: this.$route.params.id })
        .then(res => {
          this.detail = res.data;
          if (!this.detail.claimInfo) {
            this.detail.claimInfo = {
              serialNumber: '',
              passTime: '',
              claimBillSerialNumber: ''
            };
          }
          if (!this.detail.insuranceInfo) {
            this.detail.insuranceInfo = {
              policyNo: '',
              insuredName: '',
              insuranceBillSerialNumber: '',
              insuranceCompanyName: '',
              insuranceName: '',
              insurancePlanName: ''
            };
          }
          if (!this.detail.serviceInfo) {
            this.detail.serviceInfo = {
              serviceRecordVo: {
                serialNumber: '',
                updateTime: ''
              },
              outOrderNo: '',
              serviceInfoName: '',
              supplierName: '',
              supplierCode: ''
            };
          } else {
            if (!this.detail.serviceInfo.serviceRecordVo) {
              this.detail.serviceInfo = {
                serviceRecordVo: {
                  serialNumber: '',
                  updateTime: ''
                }
              };
            }
          }
          if (!this.detail.settelmentBaseMsgVO) {
            this.detail.settelmentBaseMsgVO = {
              serialNumber: '',
              settlementDetailNumber: '',
              state: '',
              settlementPrice: '',
              accountPeriod: '',
              applicationTime: '',
              updator: '',
              updateTime: ''
            };
          }
        });
    },
    goSettle(id) {
      this.$router.push({ path: `/settleDetails/${id}` });
    },
    goService(id, servicePath) {
      if (servicePath === 'RESERVE_DETAIL') {
        // 预约
        this.$router.push({
          path: `/operateManage/appointmentService/details/${id}/0`
        });
      } else if (servicePath === 'ONLINE_SERVICE_DETAIL') {
        // 在线
        this.$router.push({
          path: `/operateManage/onlineService/details/${id}`
        });
      } else if (servicePath === 'COUPON_CODE_DETAIL') {
        // 虚拟商品兑换
        this.$router.push({
          path: `/operateManage/commodityExchange/details/${id}/0`
        });
      } else if (servicePath === 'COUPON_DETAIL,') {
        // 实物商品兑换
        this.$router.push({
          path: `/operateManage/commodityExchange/details/${id}/1`
        });
      } else if (servicePath === 'DRUG_ORDER_DETAIL') {
        // 购药订单
        this.$router.push({ path: `/drugManage/orderDetails/${id}` });
      } else if (servicePath === 'AI_DIAGNOSE_DETAIL') {
        // AI问诊
        this.$router.push({ path: `inquiryManage/inquiryRecord/detail/${id}` });
      } else if (servicePath === 'DOCTOR_DIAGNOSE_DETAIL') {
        // 人工问诊
        this.$router.push({ path: `inquiryManage/inquiryRecord/detail/${id}` });
      } else if (servicePath === 'DOCTOR_TREATMENT_DETAIL') {
        // 电话问诊
        this.$router.push({ path: `inquiryManage/inquiryRecord/detail/${id}` });
      } else if (servicePath === 'DOCTOR_TREATMENT_DETAIL') {
        // 医师服务
        this.$router.push({
          path: `secondaryTreatment/treatments/detail/${id}`
        });
      }
    },

    goPolicy(id) {
      this.$router.push({ path: `/policyManage/personalPolicy/details/${id}` });
    },
    goPolicyID(id) {
      this.$router.push({
        path: `/financial-center/policy-settlement/detail/${id}`
      });
    },
    goClaimInfo(id) {
      this.$router.push({ path: `/claimManagement/auditRecordsDetail/${id}` });
    },
    goClaimInfoID(id) {
      this.$router.push({
        path: `/financial-center/claim-settlement/detail/${id}`
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.supplier-detail {
  .content-detail {
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 48px;
    background: #f3f6f9;
    font-size: 16px;
    font-weight: bold;
    color: #545473;
    padding: 16px;

    .blue-line {
      width: 4px;
      height: 16px;
      background: #3599fe;
      margin-right: 12px;
    }
  }
  .content-row {
    width: 100%;
    height: 48px;
    box-shadow: 0px 1px 0px 0px #e8e8e8;
    justify-content: flex-start;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
    color: #545473;
    line-height: 48px;
  }
  .content-left {
    // border-right: 1px solid #e8e8e8;
    // flex: 0 0 15%;
    // margin-left: 32px;
    // height: 48px;
        display: flex;
        align-items: center;
        min-height: 48px;
        height: 100%;
        width: 165px;
        font-weight: bold;
        padding-left: 32px;
  }
  .content-right {
    border-right: 1px solid #ebedf2;
  }
  .normal {
    font-weight: normal;
    flex: 0 0 30%;
    margin-left: 32px;
    height: 48px;
  }
  .check-status-tag {
    font-size: 14px;
    text-align: center;
    line-height: 24px;
    border-radius: 4px;
    height: 24px;
    margin: 13px 0 0 -5px;
  }
  .check-pass {
    background: #c9f7f4;
    color: #18c4bd;
    width: 72px;
  }
  .check-passin {
    background: #e1f1ff;
    color: #62acff;
    width: 55px;
  }
  .check-unpass {
    background: #ffe2e5;
    color: #f64e60;
    width: 72px;
  }
  .link {
    cursor: pointer;
    &:hover {
      color: #3599fe;
    }
  }
}
</style>
