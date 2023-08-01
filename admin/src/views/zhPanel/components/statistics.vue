<template>
  <div class="zh-statistics zh-layput-pad">
    <div class="zh-statistics-title flex">
      <div class="yt-card-name">
        年度保单统计
      </div>
      <div class="zh-statistics-legend flex">
        <div class="icon" />
        保单销量
      </div>
    </div>
    <div ref="annuelDom" class="annuelDom" />
  </div>
</template>

<script>
import Echart from 'echarts';
import option from './annuelBar';
export default {
  name: 'statistics',
  data() {
    return {
      chart: {}
    };
  },
  computed: {
    data() {
      return this.$store.getters.zhPanelData;
    }
  },
  watch: {
    data: {
      handler() {
        this.$nextTick(() => {
          this.initChart();
        });
      },
      deep: true
    }
  },
  mounted() {},
  methods: {
    initChart() {
      const echartDom = this.$refs.annuelDom;
      if (!echartDom) {
        console.warn('没有找到可渲染的chart-body');
        return;
      }
      if (!Echart) {
        console.warn('echart 未挂载在vue下');
        return;
      }
      this.chart = Echart.init(echartDom);

      option.series[0].data = this.data.totalPolicyCountStatistics.map(item => {
        return {
          name: item.name,
          value: item.num
        };
      });
      this.chart.setOption(option);
    }
  }
};
</script>

<style lang="scss" scoped>
.zh-statistics {
  width: 1063px;
  height: 734px;
  .annuelDom {
    width: 1163px;
    height: 700px;
    margin: -20px 0 0 -75px;
  }
  &-title {
    justify-content: space-between;
    align-items: center;
    .icon {
      width: 20px;
      height: 9px;
      background: #ffb900;
      margin-right: 4px;
    }
  }
  &-legend {
    font-size: 16px;

    font-weight: bold;
    color: #cfccff;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>
