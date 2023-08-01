<template>
  <div class="userdata">
    <div class="product-panel-title-text flex">
      <div class="line"/>
      用户数据
    </div>
    <div class="userdata-box flex">
      <Gender :data="user" />
      <Age :data="user" />
    </div>
  </div>
</template>

<script>
import Gender from './gender.vue';
import Age from './age.vue';
export default {
  name: 'userdata',
  components: { Gender, Age },
  data() {
    return {
      user: {

      }

    };
  },
  computed: {
    productId() {
      return this.$store.getters.productId;
    }
  },
  watch: {
    productId: {
      handler(n) {
        if (n) {
          this.getList();
        }
      }
    }
  },
  methods: {
    getList() {
      this.$store.dispatch('insuranceProducts/getStatisticsUser', { productId: this.productId }).then((res) => {
        this.user = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.userdata {
  overflow: hidden;
  &-box {
    justify-content: space-between;
    align-items: center;
    margin: 24px 0;
  }
}
</style>
