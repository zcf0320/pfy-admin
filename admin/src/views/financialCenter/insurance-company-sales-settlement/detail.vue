<template>
  <div class="el-container">
    <div class="el-main">
      <div class="flex-col">
        <Tab :btns="btns" @change="handleClick" />
        <div class="scroll-table" v-if="activeName === '0'">
          <div class="company-settlement-page">
            <div class="title-top">
              结算单详情<button
                type="button"
                class="btn-save fr"
                @click="toSettlementDetail"
              >
                查看结算明细
              </button>
            </div>
            <div class="basisDrugsDetail-table">
              <div class="basisDrugsDetail-table-title">基础信息</div>
              <div class="basisDrugsDetail-table-four">
                <div class="basisDrugsDetail-table-four-l">
                  <div class="basisDrugsDetail-type">结算单编号</div>

                  <div class="basisDrugsDetail-detail">
                    {{ settlementObj.bizNo || '-' }}
                  </div>
                </div>
                <div class="basisDrugsDetail-table-four-r">
                  <div class="basisDrugsDetail-type">结算帐期</div>

                  <div class="basisDrugsDetail-detail">
                    {{ settlementObj.settlementMonth || '-' }}
                  </div>
                </div>
              </div>
              <div class="basisDrugsDetail-table-four">
                <div class="basisDrugsDetail-table-four-l">
                  <div class="basisDrugsDetail-type">结算状态</div>

                  <div class="basisDrugsDetail-detail">
                    {{ settlementObj.settlementStatus ? '已结算' : '待结算' }}
                  </div>
                </div>
                <div class="basisDrugsDetail-table-four-r">
                  <div class="basisDrugsDetail-type">结算方式</div>

                  <div class="basisDrugsDetail-detail">
                    {{ settlementObj.pricingMethod | fliterSettle }}
                  </div>
                </div>
              </div>
              <div class="basisDrugsDetail-table-four">
                <div class="basisDrugsDetail-table-four-l">
                  <div class="basisDrugsDetail-type">申请人</div>

                  <div class="basisDrugsDetail-detail">
                    {{ settlementObj.appName || '-' }}
                  </div>
                </div>
                <div class="basisDrugsDetail-table-four-r">
                  <div class="basisDrugsDetail-type">申请时间</div>

                  <div class="basisDrugsDetail-detail">
                    {{
                      settlementObj.createTime
                        ? $moment(settlementObj.createTime).format(
                            'YYYY-MM-DD HH:mm:ss',
                          )
                        : '-'
                    }}
                  </div>
                </div>
              </div>
              <div class="basisDrugsDetail-table-four">
                <div class="basisDrugsDetail-table-four-l">
                  <div class="basisDrugsDetail-type">结算金额</div>

                  <div class="basisDrugsDetail-detail">
                    ￥{{ settlementObj.sumMoney || '-' }}
                  </div>
                </div>
                <div class="basisDrugsDetail-table-four-r">
                  <div class="basisDrugsDetail-type">完成时间</div>

                  <div class="basisDrugsDetail-detail">
                    {{
                      settlementObj.finishTime
                        ? $moment(settlementObj.finishTime).format(
                            'YYYY-MM-DD HH:mm:ss',
                          )
                        : '-'
                    }}
                  </div>
                </div>
              </div>
              <div class="basisDrugsDetail-table-four">
                <div class="basisDrugsDetail-table-four-l">
                  <div class="basisDrugsDetail-type">完成人</div>

                  <div class="basisDrugsDetail-detail">
                    {{ settlementObj.finisherName || '-' }}
                  </div>
                </div>
                <div class="basisDrugsDetail-table-four-r" >
                   <div class="basisDrugsDetail-type"></div>

                  <div class="basisDrugsDetail-detail">
                  </div>
                </div>
              </div>
              <div class="basisDrugsDetail-table-title">保险公司信息</div>
              <div class="basisDrugsDetail-table-four">
                <div class="basisDrugsDetail-table-four-l">
                  <div class="basisDrugsDetail-type">保司编号</div>

                  <div class="basisDrugsDetail-detail">
                    {{ settlementObj.companyCode || '-' }}
                  </div>
                </div>
                <div class="basisDrugsDetail-table-four-r">
                  <div class="basisDrugsDetail-type">保司名称</div>

                  <div class="basisDrugsDetail-detail">
                    {{ settlementObj.companyName || '-' }}
                  </div>
                </div>
              </div>
              <!-- <div class="basisDrugsDetail-table-four">
            <div class="basisDrugsDetail-table-four-l">
              <div class="basisDrugsDetail-type">承保机构</div>

              <div class="basisDrugsDetail-detail">{{settlementObj.bizNo || "-"}}</div>
            </div>
            <div class="basisDrugsDetail-table-four-r"></div>
          </div> -->
              <div class="basisDrugsDetail-table-title">凭证信息</div>
              <!-- <div class="basisDrugsDetail-table-four">
            <div class="basisDrugsDetail-table-four-l">
              <div class="basisDrugsDetail-type">开户行</div>

              <div class="basisDrugsDetail-detail">
                {{ settlementObj.accountBank || '-' }}
              </div>
            </div>
            <div class="basisDrugsDetail-table-four-r">
              <div class="basisDrugsDetail-type">银行账号</div>
              <div class="basisDrugsDetail-detail">
                {{ settlementObj.bankNumber || '-' }}
              </div>
            </div>
          </div> -->
              <div class="basisDrugsDetail-table-two">
                <div class="basisDrugsDetail-table-two-l">我方结算主体</div>
                <div class="basisDrugsDetail-table-two-r">
                  <div
                    v-for="item in settlementObj.settlementMainRatioList"
                    :key="item.id"
                    class="settle-body flex"
                  >
                    <div class="name">{{ item.companyName }}</div>
                    <el-input
                      v-model="item.ratioNumber"
                      placeholder="-"
                      style="width: 351px"
                      :disabled="!editState"
                    />%
                  </div>
                </div>
              </div>
              <div class="basisDrugsDetail-table-two">
                <div class="basisDrugsDetail-table-two-l">汇款凭证</div>
                <div class="basisDrugsDetail-table-two-r">
                  <div class="tips">支持JPEG，PNG，PDF文件，不超过10M</div>
                  <div class="basisDrugsDetail-img-list">
                    <div class="basisDrugsDetail-img-list-item">
                      <div
                        v-for="(item, index) in headPic"
                        :key="index"
                        class="img"
                        style="position: relative"
                      >
                        <i
                          v-if="editState"
                          class="icon-disable"
                          @click.stop="deleteImage(index)"
                        />
                        <el-image
                          style="width: 178px; height: 178px"
                          :src="item[0]"
                          class="avatar"
                          :preview-src-list="item"
                        />
                      </div>
                      <el-upload
                        v-if="editState && headPic && headPic.length < 9"
                        :class="
                          `avatar-uploader ${!editState ? 'disable' : ''}`
                        "
                        action=""
                        :show-file-list="false"
                        :http-request="uploadHeader"
                        :before-upload="beforeAvatarUpload"
                        :disabled="!editState"
                      >
                        <i class="el-icon-plus avatar-uploader-icon" />
                      </el-upload>
                    </div>
                  </div>
                </div>
              </div>
              <div class="basisDrugsDetail-table-two">
                <div class="basisDrugsDetail-table-two-l">备注</div>
                <div class="basisDrugsDetail-table-two-r">
                  <el-input
                    v-model="remark"
                    type="textarea"
                     maxlength="40"
                     show-word-limit
                   :autosize="{ minRows: 2, maxRows: 5 }"
                    :disabled="!editState"
                  />
                </div>
              </div>
            </div>
            <div class="page-footer">
              <el-button
                type="primary"
                plain
                :loading="editLoading"
                @click.native.prevent="changeRemark"
                >{{ editState ? '保存' : '修改' }}</el-button
              >
            </div>
          </div>
        </div>
        <div class="scroll-table mt-24" v-if="activeName === '1'">
          <Logs :id="$route.params.id" type="112"></Logs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import uploadImage from '@/utils/uplaodCertificate';
