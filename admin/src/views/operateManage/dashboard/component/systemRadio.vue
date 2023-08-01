<template>
  <div class="system-ratio">
    <div ref="echartDom" class="echartDom" />
  </div>
</template>

<script>
import echartOption from './circle';
import Echart from 'echarts';
export default {
  name: 'systemRadioRadio',
  props: {
    data: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      chart: {},
      system: []
    };
  },
  watch: {
    data(newV) {
      if (newV) {
        this.system = JSON.parse(this.data).system;
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
      this.system.forEach(item => {
        item.name = item.osName;
        item.value = item.osCount;
      });
      echartOption.series[0].data = this.system;
      echartOption.legend.y = 'center';
      this.chart.setOption(echartOption);
    }
  }
};
</script>

<style lang="scss" scoped>
.system-ratio {
  .echartDom {
    width: 366px;
    height: 222px;
  }
}
</style>
