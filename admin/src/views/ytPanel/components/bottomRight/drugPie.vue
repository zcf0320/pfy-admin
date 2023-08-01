<template>
  <div class="drug-pie">
    <div ref="echartDom" class="echartDom"/>
    <div class="policy-pie-legend flex mb15">
      <span class="policy-pie-legend-count">{{ title }}</span>
      <span>{{ num }}单</span>
    </div>
    <div class="policy-pie-legend flex">
      <span class="policy-pie-legend-count">赔付金额(元)</span>
      <span>{{ amount }}</span>
    </div>
  </div>
</template>

<script>
import Echart from 'echarts';
import option from '../pie/config';
export default {
  name: 'drugPie',
  props: {
    title: {
      type: String,
      default: '单药品'
    },
    amount: {
      type: Number,
      default: 0
    },
    num: {
      type: Number,
      default: 0
    },
    text: {
      type: String,
      default: ''
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      chart: {}
    };
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
      option.series[0].color = ['#373371', '#FFBD1C'];
      option.title.text = this.text;
      if (this.total === 0) {
        option.title.subtext = '0%';
      } else {
        option.title.subtext = (this.amount / this.total * 100).toFixed(0) + '%';
      }

      option.series[0].data = [
        { value: this.total - this.amount, name: '2' },
        { value: this.amount, name: '1' }
      ];
      this.chart.setOption(option);
    }
  }
};
</script>

<style lang="scss" scoped>
.drug-pie {
  margin-top: 24px;
  .echartDom {
    width: 200px;
    height: 200px;
    margin-bottom: 24px;
  }
  .policy-pie-legend {
    justify-content: flex-start;
    align-items: center;
    font-weight: bold;
    color: rgba(207, 204, 255, 0.8);
    &-icon {
      width: 42px;
      height: 10px;
      border-radius: 6px;
    }
    &-count {
      margin: 0 10px;
      font-size: 16px;
      color: #8e8bbd;
    }
  }
  .mb15 {
    margin-bottom: 15px;
  }
}
</style>
