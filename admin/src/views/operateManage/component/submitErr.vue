<template>
  <div class=" h-full flex-center">
    <div>
      <div class="flex-center">
        <el-image class="err-image" size="186" :src="errImg"/>
      </div>
      <div class="fc-black fs-18 flex-center">
        {{ msg || '提交失败，用户权益已用完' }}
      </div>
      <div class="flex-center mt-10">
        <button type="button" class="btn-exit" @click="$emit('back')">
          返回服务列表
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'submitErr',
  props: {
    msg: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      errImg: require('@/assets/submit-err.png')
    };
  },
  computed: {},
  created() {},
  methods: {}
};
</script>

<style scoped lang="scss">
.err-image {
  width: 186px;
  height: 186px;
}
</style>
