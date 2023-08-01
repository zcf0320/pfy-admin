<template>
  <div class="brand-ratio">
    <div ref="echartDom" class="echartDom" />
  </div>
</template>

<script>
import echartOption from './circle';
import Echart from 'echarts';
export default {
  name: 'brandRatio',
  props: {
    data: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      chart: {},
      phoneBrand: []
    };
  },
  watch: {
    data(newV) {
      if (newV) {
        this.phoneBrand = JSON.parse(this.data).phoneBrand;
        this.setOption();
      }
    }
  },
  mounted() {
    this.initChart();
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
      this.chart = Echart.init(echartDom);
    },
    setOption() {
      this.phoneBrand.forEach(item => {
        item.name = item.phoneBrandName;
        item.value = item.phoneCount;
      });
      echartOption.series[0].data = this.phoneBrand;
      echartOption.legend.y = 'center';
      this.chart.setOption(echartOption);
    }
  }
};
</script>

<style lang="scss" scoped>
.brand-ratio {
  .echartDom {
    width: 380px;
    height: 222px;
  }
}
</style>
