<template>
  <div>
    <div v-if="materialMsgList.length" class="title-top pt-0 pl-0 flex">
      <span class="w-100 mr-48">图片分类</span>
      <span>图片</span>
    </div>
    <div v-if="$isEmpty(materialMsgList)" class="empty-img" />
    <div>
      <div v-for="(item, index) in materialMsgList" :key="index" class="mb-24">
        <div class="flex imgsBox">
          <div class="mr-48 w-100 flex-shrink">{{ item.materialName }}</div>

          <!-- <imgs :urls="$isEmpty(item.materialImgs)? []:item.materialImgs"></imgs> -->
          <div
            v-if="item.materialId !== '12' && $isNotEmpty(item.materialImgs)"
            class="flex-wrap"
          >
            <div
              v-for="(url, idx) in item.materialImgs"
              :key="idx"
              class="img-item"
            >
              <div v-if="url.status" class="img-status flex-box">
                <div class="icon-success" />
                <div class="success-tips ml-6">识别成功</div>
              </div>
              <div v-else class="img-status flex-box">
                <div class="icon-error" />
                <div class="error-tips ml-6">识别失败</div>
              </div>
              <el-image :src="url.img" :preview-src-list="[url.img]" />
            </div>
          </div>
          <div v-else class="flex-wrap">
            <a target="_blank" :href="item.materialImgs[0].img"
              ><button type="button" class="btn-save">下载通知书</button></a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'allTab',
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      materialMsgList: []
    };
  },
  computed: {},
  created() {
    this.initData();
  },
  methods: {
    ...mapActions('auditRecords', ['findFurtherInformation']),
    async initData() {
      const res = await this.findFurtherInformation(this.id);
      if (res) {
        this.$emit('change', res.data.flag);
        if (this.$isNotEmpty(res.data.materialMsgList)) {
          this.materialMsgList = res.data.materialMsgList;
          this.$emit('imgs', res.data.materialMsgList);
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.imgsBox {
  .img-item {
    width: 100px;
    height: 100px;
    margin: 0px 30px 30px 0px;
    position: relative;
    .icon-status {
      position: absolute;
      right: -9px;
      top: -9px;
      height: 18px;
      width: 18px;
      background-image: url('../../../../assets/ocr_success.png');
      background-size: 100% 100%;
      z-index: 10;
      &.error {
        background-image: url('../../../../assets/ocr_error.png');
      }
    }

    img {
      width: 100%;
      height: 100%;
      display: inline-block;
    }
    .el-image {
      width: 100px;
      height: 100px;
    }
  }
  .img-status {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30px;
    background: rgba(0, 0, 0, 0.5);
    padding: 6px 10px;
    z-index: 10;
    &.curent {
      cursor: pointer;
    }
    .error-tips {
      font-size: 14px;
      color: #f64e60ff;
    }
    .success-tips {
      font-size: 14px;
      color: #18c4bd;
    }
  }
}
</style>
