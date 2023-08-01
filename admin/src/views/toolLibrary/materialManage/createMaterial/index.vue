<template>
  <div class="create-material-manage-page page-form">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main"
        tag="main"
        :noresize="false"
      >
        <div class="title-top">材料模板库</div>
        <div class="form">
          <el-form ref="baseForm" :model="baseForm" :rules="rules">
            <el-row>
              <el-col :span="8">
                <el-form-item label="材料名称：" prop="materialName">
                  <el-input
                    v-model="baseForm.materialName"
                    maxlength="20"
                    placeholder="请输入材料名称"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="说明文字：" prop="explanatoryText">
                  <el-input
                    v-model="baseForm.explanatoryText"
                    maxlength="255"
                    placeholder="请输入该材料的说明文字"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="审核要求：" prop="auditKeyPoints">
                  <el-input
                    v-model="baseForm.auditKeyPoints"
                    maxlength="255"
                    placeholder="请文字描述审核人员应该关注的点"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="文件示例：" prop="materialFile">
                  <div class="upload">
                    <el-upload
                      class="avatar-uploader"
                      action=""
                      :show-file-list="false"
                      :http-request="uploadDetailPic"
                      :before-upload="beforeAvatarUpload"
                    >
                      <img
                        v-if="baseForm.materialFile.length > 0"
                        :src="baseForm.materialFile[0]"
                        class="avatar"
                      >
                      <i v-else class="el-icon-plus avatar-uploader-icon"/>
                    </el-upload>
                    <i
                      v-if="baseForm.materialFile.length > 0 && edit"
                      class="icon-delete"
                      @click="deleteImage"
                    />
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-scrollbar>
      <div class="page-footer">
        <button type="button" class="btn-exit mr-30" @click="exit">取消</button>
        <button type="button" class="btn-save" @click="save('baseForm')">
          {{ edit ? '修改' : '保存' }}
        </button>
      </div>
    </el-container>
  </div>
</template>
<script>
// import uploadImage from '@/utils/uploadImage'
import uploadImage from '@/utils/uplaodCertificate';
export default {
  name: 'CreateMaterial',
  data() {
    return {
      baseForm: {
        materialName: '',
        explanatoryText: '',
        auditKeyPoints: '',
        materialFile: []
      },
      edit: true,
      // type为true是pdf文件
      type: false,
      filesInfo: [],
      rules: {
        materialName: [
          {
            required: true,
            message: '请输入文件名称',
            trigger: 'blur'
          },
          {
            max: 20,
            message: '长度在 0 到 20 个字符',
            trigger: 'blur'
          }
        ],
        explanatoryText: [
          { max: 255, message: '最多255个字符', trigger: 'blur' }
        ],
        auditKeyPoints: [
          { max: 255, message: '最多255个字符', trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    if (this.$route.params.type === 'add') {
      this.edit = false;
    } else {
      this.$store
        .dispatch('materalManage/detailMaterialLibrary', {
          id: this.$route.params.id
        })
        .then(res => {
          if (res.code === 0) {
            this.baseForm = Object.assign({}, res.obj);
          }
        });
    }
  },
  methods: {
    // 保存,修改
    save(baseForm) {
      this.$refs[baseForm].validate(valid => {
        if (valid) {
          if (this.$route.params.type === 'add') {
            const params = {
              ...this.baseForm,
              filesInfo: this.filesInfo
            };
            delete params.materialFile;
            this.$store
              .dispatch('materalManage/addMaterialLibrary', params)
              .then(res => {
                if (!res.code) {
                  this.$message.success(res.comment);
                  this.$router.push('/toolLibrary/materialManage');
                } else {
                  this.$message.warning(res.comment);
                }
              });
          } else {
            const params = {
              ...this.baseForm,
              filesInfo: this.filesInfo,
              id: this.$route.params.id
            };
            delete params.materialFile;
            if (params.filesInfo.length <= 0) {
              delete params.filesInfo;
            }
            this.$store
              .dispatch('materalManage/addMaterialLibrary', params)
              .then(res => {
                if (!res.code) {
                  this.$message.success(res.comment);
                  this.$router.push('/toolLibrary/materialManage');
                } else {
                  this.$message.warning(res.comment);
                }
              });
          }
        }
      });
    },
    // 文件上传
    uploadDetailPic(item) {
      const vm = this;
      uploadImage(item, this.type)
        .then(res => {
          vm.baseForm.materialFile = res.urls;
          this.filesInfo = [
            {
              fileIds: [res.id],
              fileType: res.fileType
            }
          ];
        })
        .catch(() => {
          this.$message.error('上传图片有误');
        });
    },
    // 限制图片上传
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'application/pdf';
      const isLt2M = file.size / 1024 / 1024 < 20;
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
        this.$message.error('上传文件大小不能超过 20MB!');
        return isJPG && isLt2M;
      }
      return isJPG && isLt2M;
    },
    changeEdit() {
      this.edit = !this.edit;
    },
    // 删除图片
    deleteImage() {
      this.baseForm.materialFile = [];
    },
    // 取消
    exit() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
.create-material-manage-page {
  .page-title {
    padding: 0 0 19px;
    color: #333333;
    font-weight: 500;
    border-bottom: 1px solid rgba(204, 204, 204, 0.5);
  }
  .form {
    .el-select {
      width: 100%;
    }
  }
}
.upload {
  position: relative;
  display: inline-block;
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
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
    background-image: url('../../../../assets/icon-delete.png');
    background-size: 100% 100%;
    cursor: pointer;
  }
}
</style>
