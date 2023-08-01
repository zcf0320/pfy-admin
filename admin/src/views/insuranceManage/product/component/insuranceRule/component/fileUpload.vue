<template>
  <el-upload
    class="avatar-uploader"
    :headers="{
      Authorization: Cookies.get('Authorization'),
    }"
    :action="baseUrl"
    :limit="limit"
    :data="{
      type: true,
    }"
    :accept="accept"
    :file-list="fileList"
    :on-remove="handleRemove"
    :before-upload="beforeAvatarUpload"
    :on-success="onSuccess"
    :before-remove="beforeRemove"
    :disabled="disabled"
  >
    <!--  :http-request="uploadPropogandaPic" -->
    <el-button size="small" type="primary" :disabled="isDisabled"
      >点击上传</el-button
    >
    <div slot="tip" class="el-upload__tip">{{ tip }}</div>
  </el-upload>
</template>

<script>
import Cookies from 'js-cookie';
import { uploadPdf, uploadPic } from '@/api/system';
import { string } from 'jszip/lib/support';
export default {
  name: 'fileUpload',
  props: {
    type: {
      type: Boolean,
      default: true
    },
    tip: string,
    accept: {
      type: String,
      default: '.pdf'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 1
    },
    dataList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      baseUrl: this.$enums['basePdfUrl'],
      Cookies,
      fileList: [],
      files: []
    };
  },
  computed: {
    isDisabled() {
      return this.files.length >= this.limit || this.disabled;
    }
  },
  watch: {
    dataList: {
      handler(val) {
        if (val) {
          this.files = this.$extends([], this.dataList);
        }
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    this.fileList = this.$extends([], this.dataList);
  },
  methods: {
    beforeAvatarUpload(file) {
      const isPDF = file.type === 'application/pdf';
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 10MB!');
      }
      if (!isPDF) {
        this.$message.error('上传头像图片只能是 PDF 格式!');
      }
      return isLt2M && isPDF;
    },
    // 文件上传
    uploadPropogandaPic(files) {
      if (this.isDisabled) {
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 10MB!');
        return false;
      }
      const file = files.file;
      const formData = new FormData();
      formData.append('file', file);
      const isPic = file.type.indexOf('image') > -1;
      // PDF是否需要转图片
      if (!isPic) {
        formData.append('type', this.type);
      }
      const uploadFile = !isPic ? uploadPdf : uploadPic;
      uploadFile(formData).then(res => {
        if (res.status) {
          let id = null;
          const data = {};
          if (isPic) {
            id = res.data.data;
            data.url = res.data.data;
            data.id = id;
            data.type = 1;
            data.name = file.name;
          } else {
            id = res.data.data.id;
            data.id = id;
            data.url = res.data.data.url;
            data.type = 2;
            data.name = res.data.data.fileName;
          }
          this.files.push(data);
          this.$emit('input', id);
          this.$emit('change', data);
        }
      });
    },
    handleRemove(file, fileList) {
      // 删除的钩子函数
      if (file.status === 'success') {
        this.files = fileList;
        this.$emit('del', file);
      }
    },
    beforeRemove(file) {
      if (file.status === 'success') {
        return this.$confirm(`确定移除 ${file.name}？`);
      } else {
        return true;
      }
    },
    onSuccess(res) {
      if (res) {
        let id = null;
        const data = {};
        id = res.data.id;
        data.id = id;
        data.url = res.data.url;
        data.name = res.data.fileName;
        this.files.push(data);
        this.$emit('input', id);
        this.$emit('change', data);
      }
    }
  }
};
</script>

<style scoped lang="scss"></style>
