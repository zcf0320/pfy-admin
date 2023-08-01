<template>
  <div class="sales-volume flex">
    <div>
      <div class="yt-card-name">保险产品销量</div>
      <div v-if="planVOSet && planVOSet.length" class="legend-box flex">
        <div
          v-for="(item, index) in planVOSet"
          :key="item.planId"
          class="legend flex"
        >
          <div v-if="index <= 3" :style="{ background: color[index] }" />
          <span v-if="index <= 3">{{ item.planName }}</span>
        </div>
      </div>
      <LineProgress
        v-for="item in productSaleVOList"
        :key="item.productId"
        :process-value="setValue(item)"
        :title="item.productName"
        :value="item.productSales"
      />
    </div>
    <div>
      <ProductPie
        :legend="true"
        title="产品销量"
        text="各项占总销量的比重"
        :list="list"
      />
    </div>
  </div>
</template>

<script>
import LineProgress from '../lineProgress';
import ProductPie from '../productPie';
export default {
  name: 'salesVolume',
  components: { LineProgress, ProductPie },
  data() {
    return {
      color: ['#4149CF', '#7144FB', '#844FA1', '#8E8BBD'],
      processValue1: [
        {
          name: '乙烯',
          color: '#3EA4F7',
          data: 30494
        },
        {
          name: '丁二烯',
          color: '#AAD9F7',
          data: 3585
        },
        {
          name: '化工苯',
          color: '#23628D',
          data: 7615
        },
        {
          name: '对二甲苯',
          color: '#5EBAF8',
          data: 12881
        },
        {
          name: '苯乙烯',
          color: '#2D7AB8',
          data: 6696
        }
      ],
      processValue2: [
        {
          name: '乙烯',
          color: '#3EA4F7',
          data: 30494
        }
      ]
      //   planVOSet: []
    };
  },
  computed: {
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
            value: item.productSales,
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
          data: items.planSales,
          planId: items.planId
        };
      });
      const final = result.map(item => {
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
