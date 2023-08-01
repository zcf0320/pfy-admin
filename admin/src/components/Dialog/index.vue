<template>
  <el-dialog
    :top="top"
    :show-close="false"
    :fullscreen="fullscreen"
    :width="dialogWidth + 'px'"
    v-bind="$attrs"
    :custom-class="'dialog-class'"
    v-on="$listeners"
  >
    <slot slot="title" name="title" />
    <el-scrollbar
      :style="{ height: bodyHeight + 'px' }"
      :native="false"
      tag="div"
      :noresize="false"
      wrap-class="pr-16"
    >
      <!-- 内容显示区域 -->
      <slot :bodyHeight="bodyHeight" />
    </el-scrollbar>
    <div
      class="icon-close dialog-close"
      @click="
        () => {
          $emit('closed');
        }
      "
    >
      <img src="../../assets/close.png" alt="" width="100%" />
    </div>
    <slot v-if="$slots.footer" slot="footer" name="footer" />
  </el-dialog>
</template>

<script>
export default {
  name: 'Dialog',
  inheritAttrs: false,
  props: {
    height: {
      type: Number,
      default: 580
    },
    width: {
      type: Number || String,
      default: ''
    },
    headerHeight: {
      type: Number,
      default: 76
    },
    footerHeight: {
      type: Number,
      default: 68
    },
    fullscreen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      top: '10vh',
      bodyHeight: 300
    };
  },
  computed: {
    dialogWidth() {
      const maxW = this.clientWidth - 10;
      if (this.$isEmpty(this.width)) {
        return maxW + 'px';
      }
      let w = this.width + '';
      if (w.endsWith('px')) {
        w = parseInt(w.substring(0, w.length - 2));
        w = w < maxW ? w : maxW;
        return w + 'px';
      }
      return w;
    }
  },
  watch: {
    height() {
      this.setBodyHeight();
    },
    clientHeight() {
      this.setBodyHeight();
    },
    headerHeight() {
      this.setBodyHeight();
    },
    footerHeight() {
      this.setBodyHeight();
    }
  },
  mounted: function() {
    this.setBodyHeight();
  },
  methods: {
    /**
     * 设置弹框显示区域高度
     * @param {*} dialogObj
     */
    setBodyHeight() {
      const windowheight = this.clientHeight;
      let offsetHeight = this.headerHeight;
      // 设置内容最小高度
      let minHeight = offsetHeight + 148;
      if (this.$slots.footer) {
        offsetHeight += this.footerHeight;
        minHeight += this.footerHeight;
      }
      if (this.fullscreen) {
        this.bodyHeight = windowheight - offsetHeight;
      } else {
        // dialog最大高度
        const maxHeight = parseInt(windowheight * 0.8);
        // 配置的dialog高度超过了最大高度，设置dialog的高度为最大高度
        const height = maxHeight > this.height ? this.height : maxHeight;
        const setHeight = height - offsetHeight - 48;
        this.bodyHeight = setHeight > 100 ? setHeight : 100;
        const dialogHeight = this.height < minHeight ? minHeight : height;
        this.top = Math.abs(windowheight - dialogHeight) / 2 + 'px';
      }
    }
  }
};
</script>

<style lang="scss">
.dialog-class {
  position: relative;
  padding-bottom: 0px !important;
  overflow: hidden;
  .el-dialog__header {
    padding: 0px !important;
    margin: 30px 30px 0px 30px;
    height: 46px !important;
    .el-dialog__title {
      font-weight: bold;
      color: #464668;
    }
  }
  .el-dialog__body {
    padding: 24px 14px 24px 30px !important;
    position: relative;
  }
  .dialog-close {
    position: absolute;
    top: -45px;
    right: 30px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  .el-dialog__footer {
    padding: 0px !important;
    height: 68px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    box-shadow: 0px -2px 10px 0px rgba(56, 56, 56, 0.06);
    padding-right: 30px !important;
  }
  .dialog-footer {
    position: absolute;
    right: 30px;
    bottom: 18px;
    display: flex;
  }
}
</style>
