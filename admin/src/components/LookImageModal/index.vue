<template>
  <div class="look-image-modal">
    <el-dialog
      title="证件详情"
      :visible="isShow"
      :width="dialogWidth"
      center
      :close-on-click-modal="closeClickModal"
      @close="close"
    >
      <div class="look-img">
        <img :src="imgUrl" alt="" >
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="close">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'LookImageModal',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      closeClickModal: false,
      imgUrl: ''
    };
  },
  computed: {
    dialogWidth() {
      return window.screen.width >= 768 ? '50%' : '95%';
    }
  },
  created() {
    this.getImageUrl(this.id);
  },
  methods: {
    // 获取图片链接
    getImageUrl(id) {
      this.$store.dispatch('app/getImageUrl', {
        id
      }).then(res => {
        this.imgUrl = res.obj.credentityPic;
      });
    },
    // 关闭弹框
    close() {
      const vm = this;
      vm.$emit('closeLookModal', {
        type: vm.keyType
      });
    }
  }

};
</script>
<style lang="scss" scoped>
.look-image-modal {
  .look-img {
    width: 100%;
    height: 100%;
    min-height: 400px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
