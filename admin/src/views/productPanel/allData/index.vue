<template>
  <div class="all-data">
    <div class="product-panel-title flex">
      <div class="product-panel-title-text flex">
        <div class="line"/>
        整体数据
      </div>
      <el-select
        v-model="value"
        placeholder="全部"
        class="all-data-selsct"
        filterable
        @change="change"
      >
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </div>
    <div class="all-data-box flex">
      <PolicyQuantity />
      <div class="flex all-data-box-claim"><ClaimAmount /><ClaimApply /></div>
    </div>
    <div class="all-data-plan flex">
      <PlanPolicy />
      <PlanPolicy title="计划理赔量占比" />
    </div>
  </div>
</template>

<script>
import PolicyQuantity from './policyQuantity.vue';
import ClaimAmount from './claimAmount.vue';
import ClaimApply from './claimApply.vue';
import PlanPolicy from './planPolicy.vue';
export default {
  name: 'allData',
  components: { PolicyQuantity, ClaimApply, ClaimAmount, PlanPolicy },
  data() {
    return {
      options: [],
      value: ''
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList(id) {
      this.$store
        .dispatch('insuranceProducts/getProdList', { id })
        .then(res => {
          if (res) {
            this.options = res.data;
            // this.$store.dispatch(
            //   'insuranceProducts/setProductid',
            //   'ff80808175b51a9e0175c112c2fc0188'
            // );
            this.getData();
          }
        });
    },
    getData() {
      this.$store
        .dispatch('insuranceProducts/getStatisticsPolicy', {
          productId: this.value
        })
        .then(res => {
          if (res) {
            this.$store.dispatch('insuranceProducts/setPolicyData', res.data);
          }
        });
    },
    change() {
      this.$store.dispatch('insuranceProducts/setProductid', this.value);
      this.getData();
    }
  }
};
</script>

<style lang="scss" scoped>
.all-data {
  overflow: hidden;

  &-selsct {
    margin-right: 8px;
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
}
</style>
