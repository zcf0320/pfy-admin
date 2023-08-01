<template>
  <div ref="qrcode" class="qrcode"/>
</template>
<script>
import QRCode from 'qrcodejs2';
export default {
  name: 'QrCode',
  props: {
    url: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      qrcode: null
    };
  },
  created() {
    this.$nextTick(() => {
      this.createQrCode();
    });
  },
  methods: {
    createQrCode() {
      if (this.qrcode) {
        this.qrcode.clear();
        this.qrcode.makeCode(this.url);
      } else {
        this.qrcode = new QRCode(this.$refs.qrcode, {
          width: this.width, // 设置宽度，单位像素
          height: this.height, // 设置高度，单位像素
          text: this.url // 设置二维码内容或跳转地址
        });
      }
    }
  }
};
</script>
