<script>
import { uploadPdf, uploadPic } from '@/api/system';
export default {
  name: 'ImgUpload',
  props: {
    accept: {
      type: String,
      default: '.pdf'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: 'div'
    },
    // 是否需要转图片
    type: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    // 点击选择图片按钮
    fileClick() {
      if (this.disabled) {
        return false;
      }
      // 触发上传input 框点击
      this.$refs.input.click();
    },
    handleFilesUpload(e) {
      const files = e.target.files;
      const fileLen = files.length;
      if (fileLen === 0) {
        return false;
      }
      this.uploadFile(files);
    },
    /**
     * 上传文件
     * files 文件列表
     */
    uploadFile(files) {
      this.$emit('update:loading', true);
      this.$emit('start');
      const formData = new FormData();
      //   const isLt2M = false;
      const file = files[0];
      const limitSize = file.size / 1024 / 1024 > 10;
      if (limitSize) {
        this.$message.error('上传文件大小不能超过 10MB!');
        return;
      }
      formData.append('file', file);

      const isPic = file.type.indexOf('image') > -1;
      // PDF是否需要转图片
      if (!isPic) {
        formData.append('type', this.type);
      }

      const uploadFile = !isPic ? uploadPdf : uploadPic;

      uploadFile(formData)
        .then(res => {
          this.$emit('update:loading', false);
          if (!res.status) {
            this.$message({
              type: 'error',
              message: '上传失败'
            });
            this.$emit('error');
            return;
          } else {
            this.$refs.input.value = null;
            let id = null;
            const data = {};
            // type 1 pic 2 pdf
            if (!isPic) {
              id = res.data.id;
              data.id = id;
              data.url = res.data.url;
              data.type = 2;
              data.name = res.data.fileName;
            } else {
              id = res.data;
              data.url = res.data;
              data.id = id;
              data.type = 1;
            }
            this.$emit('input', id);
            this.$emit('change', data);
            this.$message({
              type: 'success',
              message: '上传成功'
            });
            this.$emit('success');
          }
        })
        .catch(() => {
          this.$message({
            type: 'error',
            message: '上传失败'
          });
          this.$emit('error');
        });
      // 防止上传同一张图片不走change事件
      this.$refs.input.value = '';
    }
  },
  render(h) {
    const renderDom = [
      h('input', {
        ref: 'input',
        domProps: {
          type: 'file',
          accept: this.accept
        },
        on: {
          change: this.handleFilesUpload
        },
        style: {
          display: 'none'
        }
      }),
      this.$slots.default
    ];
    return h(
      this.tag,
      {
        on: {
          click: this.fileClick
        }
      },
      renderDom
    );
  }
};
</script>
