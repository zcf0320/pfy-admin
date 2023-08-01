<template>
  <div class="service-panel">
    <div class="product-panel-title flex">
      <div class="product-panel-title-text flex">
        <div class="line"/>
        服务项数据
      </div>
      <el-select
        v-model="value"
        placeholder="请选择保障计划"
        filterable
        class="all-data-selsct"
        @change="getData"
      >
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </div>
    <div v-for="item in data" :key="item.serviceInfoId" class="service-data">
      <LineCharts :id="item.serviceInfoId" :data="item" />
      <PieCharts
        v-if="item.claimInfo"
        :id="item.serviceInfoId"
        :data="item.claimInfo"
      />
      <DrugTable
        v-if="item.compensationMedicineList.length"
        :table-data="item.compensationMedicineList"
      />
    </div>
  </div>
</template>

<script>
import LineCharts from './line.vue';
import PieCharts from './pie.vue';
import DrugTable from './drugTable.vue';
export default {
  name: 'ServiceData',
  components: { LineCharts, PieCharts, DrugTable },
  data() {
    return {
      options: [],
      value: '',
      data: []

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
      this.$store.dispatch('groupPolicy/getPlanList', { insuranceProductId: this.productId }).then((res) => {
        this.options = res.data;
      });
    },
    getData() {
      this.$store.dispatch('insuranceProducts/getStatisticsService', { productId: this.productId, planId: this.value }).then((res) => {
        this.data = res.data;
        //         claimNum	理赔总量	integer(int64)
        // claimRate	理赔率	number
        // claimStateStatistscs	理赔状态统计	array	理赔统计
        // num	数量	integer(int64)
        // title	标题	string
        // claimStatistics	首次理赔统计	array	理赔统计
        // num	数量	integer(int64)
        // title	标题	string
        // todayClaimNum	今日理赔量
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.service-panel {
  padding-bottom: 36px;
  .service-data {
    width: 100%;
    background: #ffffff;
    box-shadow: 0px 6px 12px 0px rgba(242, 242, 242, 0.5);
    border-radius: 4px;
    margin-top: 24px;
  }
}
</style>
