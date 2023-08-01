<template>
  <div class="signature-wrap">
    <div class="button-wrap">
      <div class="button-flex" @click="preview">
        <img src="../../../../../assets/preview.png" />协议预览
      </div>
      <div
        v-show="edit !== 'detail' && postStatus === 107"
        class="button-flex"
        @click="backEdit"
      >
        <img src="../../../../../assets/back-edit.png" />返回修改
      </div>
    </div>

    <div class="carousel-wrap">
      <el-carousel
        indicator-position="none"
        height="344px"
        trigger="click"
        :autoplay="false"
        :initial-index="imgList.length - 1"
        @change="changeImg"
      >
        <el-carousel-item v-for="(item, index) in imgList" :key="index">
          <div class="custom-carousel">
            <el-image
              fit="scale-down"
              style="width:229px;height:100%"
              :src="item"
            />
            <VueDragResize
              v-show="index === imgList.length - 1"
              :parent-w="230"
              :parent-h="344"
              parent-limitation
              :x="x"
              :y="y"
              :z="999"
              :is-resizable="false"
              :is-active="true"
              :w="81"
              :h="28"
              @dragging="resize"
            >
              <img width="81px" height="28px" :src="signatureIcon" />
            </VueDragResize>
          </div>
        </el-carousel-item>
      </el-carousel>
      <div class="tips">拖动“签名占位”</div>
    </div>
    <div class="img-count">{{ current }} / {{ imgList.length }}</div>
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      center
      width="80%"
      destroy-on-close
    >
      <div class="viewer">
        <el-carousel
          height="688px"
          indicator-position="none"
          type="card"
          trigger="click"
          :autoplay="false"
          :initial-index="imgList.length - 1"
        >
          <el-carousel-item v-for="(item, index) in imgList" :key="index">
            <div class="custom-carousel">
              <el-image
                fit="scale-down"
                style="width:458px;height:100%;border:1px solid #cccccc"
                :src="item"
              />
              <VueDragResize
                v-show="index === imgList.length - 1"
                :x="left * 2"
                :y="top * 2"
                :z="999"
                :is-resizable="false"
                :is-draggable="false"
                :is-active="true"
                :w="81"
                :h="28"
              >
                <img width="81px" height="28px" :src="signatureIcon" />
              </VueDragResize>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import VueDragResize from 'vue-drag-resize';
import signatureIcon from '@/assets/signature.png';

export default {
  name: 'upload-protocal-signature',
  components: {
    VueDragResize
  },
  props: {
    edit: {
      type: String,
      default: ''
    },
    imgList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    x: {
      type: [Number],
      default: 135
    },
    y: {
      type: [Number],
      default: 305
    },
    postStatus: {
      type: Number,
      default: 107
    }
  },
  data() {
    return {
      signatureIcon,
      width: 0,
      height: 0,
      top: this.y,
      left: this.x,
      current: this.imgList.length,
      dialogVisible: false
    };
  },
  methods: {
    backEdit() {
      this.$emit('back');
    },
    preview() {
      this.dialogVisible = true;
    },
    resize(newRect) {
      this.width = newRect.width;
      this.height = newRect.height;
      this.top = newRect.top;
      this.left = newRect.left;
      this.$emit('dragChange', newRect);
    },
    changeImg(current) {
      this.current = current + 1;
    }
  }
};
</script>
<style lang="scss" scoped>
.signature-wrap {
  padding: 16px;
  position: relative;
  .button-wrap {
    position: absolute;
    top: 16px;
    right: 16px;
    .button-flex {
      display: flex;
      align-items: center;
      font-weight: 500;
      color: #3599fe;
      font-size: 16px;
      margin-bottom: 16px;
      cursor: pointer;
      img {
        width: 16px;
        height: 16px;
        margin-right: 6px;
      }
      &:nth-child(2) {
        margin-bottom: 0;
      }
    }
  }

  .carousel-wrap {
    width: 360px;
    margin: 0 auto;
    .custom-carousel {
      position: relative;
      width: 229px;
      background: #ffffff;
      height: 344px;
      margin: 0 auto;
    }
    /deep/ .el-carousel__arrow {
      width: 32px;
      height: 32px;
      border-radius: 0;
      display: block;
      background-color: transparent;
      &.el-carousel__arrow--left {
        display: block !important;
        background: url('../../../../../assets/carousel-pre.png') no-repeat;
        background-size: contain;
      }
      &.el-carousel__arrow--right {
        display: block !important;
        background: url('../../../../../assets/carousel-next.png') no-repeat;
        background-size: contain;
      }
    }
    .tips {
      margin-top: 8px;
      font-size: 14px;
      text-align: center;
      font-weight: 400;
      color: #a2a3b7;
    }
  }

  .img-count {
    position: absolute;
    bottom: 0;
    right: 16px;
    font-size: 14px;
    color: #464668;
  }
}
.viewer {
  margin: 0 auto;
  .custom-carousel {
    width: 458px;
    height: 688px;
    position: relative;
    margin: 0 auto;
  }
}
</style>
