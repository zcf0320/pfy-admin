<template>
  <div class="footer">
    <button
      v-if="postStatus === 107"
      type="button"
      class="btn-save"
      @click="publishProtectRight(105)"
    >
      发布
    </button>
    <!-- 已发布 -->
    <button
      v-if="postStatus === 105"
      type="button"
      class="btn-exit ml-24"
      @click="downShelfProtectRight(106)"
    >
      下架
    </button>
    <!-- 已下架 -->
    <button
      v-if="postStatus === 106"
      type="button"
      class="btn-save  ml-24"
      @click="publishProtectRight(105)"
    >
      上架
    </button>
  </div>
</template>
<script>
export default {
  name: 'Footer',
  props: {
    id: {
      type: String,
      default: ''
    },
    postStatus: {
      type: Number,
      default: 107
    }
  },
  data() {
    return {};
  },
  methods: {
    // 状态改变
    publishProtectRight(status) {
      this.$store
        .dispatch('guaranteePower/publishProtectRight', {
          id: this.id,
          postStatus: status
        })
        .then(res => {
          if (!res.code) {
            this.$message.success(res.comment);
            this.$router.push('/insuranceManage/guaranteePower');
          }
        });
    },
    // 状态改变
    downShelfProtectRight(status) {
      this.$store
        .dispatch('guaranteePower/downShelfProtectRight', {
          id: this.id,
          postStatus: status
        })
        .then(res => {
          if (!res.code) {
            this.$message.success(res.comment);
            this.$router.push('/insuranceManage/guaranteePower');
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.footer {
  display: inline-block;
}
</style>
