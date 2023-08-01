<template>
  <div class="page-form upload-img upload-border">
    <el-upload
      ref="fileUpload"
      class="avatar-uploader"
      accept="image/*"
      name="pic"
      action=""
      :data="uploadData"
      :on-change="selectChange"
      :show-file-list="false"
      :auto-upload="false"
      :http-request="httpRequest"
      :disabled="disabled"
    >
      <div class="upload">
        <img v-if="url" :src="url" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon" />
      </div>
    </el-upload>
    <div v-if="size" slot="tip" class="upload-img-tip">
      <div>图片比例 {{ proportion }}</div>
      <div>建议尺寸 {{ size }}px</div>
    </div>
    <i v-if="url && !disabled" class="icon-delete" @click="deleteImage" />
    <Cropper
      v-if="showCropper"
      :dialog-visible="showCropper"
      :cropper-img="cropperImg"
      @update-cropper="updateCropper"
      @colse-dialog="closeDialog"
      @upload-img="uploadImg"
    />
  </div>
</template>

<script>
import uploadImage from '@/utils/uploadImage';
import { blobToFile } from '@/utils/file';
export default {
  name: 'UploadImg',
  props: {
    url: {
      type: String,
      default: () => {
        return '';
      }
    },
    name: {
      type: String,
      default: () => {
        return '';
      }
    },
    size: {
      type: String,
      default: () => {
        return '';
      }
    },
    proportion: {
      type: String,
      default: () => {
        return '1:1';
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      uploadData: {
        // 上传需要的额外参数
        siteId: 1,
        source: 1,
        fileName: ''
      },
      action: '', // 上传地址，必填
      cropperImg: '', // 需要裁剪的图片
      showCropper: false, // 是否显示裁剪框
      uploadFile: '', // 裁剪后的文件
      resultImg: '', // 上传成功，后台返回的路径
      selectFile: {}
    };
  },
  methods: {
    // 上传触发,Blob转文件上传
    httpRequest(item) {
      const { file } = item;
      // Blob转文件
      const files = blobToFile(this.uploadFile, file);
      if (this.showCropper) {
        uploadImage({
          file: files
        })
          .then(res => {
            this.$emit('changeUrl', this.name, res);
            this.showCropper = false;
          })
          .catch(() => {
            this.$message.error('上传图片有误');
          });
      }
    },
    // 选择文件
    selectChange(file) {
      const { raw, name } = file;
      // 记录选择的图片,用于之后裁剪生成上传图片的name和type
      this.selectFile = raw;
      this.openCropper(raw);
      this.uploadData.fileName = name;
    },
    /**
     * @param {file} 上传的文件
     */
    openCropper(file) {
      const files = file;
      const isJPG = file.type === 'image/jpeg' || 'image/jpg' || 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 20;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
        return;
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 20MB!');
        return;
      }
      const reader = new FileReader();
      reader.onload = e => {
        let data;
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        this.cropperImg = data;
      };
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(files);
      this.showCropper = true;
    },
    // 上传图片
    uploadImg(uploadFile) {
      this.uploadFile = uploadFile;
      // Blob转文件
      const files = blobToFile(this.uploadFile, this.selectFile);

      uploadImage({
        file: files
      })
        .then(res => {
          this.$emit('changeUrl', this.name, res);
          this.showCropper = false;
        })
        .catch(() => {
          this.$message.error('上传图片有误');
        });

      // 单次触发submit可以,上传之后修改触发submit会造成多次上传
      // this.$refs.fileUpload.submit();
    },
    // 更新图片
    updateCropper() {
      this.$refs.fileUpload.$children[0].$el.click();
    },
    // 关闭窗口
    closeDialog() {
      this.showCropper = false;
    },
    // 删除图片
    deleteImage() {
      this.$emit('deleteImage', this.name);
    }
  }
};
</script>

<style lang="scss" scoped>
.upload-img {
  width: 178px;
  height: 178px;
  position: relative;
  .upload {
    display: inline-block;
    width: 178px;
    height: 178px;
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
  &:hover {
    .icon-delete {
      display: block;
    }
  }
  .upload-img-tip {
    position: absolute;
    width: 200px;
    top: 50%;
    left: 208px;
    transform: translate(0, -50%);
    color: #46456b;
    font-size: 14px;
  }
}
</style>
