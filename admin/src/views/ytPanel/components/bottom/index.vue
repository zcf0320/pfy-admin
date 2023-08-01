<template>
  <div class="ytBottom flex">
    <div class="btm-left">
      <Product />
      <Distribution />
    </div>
    <div class="btm-right">
      <div class="btm-right-top flex"><Policy /><AnnualStatistics /></div>
      <div class="btm-right-btm flex"><Claim /></div>
    </div>
  </div>
</template>

<script>
import Policy from '../bottomRight/policy.vue';
import AnnualStatistics from '../bottomRight/annualStatistics.vue';
import Claim from '../bottomRight/claim.vue';
import Product from '../leftTop/index.vue';
import Distribution from '../leftBottom/index.vue';
export default {
  name: 'ytBottom',
  components: {
    Policy,
    AnnualStatistics,
    Claim,
    Product,
    Distribution
  }
};
</script>

<style lang="scss" scoped>
.ytBottom {
  margin: 0 44px;
  justify-content: space-between;
  align-items: flex-start;
  .btm-left {
    // width: 894px;
    // height: 1200px;
    // background: #1f2544;
    // border: 1px solid #5d4dfd;
    // padding: 28px 40px;
    // overflow: hidden;
  }
  .btm-right {
    &-top {
      width: 1628px;
      height: 428px;
      background: #1f2544;
      border: 1px solid #5d4dfd;
      padding: 28px 40px;
      justify-content: flex-start;
    }
    &-btm {
      justify-content: space-between;
      align-items: flex-start;
    }
  }
}
</style>
