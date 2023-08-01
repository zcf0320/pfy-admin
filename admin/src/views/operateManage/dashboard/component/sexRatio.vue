<template>
  <div class="sex-ratio">
    <div ref="echartDom" class="echartDom" />
  </div>
</template>

<script>
import echartOption from './circle';
import Echart from 'echarts';
export default {
  name: 'SexRatio',
  props: {
    data: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      chart: {},
      sex: []
    };
  },
  watch: {
    data(newV) {
      if (newV) {
        this.sex = JSON.parse(this.data).sex;
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
      this.sex.forEach(item => {
        item.name = item.userSexName;
        item.value = item.userSexCount;
      });
      echartOption.series[0].data = this.sex;
      echartOption.legend.y = '55%';
      this.chart.setOption(echartOption);
    }
  }
};
</script>

<style lang="scss" scoped>
.sex-ratio {
  .echartDom {
    width: 366px;
    height: 222px;
  }
}
</style>
