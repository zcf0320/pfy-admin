<template>
  <el-container>
    <el-scrollbar
      :native="false"
      wrap-class="el-main"
      tag="main"
      :noresize="false"
    >
      <div class="chinese-medicine-page">
        <Tab :btns="btns" @change="btnChange" />
        <div v-if="activeName === '1'">
          <div class="title-top content-detail">基础信息</div>
          <el-row :gutter="30">
            <el-col :span="12" class="mb-24"
              ><div class="medical-record-item">
                <span>医生姓名</span>
                <el-input
                  v-model="dossierInfo.doctorName"
                  class="medical-record-item-input"
                  placeholder="请输入医生姓名"
                  disabled
                /></div
            ></el-col>
            <el-col :span="12" class="mb-24"
              ><div class="medical-record-item">
                <span>医生ID</span>
                <el-input
                  v-model="dossierInfo.serveUserId"
                  class="medical-record-item-input"
                  placeholder="请输入医生ID"
                  disabled
                /></div
            ></el-col>
            <el-col :span="12" class="mb-24"
              ><div class="medical-record-item">
                <span>患者姓名</span>
                <el-input
                  v-model="dossierInfo.patientName"
                  class="medical-record-item-input"
                  placeholder="请输入患者姓名"
                  disabled
                /></div
            ></el-col>
            <el-col :span="12" class="mb-24"
              ><div class="medical-record-item">
                <span>患者ID</span>
                <el-input
                  v-model="dossierInfo.ucUserId"
                  class="medical-record-item-input"
                  placeholder="请输入患者ID"
                  disabled
                /></div
            ></el-col>
            <el-col :span="12" class="mb-24"
              ><div class="medical-record-item">
                <span>身份证号</span>
                <el-input
                  v-model="dossierInfo.idCard"
                  class="medical-record-item-input"
                  placeholder="请输入身份证号"
                  disabled
                /></div
            ></el-col>
            <el-col :span="12" class="mb-24"
              ><div class="medical-record-item">
                <span>年龄</span>
                <el-input
                  v-model="dossierInfo.age"
                  class="medical-record-item-input"
                  placeholder="请输入年龄"
                  disabled
                /></div
            ></el-col>
            <el-col :span="12" class="mb-24"
              ><div class="medical-record-item">
                <span>手机号码</span>
                <el-input
                  v-model="dossierInfo.mobile"
                  class="medical-record-item-input"
                  placeholder="请输入手机号码"
                  disabled
                /></div
            ></el-col>
            <el-col :span="12" class="mb-24"
              ><div class="medical-record-item">
                <span>病历ID</span>
                <el-input
                  v-model="dossierInfo.id"
                  class="medical-record-item-input"
                  placeholder="请输入病历ID"
                  disabled
                /></div
            ></el-col>
          </el-row>
          <div class="medical-record-type">
            <span>病程类型</span>
            <span
              v-for="item in diseaseCourse"
              :key="item"
              :class="
                `disease-type ${
                  dossierInfo.diseaseCourse === item ? 'active' : ''
                }`
              "
              >{{ item }}</span
            >
          </div>
          <div class="medical-record-line" />
          <div class="title-top content-detail">电子病例本</div>
          <el-row :gutter="30">
            <el-col :span="12" class="mb-24"
              ><div class="medical-record-item">
                <span>主诉</span>
                <el-input
                  v-model="dossierInfo.mainTell"
                  class="medical-record-item-input"
                  placeholder="请输入主诉"
                  disabled
                /></div
            ></el-col>
            <el-col :span="12" class="mb-24"
              ><div class="medical-record-item">
                <span>病机</span>
                <el-input
                  v-model="dossierInfo.pathogenesis"
                  class="medical-record-item-input"
                  placeholder="请输入病机"
                  disabled
                /></div
            ></el-col>
            <el-col :span="12" class="mb-24"
              ><div class="medical-record-item">
                <span>现病史</span>
                <el-input
                  v-model="dossierInfo.presentIllnessHistoryList"
                  class="medical-record-item-input"
                  placeholder="请输入现病史"
                  disabled
                /></div
            ></el-col>
            <el-col :span="12" class="mb-24"
              ><div class="medical-record-item">
                <span>既往史</span>
                <el-select
                  v-model="dossierInfo.previousHistoryList"
                  class="medical-record-item-input"
                  disabled
                  multiple
                >
                  <el-option
                    v-for="item in diseaseList"
                    :key="item.diseaseName"
                    :label="item.diseaseName"
                    :value="item.diseaseName"
                  />
                </el-select></div
            ></el-col>
            <el-col :span="12" class="mb-24"
              ><div class="medical-record-item">
                <span>过敏史</span>
                <el-input
                  v-model="dossierInfo.allergyHistory"
                  class="medical-record-item-input"
                  placeholder="请输入过敏史"
                  disabled
                /></div
            ></el-col>
            <el-col :span="12" class="mb-24"
              ><div class="medical-record-item">
                <span>治则</span>
                <el-input
                  v-model="dossierInfo.treatmentRule"
                  class="medical-record-item-input"
                  placeholder="请输入治则"
                  disabled
                /></div
            ></el-col>
            <el-col :span="12" class="mb-24"
              ><div class="medical-record-item">
                <span>查体</span>
                <el-input
                  v-model="dossierInfo.physicalExamination"
                  class="medical-record-item-input"
                  placeholder="请输入查体"
                  disabled
                /></div
            ></el-col>
            <el-col :span="12" class="mb-24"
              ><div class="medical-record-item">
                <span>西药处方</span>
                <el-input
                  v-model="prescriptionX"
                  class="medical-record-item-input"
                  placeholder="请输入西药处方"
                  disabled
                /></div
            ></el-col>
            <el-col :span="12" class="mb-24"
              ><div class="medical-record-item">
                <span>中药处方</span>
                <el-input
                  v-model="prescriptionC"
                  class="medical-record-item-input"
                  placeholder="请输入中药处方"
                  disabled
                /></div
            ></el-col>
          </el-row>
          <div class="prescription-img">
            <span>草药处方</span>
            <div class="basisDrugsDetail-img-list-item">
              <div
                v-for="(item, index) in headPic2"
                :key="index"
                class="img"
                style="position: relative"
              >
                <el-image
                  style="width: 118px; height: 118px"
                  :src="item"
                  class="avatar"
                  :preview-src-list="[item]"
                />
              </div>
              <el-upload
                v-if="headPic2 && headPic2.length < 9"
                :class="`avatar-uploader disabled`"
                action=""
                :show-file-list="false"
                :http-request="uploadHeader2"
                :before-upload="beforeAvatarUpload"
                disabled
              >
                <i class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </div>
          </div>
          <div class="prescription-img">
            <span>西药处方</span>
            <div class="basisDrugsDetail-img-list-item">
              <div
                v-for="(item, index) in headPic1"
                :key="index"
                class="img"
                style="position: relative"
              >
                <el-image
                  style="width: 118px; height: 118px"
                  :src="item"
                  class="avatar"
                  :preview-src-list="[item]"
                />
              </div>
              <el-upload
                v-if="headPic1 && headPic1.length < 9"
                :class="`avatar-uploader disabled`"
                action=""
                :show-file-list="false"
                :http-request="uploadHeader1"
                :before-upload="beforeAvatarUpload"
                disabled
              >
                <i class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </div>
          </div>
          <div class="medical-record-type">
            <span>疾病标签</span>
            <div class="type-list">
              <template
                v-if="
                  dossierInfo.illnessTagList &&
                    dossierInfo.illnessTagList.length > 0
                "
              >
                <span
                  v-for="item in dossierInfo.illnessTagList"
                  :key="item.medicineId"
                  class="disease-type active"
                  >{{ item.medicineName }}</span
                >
              </template>
              <span v-else class="disease-type">暂无标签</span>
            </div>
          </div>
          <div class="disease-content">
            <span>病情描述</span>
            <el-input
              v-model="dossierInfo.illnessDescription"
              type="textarea"
              autosize
              placeholder="请输入内容"
              class="disease-content-input"
              disabled
            />
          </div>
          <div class="medical-record-line mt-24" />
          <div class="title-top content-detail">初步诊断</div>
          <el-row :gutter="30">
            <el-col :span="12" class="mb-24"
              ><div class="medical-record-item">
                <span>西医诊断</span>
                <el-input
                  v-model="dossierInfo.westernDiagnosis"
                  class="medical-record-item-input"
                  placeholder="请输入西医诊断"
                  disabled
                /></div
            ></el-col>
            <el-col :span="12" class="mb-24"
              ><div class="medical-record-item">
                <span>中医诊断</span>
                <el-input
                  v-model="dossierInfo.tcmDiagnosis"
                  class="medical-record-item-input"
                  placeholder="请输入中医诊断"
                  disabled
                /></div
            ></el-col>
            <el-col :span="12" class="mb-24"
              ><div class="medical-record-item">
                <span>辨证论治</span>
                <el-input
                  v-model="dossierInfo.tcmSymptom"
                  class="medical-record-item-input"
                  placeholder="请输入辨证论治"
                  disabled
                /></div
            ></el-col>
          </el-row>
          <div class="prescription-img">
            <span>病历图片</span>
            <div class="basisDrugsDetail-img-list-item">
              <div
                v-for="(item, index) in headPic3"
                :key="index"
                class="img"
                style="position: relative"
              >
                <el-image
                  style="width: 118px; height: 118px"
                  :src="item"
                  class="avatar"
                  :preview-src-list="[item]"
                />
              </div>
              <el-upload
                v-if="headPic3 && headPic3.length < 9"
                :class="`avatar-uploader disabled`"
                action=""
                :show-file-list="false"
                :http-request="uploadHeader3"
                :before-upload="beforeAvatarUpload"
                disabled
              >
                <i class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </div>
          </div>
          <div class="prescription-img">
            <span>辅助检查</span>
            <div class="basisDrugsDetail-img-list-item">
              <div
                v-for="(item, index) in headPic4"
                :key="index"
                class="img"
                style="position: relative"
              >
                <el-image
                  style="width: 118px; height: 118px"
                  :src="item"
                  class="avatar"
                  :preview-src-list="[item]"
                />
              </div>
              <el-upload
                v-if="headPic4 && headPic4.length < 9"
                :class="`avatar-uploader disabled`"
                action=""
                :show-file-list="false"
                :http-request="uploadHeader4"
                :before-upload="beforeAvatarUpload"
                :disabled="true"
              >
                <i class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </div>
          </div>
          <div class="prescription-img">
            <span>舌苔图片</span>
            <div class="basisDrugsDetail-img-list-item">
              <div
                v-for="(item, index) in headPic5"
                :key="index"
                class="img"
                style="position: relative"
              >
                <i
                  v-if="isEdit"
                  class="icon-disable"
                  @click.stop="deleteImage(index, '5')"
                />
                <el-image
                  style="width: 118px; height: 118px"
                  :src="item"
                  class="avatar"
                  :preview-src-list="[item]"
                />
              </div>
              <el-upload
                v-if="headPic5 && headPic5.length < 9"
                :class="`avatar-uploader disabled`"
                action=""
                :show-file-list="false"
                :http-request="uploadHeader5"
                :before-upload="beforeAvatarUpload"
                disabled
              >
                <i class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </div>
          </div>
        </div>
        <div v-if="activeName === '2'" class="log-items">
          <div v-for="item in logList" :key="item.createTime" class="log-item">
            <div class="circle" />
            <div class="log-details">
              <span class="create-time">{{
                $moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')
              }}</span>
              <span class="color-hight">{{ peopleType[item.kind] || '' }}</span>
              <span class="color-hight">{{ item.name || '' }}</span>
              <span class="color-hight">{{
                operationType[item.operation] || ''
              }}</span>
              <span class="color-hight">{{ LogType[item.type] || '' }}</span>
              <span class="color-hight">{{ item.remark || '' }}</span>
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </el-container>
</template>
<script>
import useRecord from '@/api/useRecord';
import { uploadPicTcmImg } from '@/utils/uplaodCertificate';
import { operationType, peopleType, LogType } from '@/utils/enum';
export default {
  name: 'DetailMaterial',
  data() {
    return {
      operationType,
      peopleType,
      LogType,
      activeName: '1',
      logList: [],
      btns: [
        { value: '1', name: '电子病历' },
        { value: '2', name: '操作日志' }
      ],
      headPic1: [],
      headPic2: [],
      headPic3: [],
      headPic4: [],
      headPic5: [],
      dossierInfo: {},
      diseaseCourse: ['初诊', '复诊', '住院', '手术', '出院'],
      prescriptionX: '',
      prescriptionC: '',
      diseaseList: []
    };
  },
  created() {
    useRecord
      .getDossierInfo({ dossierId: this.$route.params.dossierId })
      .then(res => {
        this.dossierInfo = { ...res.data };
        res.data.imageList.forEach(ele => {
          if (ele.type === 1) {
            this.headPic1 = ele.imgs;
            this.prescriptionX = ele.remark;
          } else if (ele.type === 2) {
            this.headPic2 = ele.imgs;
            this.prescriptionC = ele.remark;
          } else if (ele.type === 3) {
            this.headPic3 = ele.imgs;
          } else if (ele.type === 4) {
            this.headPic4 = ele.imgs;
          } else if (ele.type === 5) {
            this.headPic5 = ele.imgs;
          }
        });
      });
  },
  methods: {
    /**
     * 按钮组change
     */
    btnChange(val) {
      const vm = this;
      vm.activeName = val;
      if (val === '2') {
        this.getLogList();
      }
    },
    getLogList() {
      useRecord
        .getLogListByTypeDocter({
          id: this.dossierInfo.serialNumber,
          type: '0'
        })
        .then(res => {
          this.logList = res.data || [];
        });
    },
    // 凭证图片
    uploadHeader1(item) {
      if (this.headPic1.length >= 9) {
        this.$message.error('最多添加9张！');
        return;
      }
      this.mainLoading = true;
      uploadPicTcmImg(item)
        .then(res => {
          this.mainLoading = false;
          this.headPic1.push(res);
        })
        .catch(() => {
          this.$message.error('上传失败');
        });
    },
    uploadHeader2(item) {
      if (this.headPic2.length >= 9) {
        this.$message.error('最多添加9张！');
        return;
      }
      this.mainLoading = true;
      uploadPicTcmImg(item)
        .then(res => {
          this.mainLoading = false;
          this.headPic2.push(res);
        })
        .catch(() => {
          this.$message.error('上传失败');
        });
    },
    uploadHeader3(item) {
      if (this.headPic3.length >= 9) {
        this.$message.error('最多添加9张！');
        return;
      }
      this.mainLoading = true;
      uploadPicTcmImg(item)
        .then(res => {
          this.mainLoading = false;
          this.headPic3.push(res);
        })
        .catch(() => {
          this.$message.error('上传失败');
        });
    },
    uploadHeader4(item) {
      if (this.headPic4.length >= 9) {
        this.$message.error('最多添加9张！');
        return;
      }
      this.mainLoading = true;
      uploadPicTcmImg(item)
        .then(res => {
          this.mainLoading = false;
          this.headPic4.push(res);
        })
        .catch(() => {
          this.$message.error('上传失败');
        });
    },
    uploadHeader5(item) {
      if (this.headPic5.length >= 9) {
        this.$message.error('最多添加9张！');
        return;
      }
      this.mainLoading = true;
      uploadPicTcmImg(item)
        .then(res => {
          this.mainLoading = false;
          this.headPic5.push(res);
        })
        .catch(() => {
          this.$message.error('上传失败');
        });
    },
    // 限制图片上传
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (file.type === 'application/pdf') {
        this.type = true;
      } else {
        this.type = false;
      }
      if (!isJPG) {
        this.$message.error('上传文件只能是 JPG 、 PNG 格式!');
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
.chinese-medicine-page {
  .medical-record-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    > span {
      font-size: 15px;

      font-weight: 400;
      color: #464668;
      line-height: 14px;
      display: inline-block;
      width: 60px;
    }
    &-input {
      flex: 1;
      margin: 0 30px 0 21px;
    }
  }
  .medical-record-line {
    box-shadow: 0px -1px 0px 0px #ebedf2;
    height: 1px;
  }
  .medical-record-type {
    display: flex;
    align-items: center;
    margin: 0 0 24px 0;
    span {
      font-size: 15px;

      font-weight: 400;
      color: #464668;
      line-height: 14px;
      margin-right: 21px;
    }
    .type-list {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
    }
    .disease-type {
      display: block;
      max-width: 150px;
      min-width: 74px;
      overflow: hidden;
      margin-bottom: 12px;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 0 10px;
      height: 38px;
      border-radius: 19px;
      font-size: 14px;

      font-weight: bold;
      line-height: 38px;
      border: 1px solid #d1d1d1;
      color: #989ab3;
      cursor: pointer;
      text-align: center;
      transition: all 0.2s;
      &:hover {
        border: 1px solid #3599fe;
        background: #e1f1ff;
        color: #3599fe;
      }
      &.active {
        background: #3599fe;
        color: #ffffff;
      }
    }
  }
  .prescription-img {
    display: flex;
    align-items: center;
    > span {
      font-size: 15px;

      font-weight: 400;
      color: #464668;
      line-height: 14px;
      margin-right: 21px;
    }
    .basisDrugsDetail-img {
      &-list {
        &-item {
          flex: 1;
          display: flex;
          flex-wrap: wrap;
          .img {
            margin-right: 24px;
            margin-bottom: 24px;
            width: 118px;
            height: 118px;
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
            width: 118px;
            height: 118px;
            line-height: 118px;
            text-align: center;
            margin-bottom: 24px;
            &:hover {
              border-color: #409eff;
            }
          }
          .avatar {
            width: 118px;
            height: 118px;
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
  .disease-content {
    display: flex;
    align-items: flex-start;
    > span {
      font-size: 15px;

      font-weight: 400;
      color: #464668;
      line-height: 31px;
      margin-right: 21px;
    }
    &-input {
      flex: 1;
    }
  }
  .medical-record-img-text {
    position: absolute;
    left: 0;
    width: 100%;
    bottom: -30px;
    font-size: 14px;

    font-weight: 400;
    color: #464668;
    line-height: 14px;
    vertical-align: middle;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  /deep/.avatar-uploader.disabled {
    cursor: no-drop;
    .el-upload.el-upload--text {
      cursor: no-drop;
    }
  }
}
</style>
