<template>
  <div class="all-data">
    <div class="userdata-box flex">
      <Age :data="ageData" />
      <Gender :data="ageData" />
    </div>
  </div>
</template>

<script>
import Gender from './gender.vue';
import Age from './age.vue';
export default {
  name: 'allData',
  components: { Gender, Age },
  props: {
    ageData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.all-data {
  overflow: hidden;
  &-selsct {
    margin-right: 30px;
  }
  &-box {
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;
    &-claim {
      flex: 0 0 50%;
      justify-content: space-between;
      align-items: flex-start;
      flex-direction: column;
    }
  }
  &-plan {
    justify-content: space-between;
    align-items: center;
  }
  .userdata {
    overflow: hidden;
    &-box {
      justify-content: space-between;
      align-items: center;
      margin: 24px 0;
    }
  }
}
</style>
