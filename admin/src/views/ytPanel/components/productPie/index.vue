<template>
  <div class="productPie"><div ref="echartDom" class="echartDom"/></div>
</template>

<script>
import Echart from 'echarts';
import option from './config';
export default {
  name: 'productPie',
  props: {
    legend: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      chart: {}
    };
  },
  watch: {
    list: {
      handler(n) {
        this.$nextTick(() => {
          option.series[0].data = n;
          option.title.text = this.text;
          option.graphic.style.text = this.title;
          option.legend.show = this.legend;
          this.chart.setOption(option);
        });
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

      this.chart.setOption(option);
    }
  }
};
</script>

<style lang="scss" scoped>
.productPie {
  .echartDom {
    width: 430px;
    height: 350px;
  }
}
</style>
