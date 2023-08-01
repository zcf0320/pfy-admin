<template>
  <div class="job-ratio"><div ref="echartDom" class="echartDom" /></div>
</template>

<script>
import echartOption from './line';
import Echart from 'echarts';
export default {
  name: 'jobRatio',
  props: {
    data: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      chart: {},
      position: []
    };
  },
  watch: {
    data(newV) {
      if (newV) {
        this.position = JSON.parse(this.data).position;
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
      const userPositionName = [];
      const userPositionCount = [];
      this.position.forEach(item => {
        userPositionName.push(item.userPositionName);
        userPositionCount.push(item.userPositionCount);
      });
      echartOption.yAxis.data = userPositionName;
      echartOption.series[0].data = userPositionCount;
      echartOption.tooltip.formatter = item => {
        const curr = (item[0].data / 10) * 100;
        return item[0].name + '：' + item[0].value + '（' + curr + '%）';
      };
      this.chart.setOption(echartOption);
    }
  }
};
</script>

<style lang="scss" scoped>
.job-ratio {
  .echartDom {
    width: calc(100%-500px);
    height: 540px;
  }
}
</style>
