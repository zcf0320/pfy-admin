<template>
  <div class="page-ocr-result">
    <el-container>
      <el-scrollbar
        :native="false"
        wrap-class="el-main filter-form"
        tag="main"
        :noresize="false"
      >
        <div class="title-top bord-b">识别结果</div>
        <div class="ocr-result-content">
          <div
            v-if="imgs && imgs.length > 0"
            class="ocr-result-content-l"
            v-html="imgs[0].content"
          />
          <div v-else class="ocr-result-content-l">暂无识别结果</div>
          <div class="ocr-result-content-r">
            <imgPreview :urls="imgs" />
          </div>
        </div>
      </el-scrollbar>
    </el-container>
  </div>
</template>
<script>
import imgPreview from './components/imgPreview';
export default {
  name: 'OcrResult',
  components: {
    imgPreview
  },
  data() {
    return {
      imgs: []
    };
  },
  created() {
    this.imgs = localStorage.getItem('ocrResult')
      ? JSON.parse(localStorage.getItem('ocrResult'))
      : [];
  },
  destroyed() {
    localStorage.removeItem('ocrResult');
  }
};
</script>
<style lang="scss" scoped>
.page-ocr-result {
  .bord-b {
    padding-bottom: 24px;
    box-shadow: 0px 1px 0px 0px #ebedf2;
  }
  .ocr-result-content {
    display: flex;
    &-l {
      flex: 1;
      padding: 24px;
      font-size: 14px;

      font-weight: 400;
      color: #464668;
      line-height: 21px;
      border-radius: 4px;
      border: 1px solid #ebedf2;
      word-wrap: break-word;
    }
    &-r {
      margin-left: 24px;
    }
  }
}
</style>
