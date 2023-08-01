<template>
  <div class="high-wight-page">
    <div class="high-wight-chart">
      <div id="scoreChart" class="highChart" />
    </div>
  </div>
</template>

<script>
import Echart from 'echarts';
import option from './scoreChart';
export default {
  name: 'BloodComponent',
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      chart: null
    };
  },
  watch: {
    data: {
      handler(n) {
        if (n) {
          this.$nextTick(() => {
            this.initChart();
          });
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {},
  mounted() {
    window.addEventListener('resize', () => {
      this.resize();
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
  },
  methods: {
    initChart() {
      const echartDom = document.getElementById('scoreChart');
      if (!echartDom) {
        console.warn('没有找到可渲染的chart-body');
        return;
      }
      if (!Echart) {
        console.warn('echart 未挂载在vue下');
        return;
      }
      if (this.data.length <= 0) {
        echartDom.innerHTML = '<div class="empty-img"></div>';
        echartDom.removeAttribute('_echarts_instance_');
        return;
      }
      this.chart = Echart.init(echartDom);
      const ageList = [];
      const dataList = [];
      this.data.forEach(item => {
        ageList.push(item.name);
        dataList.push(item.bloodGlucose);
      });
      option.color = ['#6395F9'];
      option.yAxis.axisLabel.formatter = '{value}mmol/L';
      option.series[0].name = '血糖';
      option.xAxis.data = ageList;
      option.series[0].data = dataList;
      this.chart.setOption(option);
    },
    resize() {
      this.chart.resize();
    }
  }
};
</script>

<style lang="scss" scoped>
.high-wight-page {
  width: 100%;
  margin-top: 30px;
  &-head {
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-title {
      font-size: 18px;

      font-weight: bold;
      color: #545473;
      line-height: 18px;
    }
    .high-wight-page-tab {
      width: 162px;
      height: 32px;
      display: flex;
      .tab-item {
        width: 50%;
        height: 32px;
        font-size: 14px;

        font-weight: 400;
        color: #989ab3;
        line-height: 32px;
        text-align: center;
        &.active {
          background: #3599fe;
          border-radius: 4px;
          color: #fff;
        }
      }
    }
  }
  .high-wight-chart {
    width: 100%;
    .highChart {
      width: 100%;
      height: 258px;
    }
  }
}
</style>
