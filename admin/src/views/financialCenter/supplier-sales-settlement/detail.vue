<template>
  <div class="el-container">
    <div class="el-main">
      <div class="flex-col">
        <Tab :btns="btns" @change="handleClick" />
        <div class="scroll-table" v-if="activeName === '0'">
          <div class="settlement">
            <div class="title-top">
              结算基础信息
            </div>
            <div class="card">
              <div class="order-details" style="margin-bottom: 0">
                <div class="details-item" style="padding-top: 0">
                  <div class="title-top">
                    基础信息
                  </div>
                  <div class="contnet">
                    <div class="item-3">
                      <div class="label">结算编号</div>
                      <div class="text">
                        {{ deatils.baseMsg.serialNumber }}
                      </div>
                    </div>
                    <div class="item-3">
                      <div class="label">账期</div>
                      <div class="text">
                        {{ deatils.baseMsg.accountPeriod }}
                      </div>
                    </div>
                    <div v-if="deatils.baseMsg.state" class="item-3">
                      <div class="label">结算状态</div>
                      <div class="text">
                        <span
                          class="tag"
                          :class="
                            deatils.baseMsg.state === '已结算'
                              ? 'check'
                              : 'uncheck'
                          "
                        >
                          {{ deatils.baseMsg.state }}
                        </span>
                      </div>
                    </div>
                    <div
                      v-if="deatils.baseMsg.settlementForm === 1"
                      class="item-3"
                    >
                      <div class="label">结算内容</div>
                      <div class="text">
                        {{ deatils.baseMsg.settlementContent }}
                      </div>
                    </div>
                    <div
                      v-if="deatils.baseMsg.settlementForm === 0"
                      class="item-3"
                    >
                      <div class="label">服务项编号：</div>
                      <div class="text">
                        {{ deatils.baseMsg.serviceId }}
                      </div>
                    </div>
                    <div
                      v-if="deatils.baseMsg.settlementForm === 0"
                      class="item-3"
                    >
                      <div class="label">服务项名称：</div>
                      <div class="text">
                        {{ deatils.baseMsg.serviceInfoName }}
                      </div>
                    </div>
                    <div class="item-3">
                      <div class="label">结算金额</div>
                      <div class="text">
                        ￥{{ deatils.baseMsg.settlementPrice }}
                      </div>
                    </div>
                    <div class="item-3">
                      <div class="label">结算类型</div>
                      <div class="text">
                        {{ deatils.baseMsg.settlementFormName }}
                      </div>
                    </div>
                    <div class="item-3">
                      <div class="label">结算方式</div>
                      <div class="text">
                        一口价
                      </div>
                    </div>
                    <div class="item-3">
                      <div class="label">结算数量</div>
                      <div class="text">
                        {{ deatils.baseMsg.orderAmount }}
                      </div>
                    </div>
                    <div class="item-3">
                      <div class="label">申请人</div>
                      <div class="text">
                        {{ deatils.baseMsg.applicant }}
                      </div>
                    </div>
                    <div class="item-3">
                      <div class="label">生成时间</div>
                      <div class="text">
                        {{
                          $moment(deatils.baseMsg.applicationTime).format(
                            'YYYY-MM-DD HH:mm:ss',
                          ) || '-'
                        }}
                      </div>
                    </div>
                    <div
                      v-if="deatils.baseMsg.state === '已结算'"
                      class="item-3"
                    >
                      <div class="label">完成人</div>
                      <div class="text">
                        {{ deatils.baseMsg.updator }}
                      </div>
                    </div>
                    <div
                      v-if="deatils.baseMsg.state === '已结算'"
                      class="item-3"
                    >
                      <div class="label">完成时间</div>
                      <div class="text">
                        {{
                          $moment(deatils.baseMsg.updateTime).format(
                            'YYYY-MM-DD HH:mm:ss',
                          ) || '-'
                        }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="order-details" style="margin-bottom: 0">
                <div class="details-item" style="padding-top: 0">
                  <div class="title-top">供应商信息</div>
                  <div class="contnet">
                    <div class="item-3">
                      <div class="label">供应商编号</div>
                      <div class="text">
                        {{ deatils.supplierMsg.supplierCode }}
                      </div>
                    </div>
                    <div class="item-3">
                      <div class="label">供应商名称</div>
                      <div class="text">
                        {{ deatils.supplierMsg.supplierName }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="order-details" style="margin-bottom: 0">
                <div class="details-item" style="padding-top: 0">
                  <div class="title-top">凭证信息</div>
                  <div class="contnet">
                    <div class="item">
                      <div class="label">我方结算主体</div>
                      <div class="text">
                        <div
                          v-for="(item, i) in deatils.proportionList"
                          :key="i"
                        >
                          <div class="proportion">
                            <el-checkbox
                              v-if="deatils.baseMsg.state !== '已结算'"
                              v-model="item.checked"
                              >{{ item.companyName }}</el-checkbox
                            >
                            <el-input
                              v-model="item.proportion"
                              :disabled="deatils.baseMsg.state === '已结算'"
                              :maxlength="3"
                              onkeyup="this.value = this.value.replace(/[^\d]/g,'');"
                              placeholder="请输入比例"
                              ><template slot="append">%</template></el-input
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="item">
                      <div class="label">汇款凭证</div>
                      <div class="text">
                        <div class="tips">
                          支持JPEG，PNG，PDF文件，不超过10M
                        </div>
                        <div class="basisDrugsDetail-img-list">
                          <div
                            v-if="deatils.baseMsg.state !== '已结算'"
                            class="basisDrugsDetail-img-list-item"
                          >
                            <div
                              v-for="(item, index) in remittanceCertificate"
                              :key="index"
                              class="img"
                              style="position: relative"
                            >
                              <i
                                class="icon-disable"
                                @click.stop="deleteImage(index)"
                              />
                              <el-image
                                style="width: 178px; height: 178px"
                                :src="item.url"
                                class="avatar"
                                :preview-src-list="fileList"
                              />
                            </div>
                            <el-upload
                              v-if="
                                remittanceCertificate &&
                                  remittanceCertificate.length < 9
                              "
                              class="avatar-uploader"
                              action=""
                              accept="image/jpeg,image/png,application/pdf"
                              :show-file-list="false"
                              :http-request="uploadHeader"
                              :before-upload="beforeAvatarUpload"
                              :disabled="deatils.baseMsg.state === '已结算'"
                            >
                              <i class="el-icon-plus avatar-uploader-icon" />
                            </el-upload>
                          </div>
                          <div v-else class="basisDrugsDetail-img-list-item">
                            <div
                              v-for="(item,
                              index) in deatils.remittanceCertificate"
                              :key="index"
                              class="img"
                              style="position: relative"
                            >
                              <el-image
                                style="width: 178px; height: 178px"
                                :src="item"
                                class="avatar"
                                :preview-src-list="
                                  deatils.remittanceCertificate
                                "
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="item">
                      <div class="label">备注</div>
                      <div class="text">
                        <el-input
                          v-model="remark"
                          type="textarea"
                           maxlength="40"
                           show-word-limit
                          autosize
                          :disabled="!editState"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div class="page-footer">
                  <el-button
                    type="primary"
                    plain
                    :loading="editLoading"
                    @click.native.prevent="changeRemark"
                    >{{ editState ? '保存备注' : '修改备注' }}</el-button
                  >
                  <el-button
                    v-if="
                      pageAuthority.includes('edit') &&
                        deatils.baseMsg.state !== '已结算'
                    "
                    class="m-auto"
                    type="primary"
                    @click="comfirm"
                  >
                    确认结算
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="scroll-table mt-24" v-if="activeName === '1'">
          <Logs :id="$route.params.id" type="113"></Logs>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import uplaodCertificate from '@/utils/uplaodCertificate2';
import { updateSettlementRemark } from '@/api/drugManage';
export default {
  name: 'SupplierSalesSettlementDetail',
  data() {
    return {
      deatils: {
        baseMsg: {
          // 基础信息
          accountPeriod: '',
          orderAmount: 0,
          serialNumber: '',
          settlementPrice: 0,
          state: ''
        },
        supplierMsg: {
          // 供应商信息
          supplierCode: '',
          supplierName: ''
        },
        settlementAccountMsgVO: {
          cardNumber: null, // 卡号
          bankOfDeposit: '' // 开户行
        }
      },
      dialogVisible: false,
      type: false,
      proportionList: [],
      res: {},
      remittanceCertificate: [], // 凭证
      isUpload: false,
      remark: '',
      editState: false,
      editLoading: false,
      fileList: [],
      mainLoading: false,
      activeName: '0',
      btns: [
        { value: '0', name: '基础信息' },
        { value: '1', name: '操作日志' }
      ]
    };
  },
  computed: {
    pageAuthority() {
      return this.$store.state.user.pageAuthority['120303'];
    }
  },
  created() {
    this.getList(this.$route.params.id);
  },
  methods: {
    handleClick(state) {
      this.activeName = state;
    },
    ...mapActions('drugManage', ['getSettleDetail', 'confirmSettlement']),
    // 获取详情
    getList(id) {
      this.mainLoading = true;
      this.getSettleDetail({
        id
      }).then(res => {
        this.mainLoading = false;
        this.deatils = res.obj;
        this.remark = res.obj.remark;
        res.obj.proportionList.forEach(item => {
          if (item.proportion > 0) {
            this.$set(item, 'checked', true);
          } else {
            this.$set(item, 'checked', false);
          }
        });
        if (res.obj.remittanceCertificate) {
          this.remittanceCertificate = res.obj.remittanceCertificate;
          this.isUpload = true;
        } else {
          this.isUpload = false;
        }
      });
    },
    // 限制图片上传
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'application/pdf';
      if (file.type === 'application/pdf') {
        this.type = true;
      } else {
        this.type = false;
      }
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isJPG) {
        this.$message.error('上传文件只能是 JPG 或 PNG 或 PDF 格式!');
      }
      if (!isLt10M) {
        this.$message.error('上传文件大小不能超过 10MB!');
      }
      return isJPG && isLt10M;
    },

    handleRemove(index) {
      this.deatils.remittanceCertificate.splice(index, 1);
      this.isUpload = false;
    },

    lookDetails() {
      this.$router.push({
        path: '/financial-center/service-item-settlement-details',
        query: { id: this.deatils.baseMsg.serialNumber }
      });
    },
    comfirm() {
      const proportionChecked = this.deatils.proportionList.find(
        item => item.checked === true,
      );
      if (!proportionChecked) {
        this.$message.warning('请选择结算主体');
        return;
      }
      const proportionIsNull = this.deatils.proportionList.find(
        item => item.checked === true && item.proportion === '',
      );

      let proportion = 0;
      this.deatils.proportionList.forEach(item => {
        if (item.checked) {
          proportion += parseInt(item.proportion);
        }
      });
      if (proportionIsNull) {
        this.$message.warning('结算比例不能为空');
        return;
      }
      if (proportion !== 100) {
        this.$message.warning('结算比例不等于100%，请修改');
        return;
      }
      if (this.remittanceCertificate.length === 0) {
        this.$message.warning('请上传汇款凭证');
        return;
      }
      const fileReqList = [];
      this.remittanceCertificate.forEach(item => {
        fileReqList.push({
          fileId: item.id,
          fileType: item.fileType,
          fileUrl: item.url
        });
      });
      const proportionReqList = [];
      this.deatils.proportionList.forEach(item => {
        if (item.checked) {
          proportionReqList.push({
            companyCode: item.companyCode,
            companyName: item.companyName,
            id: item.id,
            proportion: item.proportion,
            signedAreaId: item.signedAreaId
          });
        }
      });
      const data = {
        settlementId: this.$route.params.id,
        fileReqList,
        proportionReqList
      };
      this.confirmSettlement(data).then(() => {
        this.getList(this.$route.params.id);
        this.$message.success('操作成功！');
      });
    },
    openWindow(item) {
      window.open(item);
    },
    changeRemark() {
      if (this.editState) {
        this.editLoading = true;
        updateSettlementRemark({
          settlementId: this.$route.params.id,
          remark: this.remark
        }).then(() => {
          this.editLoading = false;
          this.editState = false;
          this.$message({
            type: 'success',
            message: '保存成功'
          });
        });
      } else {
        this.editState = true;
      }
    },
    uploadHeader(item) {
      if (this.remittanceCertificate.length >= 10) {
        this.$message.error('最多添加10张！');
        return;
      }
      this.mainLoading = true;
      uplaodCertificate(item, this.type)
        .then(res => {
          this.mainLoading = false;
          res.forEach(item => {
            this.remittanceCertificate.push(item);
            this.fileList.push(item.url);
          });
        })
        .catch(() => {
          this.mainLoading = false;
          this.$message.error('上传有误');
        });
    },
    deleteImage(index) {
      this.remittanceCertificate.splice(index, 1);
      this.fileList.splice(index, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
.settlement {
  width: 100%;
  margin: 24px auto 0;
  .card {
      width: 99%;
    background: #ffffff;
    box-shadow: rgba(158, 158, 158, 0.5) 0px 0px 5px;
    border-radius: 4px;
    margin: 24px auto 0;
    .title-top {
      padding: 0 0 30px 0;
      margin-bottom: 0;
      &.content-detail {
        padding: 30px 0 30px 0;
      }
    }
  }
  .order-details {
    display: flex;
    width: 100%;

    .details-item {
      flex: 1;
      background: #ffffff;
      border-radius: 4px;
      // padding: 36px 40px;
      .title-top {
        height: 48px;
        background: #f3f6f9;
        border: 1px solid #e8e8e8;
        width: 100%;
        font-size: 16px;

        font-weight: bold;
        color: #545473;

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
        &.content-detail {
          padding: 30px 0 30px 0;
        }
      }

      .contnet {
        display: flex;
        flex-wrap: wrap;
        .item-3 {
          width: 50%;
          height: 48px;
          line-height: 48px;
          display: flex;
          align-items: center;
          .label {
            // border: 1px solid #e8e8e8;
            // width: 204px;
            // height: 48px;
            // line-height: 48px;
            // padding-left: 32px;
            // font-size: 14px;
            // color: #333333;
              display: flex;
              align-items: center;
              min-height: 48px;
              height: 100%;
              width: 165px;
              font-weight: bold;
              padding-left: 32px;
              border: 1px solid #ebedf2;
               font-size: 14px;
          }
          .text {
            // height: 48px;
            // line-height: 48px;
            // border: 1px solid #e8e8e8;
            // flex: 1;
            // padding: 0 61px;
            font-size: 14px;
            // color: #333333;
             flex: 1;
        padding-left: 42px;
        align-items: center;
        color: #545473;
        min-height: 48px;
        height: 100%;
        border: 1px solid #ebedf2;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .check {
            color: #47cec6;
            background: rgba(71, 206, 198, 0.1);
          }
          .uncheck {
            color: #ff625e;
            background: rgba(255, 98, 94, 0.1);
          }
          .tag {
            font-size: 14px;
            width: 60px;
            height: 24px;
            border-radius: 4px;
            text-align: center;
          }
        }
        .item {
          width: 100%;
          height: auto;
          display: flex;
          align-items: stretch;
          .label {
            // display: flex;
            border: 1px solid #ebedf2;
            // width: 204px;
            // align-items: center;
            // padding-left: 32px;
            font-size: 14px;
            // color: #333333;
              display: flex;
        align-items: center;
        min-height: 48px;
        height: 100%;
        width: 165px;
        font-weight: bold;
        padding-left: 32px;
          }
          .text {
            border: 1px solid #ebedf2;
            // flex: 1;
            // padding: 15px 61px;
            font-size: 14px;
            // color: #333333;
             flex: 1;
            padding:15px 42px;
            align-items: center;
            color: #545473;
            min-height: 48px;
            height: 100%;
            .tips {
              font-size: 14px;

              font-weight: 400;
              color: #989ab3;
              line-height: 14px;
              margin-bottom: 12px;
            }
            .proportion {
              display: flex;
              align-items: center;
              margin-bottom: 12px;
              .el-checkbox {
                width: 300px;
                margin-right: 98px;
              }
              .el-input {
                width: 350px;
              }
            }
            .basisDrugsDetail-img {
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
    }
  }
  .btn-box {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 36px;
    span {
      font-size: 14px;
      color: #cccccc;
      display: block;
      margin-left: 12px;
    }
    div {
      font-size: 14px;
      color: #cccccc;
      margin-left: 12px;
    }
  }
  .reset-box {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    div {
      text-decoration: underline;
      color: #2276ff;
      font-size: 12px;
      margin-left: 12px;
      cursor: pointer;
    }
    img {
      width: 120px;
      height: 120px;
      margin: 0 12px 12px 0;
      cursor: pointer;
    }
  }
  .title-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      color: #333333;
      font-size: 16px;
      font-weight: 500;
    }
    padding-bottom: 16px;
    margin-bottom: 24px;
    border-bottom: 1px solid rgba(204, 204, 204, 0.5);
  }

  .upload {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    .flex {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .img-box {
      position: relative;
      margin: 0 12px 12px 0;
      img {
        width: 100px;
        height: 100px;
        border-radius: 4px;
        cursor: pointer;
      }
      &:hover {
        .icon-delete {
          display: block;
        }
      }
    }

    .icon-delete {
      display: none;
      width: 12px;
      height: 12px;
      position: absolute;
      top: -6px;
      right: -4px;
      background-image: url('../../../assets/icon-delete.png');
      background-size: 100% 100%;
      cursor: pointer;
    }
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .info {
    margin: 0 0 24px 12px;
  }
  .ml {
    margin-left: 85px;
    font-size: 12px;
    color: #999999;
  }
  .blue {
    color: #2276ff;
    text-decoration: underline;
  }
  .certifi {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
}
</style>
