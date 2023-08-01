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
          <div class="blue-line" />
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
            <div v-if="detail.settelmentBaseMsgVO.settlementMethod === 6">
                <InputNumber
              v-model="detail.settelmentBaseMsgVO.settlementPrice"
              :maxlength="32"
              :precision="2"
              :max="999999999.00"
              class="w-400"
            >
              <div slot="append" class="w-100">元</div>
            </InputNumber>

            </div>
            <template v-else>
              ￥{{ detail.settelmentBaseMsgVO.settlementPrice || '-' }}
            </template>
          </div>
          <div class="content-left">生成时间</div>
          <div class="normal">
            {{
              detail.settelmentBaseMsgVO.applicationTime
                ? $moment(detail.settelmentBaseMsgVO.applicationTime).format(
                    'YYYY-MM-DD',
                  )
                : '-'
            }}
          </div>
        </div>
        <div
          v-if="detail.settelmentBaseMsgVO.settlementMethod === 6"
          class="content-row flex"
        >
          <div class="content-left">结算对象</div>
          <div class="content-right normal">
            <el-input
              class="input"
              v-model="detail.settelmentBaseMsgVO.settlementObject"
              maxlength="20"
            >
            </el-input>
          </div>
          <div class="content-left">结算公司名称</div>
          <div class="normal">
            <el-input
              class="input"
              v-model="detail.settelmentBaseMsgVO.settlementCompanyName"
               maxlength="20"
            >
            </el-input>
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
                    'YYYY-MM-DD',
                  )
                : '-'
            }}
          </div>
        </div>
        <div class="content-detail flex">
          <div class="blue-line" />
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
                  detail.serviceInfo.serviceRecordVo.servicePath,
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
                    'YYYY-MM-DD',
                  )
                : '-'
            }}
          </div>
        </div>
        <div class="content-detail flex">
          <div class="blue-line" />
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
          <div class="blue-line" />
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
        <div
          v-if="detail.settelmentBaseMsgVO.settlementMethod === 6"
          class="upload-item"
        >
          <div class="label">订单凭证</div>
          <div class="text">
            <div class="upload-item-img-list">
              <div class="upload-item-img-list-item">
                <div
                  v-for="(item, index) in orderVouchers"
                  :key="index"
                  class="img"
                  style="position: relative"
                >
                  <i class="icon-disable" @click.stop="deleteImage(index)" />
                  <el-image
                    style="width: 178px; height: 178px"
                    :src="item.url"
                    class="avatar"
                    :preview-src-list="fileList"
                  />
                </div>
                <el-upload
                  v-if="orderVouchers && orderVouchers.length < 3"
                  class="avatar-uploader"
                  action=""
                  accept="image/jpeg,image/png"
                  :show-file-list="false"
                  :http-request="uploadHeader"
                  :before-upload="beforeUpload"
                >
                  <i class="el-icon-plus avatar-uploader-icon" />
                </el-upload>
              </div>
            </div>
            <div class="tips">
              支持JPEG，PNG文件，不超过10M，最多可支持上传3张凭证
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="
          detail.settelmentBaseMsgVO.settlementMethod === 6 &&
          detail.settelmentBaseMsgVO.state === '1012'
        "
      >
        <div class="page-footer">
          <el-button class="m-auto" type="primary" @click="save">
            保存
          </el-button>
        </div>
      </div>
    </el-scrollbar>
  </el-container>
</template>

