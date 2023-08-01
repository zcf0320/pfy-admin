<template>
  <div class=" h-full flex-center">
    <div>
      <div class="flex-center">
        <el-image class="err-image" size="186" :src="errImg" />
      </div>
      <div class="flex-center">
        <button type="button" class="btn-exit" @click="$emit('back')">
          返回服务列表
        </button>
        <button type="button" class="btn-save ml-60" @click="lookDetails()">
          查看服务详情
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'submitSucess',
  inject: ['currentData'],
  props: {
    appointmentId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      errImg: require('@/assets/submit-success.png')
    };
  },
  computed: {},
  created() {},
  methods: {
    lookDetails() {
      if (this.currentData.serviceType === 1) {
        if (this.$isNotEmpty(this.appointmentId)) {
          this.$router.push(
            `/operateManage/appointmentService/details/${
              this.appointmentId
            }/${'0'}`,
          );
        }
      } else if (this.currentData.serviceType === 3) {
        this.$router.push(
          `/operateManage/commodityExchange/details/${this.appointmentId}/${this.currentData.commodityType}`,
        );
      }
    }
  }
};
</script>

<style scoped lang="scss">
.err-image {
  width: 186px;
  height: 186px;
}
.ml-60 {
  margin-left: 60px;
}
</style>
