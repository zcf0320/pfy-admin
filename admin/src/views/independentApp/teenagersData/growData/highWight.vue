<template>
  <div class="high-wight-page">
    <div class="high-wight-page-head">
      <div class="high-wight-page-head-title">身高体重</div>
      <div class="high-wight-page-tab">
        <div
          :class="`tab-item ${tab === 0 ? 'active' : ''}`"
          @click="tabChange(0)"
        >
          平均身高
        </div>
        <div
          :class="`tab-item ${tab === 1 ? 'active' : ''}`"
          @click="tabChange(1)"
        >
          平均体重
        </div>
      </div>
    </div>
    <div class="high-wight-chart">
      <div id="highChart" class="highChart" />
    </div>
  </div>
</template>

<script>
import Echart from 'echarts';
import option from '../components/highWeight';
export default {
  name: 'allData',
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
      tab: 0,
      manData: [],
      womanData: [],
      ageData: []
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
    tabChange(val) {
      this.tab = val;
      this.initChart();
    },
    initChart() {
      const echartDom = document.getElementById('highChart');
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
      const manHeightList = [];
      const womanHeightList = [];
      const manWeightList = [];
      const womanWeightList = [];
      this.data.forEach(item => {
        if (!ageList.includes(item.age)) {
          ageList.push(item.age);
          manHeightList.push(0);
          womanHeightList.push(0);
          manWeightList.push(0);
          womanWeightList.push(0);
        }
      });
      this.data.forEach(item => {
        ageList.forEach((ele, index) => {
          if (item.age === ele) {
            if (item.sex) {
              manHeightList[index] = item.heightAvg;
              manWeightList[index] = item.weightAvg;
            } else {
              womanHeightList[index] = item.heightAvg;
              womanWeightList[index] = item.weightAvg;
            }
          }
        });
      });
      this.ageData = ageList;
      if (this.tab) {
        this.manData = manWeightList;
        this.womanData = womanWeightList;
        option.yAxis.axisLabel.formatter = '{value}kg';
      } else {
        this.manData = manHeightList;
        this.womanData = womanHeightList;
        option.yAxis.axisLabel.formatter = '{value}cm';
      }
      option.xAxis.data = this.ageData;
      option.series[0].data = this.manData;
      option.series[1].data = this.womanData;
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
    width: 100%;
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
        cursor: pointer;
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
      height: 300px;
    }
  }
}
</style>
