<template>
  <div class="ytPolicy flex">
    <div>
      <div class="yt-card-name">保单销量</div>
      <Pie
        :total="totalSales"
        :value="totalSalesThisMonth"
        type="0"
        :data="saleData"
      />
    </div>
    <div class="ytPolicy-box">
      <div class="yt-card-name">保单收入</div>
      <Pie
        :total="premiumIncome"
        :value="premiumIncomeThisMonth"
        type="1"
        :data="incomeData"
      />
    </div>
    <div class="ytPolicy-line"/>
  </div>
</template>

<script>
import Pie from '../pie';
import moment from 'moment';
export default {
  name: 'ytPolicy',
  components: { Pie },
  data() {
    return {
      totalSalesThisMonth: 0,
      premiumIncomeThisMonth: 0
    };
  },
  computed: {
    totalSales() {
      return this.$store.getters.ytPanelData.totalSales;
    },
    premiumIncome() {
      return this.$store.getters.ytPanelData.premiumIncome;
    },
    salesAndIncomeVOList() {
      return this.$store.getters.ytPanelData.salesAndIncomeVOList;
    },
    saleData() {
      const arr = [
        {
          name: '剩余',
          value: Number(this.totalSales) - Number(this.totalSalesThisMonth)
        },
        { name: '本月', value: this.totalSalesThisMonth }
      ];

      return arr;
    },
    incomeData() {
      const arr = [
        {
          name: '剩余',
          value:
            Number(this.premiumIncome) - Number(this.premiumIncomeThisMonth)
        },
        { name: '本月', value: this.premiumIncomeThisMonth }
      ];
      return arr;
    }
  },
  watch: {
    salesAndIncomeVOList: {
      handler(n) {
        if (n && n.length) {
          const month = moment().format('M');
          const data = n[month - 1].salesAndIncomeProductVOList;

          this.premiumIncomeThisMonth = data.reduce(
            (totalPrice, item) => totalPrice + item.premiumIncomeThisMonth,
            0
          );

          this.totalSalesThisMonth = data.reduce(
            (total, item) => total + item.totalSalesThisMonth,
            0
          );
          this.premiumIncomeThisMonth = Number(
            this.premiumIncomeThisMonth.toFixed(2)
          );
          this.totalSalesThisMonth = Number(
            this.totalSalesThisMonth.toFixed(2)
          );
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.ytPolicy {
  justify-content: flex-start;
  align-items: flex-start;
  &-line {
    width: 1px;
    height: 353px;
    background: #5b588e;
  }
  &-box {
    margin: 0 52px 0 70px;
  }
}
</style>
