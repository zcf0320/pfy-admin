<template>
  <div :ref="richId"/>
</template>
<script>
import E from 'wangeditor';
import { editorUploadImage } from '@/utils/common';
export default {
  name: 'RichText',
  props: {
    content: {
      type: String,
      default: ''
    },
    richId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      editor: null
    };
  },
  mounted() {
    const editor = new E(this.$refs[this.richId]);
    editor.customConfig.uploadImgServer = `${process.env.VUE_APP_BASE_API}/sys/uploadPic`; // 上传图片到服务器
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
    editor.customConfig.zIndex = 1;
    editor.customConfig.uploadImgShowBase64 = true;
    editor.customConfig.onchange = newHtml => {
      // 获取最新的 html 内容
      this.$emit('change', newHtml);
    };
    editor.create();
    this.editor = editor;
    this.setEditorHtml(this.content);
  },
  methods: {
    setEditorHtml(text) {
      this.editor.txt.html(text);
    }
  }
};
</script>
<style lang="scss" scoped></style>
