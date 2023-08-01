<template>
  <div class="ytPie flex">
    <div ref="echartDom" class="echartDom"/>
    <div class="policy-pie-legend flex mb15">
      <div class="policy-pie-legend-icon yellow"/>
      <div class="policy-pie-legend-count">
        累计
        <div v-if="type === '1'">(元)</div>
      </div>
      <span>{{ total }}</span>
    </div>
    <div class="policy-pie-legend flex">
      <div class="policy-pie-legend-icon blue"/>
      <div class="policy-pie-legend-count">
        本月
        <div v-if="type === '1'">(元)</div>
      </div>
      <span>{{ value }}</span>
    </div>
  </div>
</template>

<script>
import Echart from 'echarts';
import option from './config';
export default {
  name: 'ytPie',
  props: {
    total: {
      type: Number,
      default: 0
    },
    value: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: ''
    },
    data: {
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
    total: {
      handler(n) {
        this.$nextTick(() => {
          option.title.subtext = n;
          option.title.text = this.type === '0' ? '累计销量' : '累计收入(元)';
          option.series[0].data = this.data;
          option.series[0].color = ['#FFBD1C', '#3F5FFF'];
          this.chart.setOption(option);
        });
      },
      immediate: true
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
      //   option.series[0].data = data
      this.chart.setOption(option);
    }
  }
};
</script>

<style lang="scss" scoped>
.ytPie {
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  .echartDom {
    width: 200px;
    height: 200px;
    margin: 32px 0;
  }
  .policy-pie-legend {
    width: 219px;
    justify-content: flex-start;
    align-items: center;
    font-weight: bold;
    color: rgba(207, 204, 255, 0.8);
    &-icon {
      width: 42px;
      height: 10px;
      border-radius: 6px;
    }
    .yellow {
      background: #ffbd1c;
    }
    .blue {
      background: #3f5fff;
    }
    &-count {
      margin: 0 10px;
      font-size: 16px;
      color: #8e8bbd;
      max-width: 150px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
  .mb15 {
    margin-bottom: 15px;
  }
}
</style>