<script>
import uplaodCertificate from '@/utils/uplaodCertificate2';
import { updateSettlementDetail } from '@/api/settle';
export default {
  name: 'ServiceItemSettlementDetailsDetail',
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
      },
      orderVouchers: [],
      fileList: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$store
        .dispatch('settle/getSupplierDetail', { id: this.$route.params.id })
        .then((res) => {
          this.detail = res.data;
          if (res.data.remittanceCertificate) {
            res.data.remittanceCertificate.forEach((item) => {
              this.fileList.push(item.url);
            });
            this.orderVouchers = res.data.remittanceCertificate;
          }
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
      this.$router.push({
        path: `/financial-center/service-item-settlement/detail/${id}`
      });
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
      if (id) {
        this.$router.push({
          path: `/policyManage/personalPolicy/details/${id}`
        });
      }
    },
    goPolicyID(id) {
      if (id) {
        this.$router.push({
          path: `/financial-center/policy-settlement/detail/${id}`
        });
      }
    },
    goClaimInfo(id) {
      if (id) {
        this.$router.push({
          path: `/claimManagement/auditRecordsDetail/${id}`
        });
      }
    },
    goClaimInfoID(id) {
      if (id) {
        this.$router.push({
          path: `/financial-center/claim-settlement/detail/${id}`
        });
      }
    },
    // 限制图片上传
    beforeUpload(file) {
      const isLt10M = file.size / 1024 / 1024 < 10;

      if (!isLt10M) {
        this.$message.error('上传文件大小不能超过 10MB!');
      }
      return isLt10M;
    },

    uploadHeader(item) {
      if (this.orderVouchers.length >= 10) {
        this.$message.error('最多添加10张！');
        return;
      }
      this.mainLoading = true;
      uplaodCertificate(item, false)
        .then((res) => {
          this.mainLoading = false;
          res.forEach((item) => {
            this.orderVouchers.push(item);
            this.fileList.push(item.url);
          });
        })
        .catch(() => {
          this.mainLoading = false;
          this.$message.error('上传有误');
        });
    },
    deleteImage(index) {
      this.orderVouchers.splice(index, 1);
      this.fileList.splice(index, 1);
    },
    save() {
      const fileReqList = [];
      this.orderVouchers.forEach((item) => {
        fileReqList.push({
          fileId: item.id,
          fileType: item.fileType,
          fileUrl: item.url
        });
      });
      const params = {
        id: this.$route.params.id,
        price: this.detail.settelmentBaseMsgVO.settlementPrice,
        settlementCompanyName:
          this.detail.settelmentBaseMsgVO.settlementCompanyName,
        settlementObject: this.detail.settelmentBaseMsgVO.settlementObject,
        fileReqList
      };
      updateSettlementDetail(params).then((res) => {
        this.$message.success(res.message);
        this.getList();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.supplier-detail {
  margin-bottom: 60px;
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
    border-right: 1px solid #ebedf2;
       display: flex;
        align-items: center;
        min-height: 48px;
        height: 100%;
        width: 165px;
        font-weight: bold;
        padding-left: 32px;
  }
  .content-right {
    border-right: 1px solid #e8e8e8;
    .input {
      width: 270px;
    }
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
    background: #ffe2e5;
    color: #f64e60;
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
  .upload-item {
    width: 100%;
    height: auto;
    display: flex;
    align-items: stretch;
    .label {
      font-weight: bold;
      color: #545473;
      display: flex;
      border-right: 1px solid #e8e8e8;
      flex: 0 0 15%;
      margin-left: 32px;
      align-items: center;
      font-weight: bold;
      font-size: 14px;
    }
    .text {
      border: 1px solid #e8e8e8;
      flex: 1;
      display: flex;
      padding: 16px 32px;
      align-items: flex-end;
      .tips {
        margin-left: 16px;
        font-size: 14px;

        font-weight: 400;
        color: #989ab3;
      }

      .upload-item-img {
        &-list {
          &-item {
            display: flex;
            flex-wrap: wrap;
            .img {
              margin-right: 24px;
              margin-bottom: 24px;
              width: 178px;
              height: 178px;
            }
            /deep/ .avatar-uploader .el-upload {
              cursor: pointer;
              position: relative;
            }
            /deep/ .avatar-uploader .el-upload:hover {
              border-color: #409eff;
            }
            /deep/ .avatar-uploader.disable .el-upload:hover {
              cursor: no-drop;
            }
            .avatar-uploader.disable .avatar-uploader-icon {
              &:hover {
                border-color: #dee2e8;
              }
            }
            .avatar-uploader-icon {
              border: 1px dashed #dee2e8;
              border-radius: 6px;
              font-size: 28px;
              color: #8c939d;
              width: 178px;
              height: 178px;
              line-height: 178px;
              text-align: center;
              &:hover {
                border-color: #409eff;
              }
            }
            .avatar {
              width: 178px;
              height: 178px;
              border: 1px solid #999999;
              display: block;
            }
            .icon-disable {
              position: absolute;
              top: -7px;
              right: -5px;
              z-index: 10;
            }
          }
        }
      }
    }
  }
}
</style>
