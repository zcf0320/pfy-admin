<template>
  <div class="yt-leftBottom">
    <div class="yt-card-name">保单销量分布</div>
    <el-carousel
      indicator-position="outside"
      :interval="10000"
      class="yt-carousel"
    >
      <el-carousel-item v-for="item in productSaleVOList" :key="item.productId">
        <div
ref="echartDom"
class="echartDom"
/></el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import option from './config';
import Echart from 'echarts';
export default {
  name: 'leftBottom',
  data() {
    return {
      chart: {},
      color: [
        '#32F09A',
        '#FFBD1B',
        '#3F5FFF',
        '#7542EC',
        '#FC8451',
        '#74BFDE',
        '#FF1BA4',
        '#3CA272',
        '#EE6666',
        '#FFE935'
      ]
    };
  },
  computed: {
    productSaleVOList() {
      return this.$store.getters.ytPanelData.productSaleVOList;
    }
  },
  watch: {
    productSaleVOList: {
      handler(n) {
        if (n && n.length) {
          this.$nextTick(() => {
            this.initChart();
          });
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    initChart() {
      const echartDom = this.$refs.echartDom;
      if (!echartDom) {
        console.warn('没有找到可渲染的chart-body');
        return;
      }
      if (!Echart) {
        console.warn('echart 未挂载在vue下');
        return;
      }
      this.productSaleVOList.forEach((item, index) => {
        option.title.text = item.productName;
        const data = [];
        item.planSaleVOList.forEach(items => {
          data.push({
            name: items.planName,
            value: items.planSales
          });
        });
        option.series[0].data = data;
        Echart.init(echartDom[index]).setOption(option);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.yt-leftBottom {
  width: 894px;
  height: 570px;
  background: #1f2544;
  border: 1px solid #5d4dfd;
  padding: 28px 40px;
  overflow: hidden;
  margin-top: 24px;
  .echartDom {
    width: 844px;
    height: 520px;
    margin: 0 auto;
  }
}
</style>