export default {
  name: 'PolicySettlementDetail',
  filters: {
    fliterSettle(type) {
      if (type === 1) {
        return '按固定金额';
      } else if (type === 2) {
        return '按固定比例';
      } else if (type === 4) {
        return '一口价';
      } else {
        return '-';
      }
    }
  },
  data() {
    return {
      mainLoading: false,
      headPic: [], // 凭证
      saveState: false, // 编辑状态
      type: false, // PDF,img
      closeClickModal: false,
      settlementObj: {},
      remark: '',
      editState: false,
      editLoading: false,
      activeName: '0',
      btns: [
        { value: '0', name: '基础信息' },
        { value: '1', name: '操作日志' }
      ]
    };
  },
  computed: {
    pageAuthority() {
      return this.$store.state.user.pageAuthority['120201'];
    }
  },
  created() {
    this.getData();
  },
  methods: {
    handleClick(state) {
      this.activeName = state;
    },
    changeRemark() {
      if (this.editState) {
        this.editLoading = true;
        this.$store
          .dispatch('insuranceCompany/updateInsuranceSales', {
            id: this.$route.params.id,
            urlList: this.headPic,
            settlementMainRatioList: this.settlementObj.settlementMainRatioList,
            remark: this.remark
          })
          .then(() => {
            this.editLoading = false;
            this.editState = false;
            this.$message({
              type: 'success',
              message: '保存成功'
            });
            this.getData();
          })
          .catch(() => {
            this.editLoading = false;
          });
      } else {
        this.editState = true;
      }
    },
    toSettlementDetail() {
      localStorage.setItem('settlementId', this.settlementObj.bizNo);
      this.$router.push('/financial-center/policy-settlement-details');
    },
    save() {
      this.$store
        .dispatch('insuranceCompany/updateInsuranceSales', {
          id: this.$route.params.id,
          urlList: this.headPic,
          settlementMainRatioList: this.settlementObj.settlementMainRatioList
        })
        .then(() => {
          this.$message({
            type: 'success',
            message: '保存成功'
          });
          this.getData();
          this.close();
        });
    },
    getData() {
      this.$store
        .dispatch(
          'insuranceCompany/getInsuranceSalesDetail',
          this.$route.params.id,
        )
        .then(res => {
          if (res.data) {
            this.settlementObj = res.data;
            this.headPic = res.data.certificatePicUrlList || [];
            this.mainLoading = false;
            this.saveState = !!res.data.settlementStatus;
            this.remark = res.data.remark;
            if (this.settlementObj.settlementMainRatioList) {
              if (
                this.settlementObj.settlementMainRatioList[0].ratioNumber ===
                  null &&
                this.settlementObj.settlementMainRatioList[1].ratioNumber ===
                  null &&
                this.settlementObj.settlementMainRatioList[2].ratioNumber ===
                  null
              ) {
                this.settlementObj.settlementMainRatioList[0].ratioNumber = 100;
              }
            }
          }
        });
    },
    sureSettlement() {
      const data = this.settlementObj.settlementMainRatioList;
      let flag = false;
      for (const i in data) {
        if (data[i].ratioNumber) {
          flag = true;
        }
      }
      if (!flag) {
        this.$message.error('结算比例不能为空');
        return;
      }
      let total = 0;
      for (const i in data) {
        if (data[i].ratioNumber) {
          total += Number(data[i].ratioNumber);
        }
      }
      if (total !== 100) {
        this.$message.error('结算比例不等于100%，请修改');
        return;
      }
      if (!this.headPic || this.headPic.length <= 0) {
        this.$message.error('请上传汇款凭证');
        return;
      }
      this.closeClickModal = true;
    },
    deleteImage(index) {
      this.headPic.splice(index, 1);
    },
    // 凭证图片
    uploadHeader(item) {
      if (this.headPic.length >= 9) {
        this.$message.error('最多添加9张！');
        return;
      }
      this.mainLoading = true;

      uploadImage(item, this.type)
        .then(res => {
          this.mainLoading = false;
          if (this.type) {
            res.urls.forEach(item => {
              this.headPic.push([item]);
            });
          } else {
            this.headPic.push(res.urls);
          }
        })
        .catch(() => {
          this.$message.error('上传失败');
        });
    },
    // 限制图片上传
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'application/pdf';
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (file.type === 'application/pdf') {
        this.type = true;
      } else {
        this.type = false;
      }
      if (!isJPG) {
        this.$message.error('上传文件只能是 JPG 、 PNG 或 PDF 格式!');
        return isJPG && isLt2M;
      }
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 10MB!');
        return isJPG && isLt2M;
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="scss" scoped>
.company-settlement-page {
  margin: 24px auto 0;
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
        // width: 204px;
        width: 165px;
        font-weight: bold;
        padding-left: 32px;
        border-right: 1px solid #e8e8e8;
        display: flex;
        align-items: center;
      }
      &-r {
        flex: 1;
        // padding: 15px 61px;
         padding:15px 61px 15px 42px;
        .tips {
          font-size: 14px;

          font-weight: 400;
          color: #989ab3;
          line-height: 14px;
          margin-bottom: 12px;
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
  .sure-settlement-dialog {
    font-size: 14px;

    font-weight: bold;
    color: #464668;
    line-height: 14px;
    margin-bottom: 24px;
  }
  .sure-settlement-dialog-item {
    font-size: 14px;

    font-weight: 400;
    color: #464668;
    line-height: 14px;
    margin-bottom: 16px;
  }
  .basisDrugsDetail-img {
    &-list {
      &-item {
        display: flex;
        flex-wrap: wrap;
        .img {
          margin-right: 24px;
          margin-bottom: 24px;
          width: 82px;
          height: 82px;
        }
      }
    }
  }
  .settle-body {
    justify-content: flex-start;
    align-items: center;
    .name {
      width: 361px;
    }
  }
}
</style>
