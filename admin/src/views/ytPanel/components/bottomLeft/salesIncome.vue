<template>
  <div class="sales-volume flex">
    <div>
      <div class="yt-card-name" style="margin-bottom: 60px">
        保险产品保费收入
      </div>
      <LineProgress
        v-for="item in productSaleVOList"
        :key="item.productId"
        :process-value="setValue(item)"
        :title="item.productName"
        :value="item.productPremium"
      />
    </div>
    <div>
      <ProductPie title="保费收入" text="各项占收入的比重" :list="list" />
    </div>
  </div>
</template>

<script>
import LineProgress from '../lineProgress';
import ProductPie from '../productPie';
export default {
  name: 'salesIncome',
  components: { LineProgress, ProductPie },
  data() {
    return {
      color: ['#4149CF', '#7144FB', '#844FA1', '#8E8BBD']
    };
  },
  computed: {
    countWidth() {
      return 'width: 20%; height: 30px';
    },
    productSaleVOList() {
      let data = this.$store.getters.ytPanelData.productSaleVOList
        ? JSON.parse(
            JSON.stringify(this.$store.getters.ytPanelData.productSaleVOList)
          )
        : [];
      if (data && data.length > 3) {
        data = data.splice(0, 3);
      }
      return data;
    },
    list() {
      let arr = [];
      if (this.productSaleVOList && this.productSaleVOList.length) {
        arr = this.productSaleVOList.map(item => {
          return {
            value: item.productPremium,
            name: item.productName
          };
        });
      }
      return arr;
    },
    planVOSet() {
      let data = this.$store.getters.ytPanelData.planVOSet
        ? JSON.parse(JSON.stringify(this.$store.getters.ytPanelData.planVOSet))
        : [];
      if (data && data.length > 4) {
        data = data.splice(0, 4);
      }
      for (const i in data) {
        data[i].color = this.color[i];
      }
      return data;
    }
  },
  methods: {
    setValue(data) {
      const result = data.planSaleVOList.map(items => {
        return {
          name: items.planName,
          data: items.planPremium,
          planId: items.planId
        };
      });
      const final = result.forEach(item => {
        this.planVOSet.forEach(items => {
          if (item.name === items.planName) {
            item.color = items.color;
          } else {
            item.color = '#373371';
          }
        });
        return item;
      });
      return final;
    }
  }
};
</script>

<style lang="scss" scoped>
.sales-volume {
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid #5b588e;
  height: 370px;
  overflow: hidden;
  margin-bottom: 29px;
  .legend-box {
    justify-content: flex-start;
    align-items: center;
    margin: 24px 0;
    .legend {
      justify-content: flex-start;
      align-items: center;
      flex-direction: column;
      margin-right: 8px;
      div {
        width: 53px;
        height: 10px;
        border-radius: 5px;
        margin-bottom: 2px;
      }
      span {
        font-size: 16px;
        color: rgba(207, 204, 255, 0.6);
      }
    }
  }
}
</style>
