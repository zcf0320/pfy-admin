<template>
  <div class="age-ratio">
    <div ref="echartDom" class="echartDom" />
  </div>
</template>

<script>
import echartOption from './circle';
import Echart from 'echarts';
export default {
  name: 'ageRatio',
  props: {
    data: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      chart: {},
      age: []
    };
  },
  watch: {
    data(newV) {
      if (newV) {
        this.age = JSON.parse(this.data).age;
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
      this.age.forEach(item => {
        item.name = item.userAgeName;
        item.value = item.userAgeCount;
      });
      echartOption.series[0].data = this.age;
      echartOption.legend.y = 'center';
      this.chart.setOption(echartOption);
    }
  }
};
</script>

<style lang="scss" scoped>
.age-ratio {
  .echartDom {
    width: 366px;
    height: 222px;
  }
}
</style>
