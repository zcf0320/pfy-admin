<template>
  <div class="certificates-modal upload-border">
    <el-dialog
      title="新增证件"
      :visible="isShow"
      width="634px"
      center
      :close-on-click-modal="closeClickModal"
      @close="closeModal"
    >
      <div class="certificates-form">
        <el-form
          ref="baseForm"
          :model="baseForm"
          :rules="rules"
          label-width="100px"
          label-position="top"
        >
          <el-row>
            <el-col :span="24">
              <el-form-item label="证件名称:" prop="type">
                <el-select
                  v-model="baseForm.type"
                  placeholder="请选择证件名称"
                  :disabled="isEdit"
                  filterable
                >
                  <el-option
                    v-for="item in credentialTypes"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="证件编号:">
                <el-input
                  v-model="baseForm.orderNumber"
                  placeholder="请输入证件编号"
                  maxlength="35"
                />
              </el-form-item>
            </el-col>
            <el-col :span="24" class="valid-box flex">
              <el-form-item label="有效期:" prop="validStartTime">
                <span
                  style="
                    position: absolute;
                    top: -35px;
                    left: 60px;
                    color: #a2a3b7;
                  "
                  >（具体日期与长期只能二选一）</span
                >
                <div class="time-box flex">
                  <el-date-picker
                    v-model="baseForm.validStartTime"
                    type="date"
                    placeholder="开始时间"
                    style="width: 190px"
                    value-format="timestamp"
                    :disabled="!ableStart"
                  />
                  <template>
                    <el-button
                      v-if="!longTermStart"
                      plain
                      class="btn"
                      :disabled="!ableStart"
                      @click="changeStart('longTermStart')"
                      >长期</el-button
                    >
                    <el-button
                      v-else
                      type="primary"
                      class="btn"
                      :disabled="ableStart"
                      @click="changeStart('longTermStart')"
                      >长期</el-button
                    >
                  </template>
                </div>
              </el-form-item>
              <span style="margin-top: -15px">-</span>
              <el-form-item prop="validEndTime" style="margin-top: 23px">
                <div class="time-box flex">
                  <el-date-picker
                    v-model="baseForm.validEndTime"
                    type="date"
                    placeholder="结束时间"
                    style="width: 190px"
                    value-format="timestamp"
                    :disabled="!ableEnd"
                  />
                  <template>
                    <el-button
                      v-if="!longTermEnd"
                      plain
                      class="btn"
                      :disabled="!ableEnd"
                      @click="changeStart"
                      >长期</el-button
                    >
                    <el-button
                      v-else
                      type="primary"
                      class="btn"
                      :disabled="ableEnd"
                      @click="changeStart"
                      >长期</el-button
                    >
                  </template>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item
                label="上传证照（扫描件加公章）"
                prop="credentityPic"
              >
                <div class="upload">
                  <!-- <UploadImg :url="baseForm.credentityPic" name="credentityPic" @changeUrl="changeUrl" @deleteImage="deleteImage"/> -->
                  <el-upload
                    class="avatar-uploader"
                    action=""
                    :show-file-list="false"
                    :http-request="uploadCredentityPic"
                    accept="image/*,application/pdf"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img
                      v-if="baseForm.credentityPic"
                      :src="baseForm.credentityPic"
                      class="avatar"
                    />
                    <i v-else class="el-icon-plus avatar-uploader-icon" />
                  </el-upload>
                  <i
                    v-if="baseForm.credentityPic"
                    class="icon-delete"
                    @click="deleteImage('credentityPic')"
                  />
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModal">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="submit('baseForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { uploadPicOrPdf } from '@/api/supplier';
export default {
  name: 'CertificatesModal',

  props: {
    isShow: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    isEdit: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      closeClickModal: false,
      baseForm: {
        type: '',
        orderNumber: '',
        timeValidity: '',
        credentityPic: '',
        validStartTime: '',
        validEndTime: ''
      },
      rules: {
        type: [
          { required: true, message: '请选择证件名称', trigger: 'change' }
        ],
        orderNumber: [
          { required: true, message: '请输入证件编号', trigger: 'blur' }
        ],
        timeValidity: [
          { required: true, message: '请选择有效期', trigger: 'change' }
        ],
        credentityPic: [
          { required: true, message: '请上传证照', trigger: 'change' }
        ]
      },
      credentialTypes: [
        { name: '营业执照', value: 0 },
        { name: '开户许可证', value: 1 },
        { name: '医疗经营许可证', value: 2 },
        { name: '医疗器械许可证', value: 3 },
        { name: '税务登记证', value: 4 },
        { name: '医疗机构许可证', value: 5 },
        { name: '互联网药品信息服务资格证', value: 6 },
        { name: '互联网药品交易服务资格证', value: 7 },
        { name: '药品经营许可证', value: 8 },
        { name: '医疗机构执业许可证', value: 9 },
        { name: '医疗器械经营许可证', value: 10 },
        { name: '医疗器械生产许可证', value: 11 },
        { name: '医疗器械网络销售备案凭证', value: 12 },
        { name: '卫生许可证', value: 13 },
        { name: '医师资格证书', value: 14 },
        { name: '医师执业证书', value: 15 },
        { name: '执业药师职业资格证书', value: 16 }
      ],
      longTermStart: false,
      longTermEnd: false,
      ableStart: true,
      ableEnd: true
    };
  },
  computed: {
    dialogWidth() {
      return window.screen.width >= 768 ? '50%' : '95%';
    }
  },
  created() {
    if (this.id) {
      this.getDetail(this.id);
    }
  },
  methods: {
    // 关闭弹框
    closeModal() {
      const vm = this;
      vm.$emit('closeModal');
    },
    // 提交
    submit(formName) {
      const vm = this;
      const params = {};
      this.baseForm.validStartUnlimited = this.longTermStart;
      this.baseForm.validEndUnlimited = this.longTermEnd;
      if (!this.baseForm.validStartTime) {
        this.baseForm.validStartUnlimited = true;
      } else {
        this.baseForm.validStartUnlimited = false;
      }
      if (!this.baseForm.validEndTime) {
        this.baseForm.validEndUnlimited = true;
      } else {
        this.baseForm.validEndUnlimited = false;
      }
      Object.assign(params, this.baseForm, this.id ? { id: this.id } : {});
      vm.$refs[formName].validate(valid => {
        if (valid) {
          vm.loading = true;
          vm.$store
            .dispatch('supplier/addCredentials', params)
            .then(res => {
              vm.loading = false;
              if (res.comment === '保存成功' || res.comment === '证件可用') {
                vm.$emit('addCertificates', res.obj, this.id);
              } else {
                vm.$message.warning('证件已使用,请上传新的证件');
              }
            })
            .catch(() => {
              vm.loading = false;
            });
        }
      });
    },
    // 详情图片上传
    uploadCredentityPic(item) {
      this.files = [];
      const { file } = item;
      const fileObj = file;
      // FormData 对象
      const fd = new FormData();
      // 文件对象
      fd.append('file', fileObj);
      if (file.type === 'application/pdf') {
        uploadPicOrPdf(fd, 1).then(res => {
          this.baseForm.credentityPic = res.data.url;
        });
      } else {
        uploadPicOrPdf(fd, 0).then(res => {
          this.baseForm.credentityPic = res.data.url;
        });
      }
    },
    // 删除图片
    deleteImage(key) {
      this.baseForm[key] = '';
    },
    // 限制图片上传
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 'image/jpg' || 'image/png' || file.type === 'application/pdf';
      const isLt2M = file.size / 1024 / 1024 < 20;
      if (!isJPG) {
        this.$message.error('上传文件只能是 JPG 或 PNG 或 PDF 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 20MB!');
      }
      return isJPG && isLt2M;
    },
    changeUrl(url) {
      this.baseForm.credentityPic = url;
    },
    changeStart(value) {
      if (value === 'longTermStart') {
        this.longTermStart = !this.longTermStart;
        this.ableStart = !this.ableStart;
        if (!this.ableStart) {
          this.baseForm.validStartTime = '';
        }
      } else {
        this.longTermEnd = !this.longTermEnd;
        this.ableEnd = !this.ableEnd;
        if (!this.ableEnd) {
          this.baseForm.validEndTime = '';
        }
      }
    },
    getDetail(id) {
      this.$store
        .dispatch('supplier/credentialDetail', {
          id
        })
        .then(res => {
          this.baseForm = res.data;
          this.baseForm.type = Number(this.baseForm.type);
          if (this.baseForm.validEndUnlimited) {
            this.longTermStart = true;
            this.ableStart = false;
          }
          if (this.baseForm.validEndUnlimited) {
            this.longTermEnd = true;
            this.ableEnd = false;
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.certificates-modal {
  .certificates-form {
    .upload {
      position: relative;
      display: inline-block;
      &:hover {
        .icon-delete {
          display: block;
        }
      }
      .icon-delete {
        display: none;
        width: 12px;
        height: 12px;
        position: absolute;
        top: -6px;
        left: 172px;
        background-image: url('../../assets/icon-delete.png');
        background-size: 100% 100%;
        cursor: pointer;
      }
    }
    .el-select {
      width: 100%;
    }
    .el-date-editor {
      width: 100%;
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
  }
  .valid-box {
    justify-content: space-between;
    align-items: center;
    .time-box {
      justify-content: flex-start;
      align-items: center;
      .btn {
        margin-left: 10px;
      }
    }
  }
}
</style>
