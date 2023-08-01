<template>
  <div class="insurance-content">
    <el-form
      ref="baseForm"
      label-width="100px"
      :model="baseForm"
      :rules="rules"
      label-position="top"
    >
      <el-form-item label="产品头图" prop="productHeaderImage">
        <div class="upload">
          <UploadImg
            :disabled="edit === 'detail' || postStatus !== 107"
            :url="baseForm.productHeaderImage"
            name="productHeaderImage"
            @changeUrl="changeUrl"
            @deleteImage="deleteImage"
          />
        </div>
      </el-form-item>
    </el-form>
    <div class="data-list">
      <div class="data-name data-name-border">产品特色</div>
      <div class="data-item">
        <div id="productFeature" />
      </div>
    </div>
    <div class="data-list">
      <div class="data-name data-name-border">保障方案</div>
      <div class="data-item">
        <div id="guaranteePlan" />
      </div>
    </div>
    <div class="data-list">
      <div class="data-name data-name-border">服务详情</div>
      <div class="data-item">
        <div id="serviceDetail" />
      </div>
    </div>
    <div v-if="edit === 'edit'" class="page-footer">
      <!-- 待发布 -->
      <el-button
        v-if="postStatus === 107"
        type="primary"
        @click.native.prevent="save('baseForm')"
        >保存</el-button
      >
      <Footer :id="id" :post-status="postStatus" :shield="shield" />
    </div>
  </div>
</template>
<script>
import E from 'wangeditor';
let productFeatureEditor, guaranteePlanEditor, serviceDetailEditor;
import uploadImage from '@/utils/uploadImage';
import { editorUploadImage } from '@/utils/common';
import Footer from '../footer';
export default {
  name: 'InsuranceContent',
  components: {
    Footer
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    baseForm: {
      type: Object,
      default: function() {
        return {
          productHeaderImage: '',
          productFeature: '',
          guaranteePlan: '',
          serviceDetail: ''
        };
      }
    },
    postStatus: {
      type: Number,
      default: 107
    },
    shield: {
      type: Number,
      default: 184
    },
    edit: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      rules: {
        productHeaderImage: [
          { required: true, message: '请选择产品头图', trigger: 'change' }
        ]
      }
    };
  },
  computed: {
    pageAuthority() {
      // 170101 保险产品
      return this.$store.state.user.pageAuthority['170101'];
    }
  },

  mounted() {
    // 产品特色
    productFeatureEditor = new E('#productFeature');
    // 保障方案
    guaranteePlanEditor = new E('#guaranteePlan');
    // 服务详情
    serviceDetailEditor = new E('#serviceDetail');

    this.editorList = [
      productFeatureEditor,
      guaranteePlanEditor,
      serviceDetailEditor
    ];
    this.editorList.forEach(item => {
      this.configEditor(item);
    });
    // 富文本赋值
    productFeatureEditor.txt.html(this.baseForm.productFeature);
    guaranteePlanEditor.txt.html(this.baseForm.guaranteePlan);
    serviceDetailEditor.txt.html(this.baseForm.serviceDetail);
    // this.$nextTick(function () {

    // })
  },
  methods: {
    configEditor(editor) {
      editor.customConfig.menus = [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'image', // 插入图片
        'table', // 表格
        'code', // 插入代码
        'undo', // 撤销
        'redo' // 重复
      ];
      editor.customConfig.customUploadImg = function(files, insert) {
        // files 是 input 中选中的文件列表
        editorUploadImage(files)
          .then(res => {
            // insert 是获取图片 url 后，插入到编辑器的方法
            insert(res);
          })
          .catch(() => {
            this.$message.error('上传图片有误');
          });
      };

      editor.customConfig.zIndex = 1;

      editor.create();
    },
    // 限制图片上传
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 20;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 20MB!');
      }
      return isJPG && isLt2M;
    },
    // 宣传头像上传
    uploadHeaderImage(item) {
      const vm = this;
      uploadImage(item)
        .then(res => {
          vm.baseForm.productHeaderImage = res;
        })
        .catch(() => {
          this.$message.error('上传图片有误');
        });
    },
    // 保存
    save(formName) {
      const vm = this;
      vm.$refs[formName].validate(valid => {
        if (valid) {
          vm.baseForm.productFeature = productFeatureEditor.txt.html();
          vm.baseForm.guaranteePlan = guaranteePlanEditor.txt.html();
          vm.baseForm.serviceDetail = serviceDetailEditor.txt.html();

          vm.$store
            .dispatch('insuranceProducts/updateContent', {
              insuranceProductId: vm.id,
              ...vm.baseForm
            })
            .then(res => {
              if (!res.code) {
                vm.$message.success(res.comment);
              } else {
                vm.$message.warning(res.comment);
              }
            });
        }
      });
    },
    // 图片上传地址
    changeUrl(name, url) {
      this.baseForm[name] = url;
    },
    // 删除图片
    deleteImage(key) {
      this.baseForm[key] = '';
    }
  }
};
</script>
<style lang="scss" scoped>
.insurance-content {
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
  .data-list {
    margin-bottom: 20px;
    .data-name {
      margin-bottom: 10px;
    }
  }
}
</style>
