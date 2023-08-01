<template>
  <div ref="parent" class="policy-quantity">
    <div class="flex policy-quantity-text">
      <div class="num">
        保单量
        <div class="text">{{ data.policyNum }}</div>
      </div>

      <div class="num">
        今日保单量
        <div class="text text-today">{{ data.todayPolicyNum }}</div>
      </div>
    </div>
    <div ref="echartDom" class="echartDom" />
  </div>
</template>

<script>
import Echart from 'echarts';
import option from '../components/quantityLine';
export default {
  name: 'policyQuantity',
  data() {
    return {
      chart: {},
      width: ''
    };
  },
  computed: {
    data() {
      return this.$store.getters.policyData;
    }
  },
  watch: {
    width(n) {
      if (n) {
        this.$nextTick(() => {
          this.resize();
        });
      }
    },
    'data.datePolicyNums': {
      handler(n) {
        if (n) {
          const x = [];
          const y = [];
          n.forEach(element => {
            x.push(element.date);
            y.push(element.num);
          });
          option.xAxis.data = x;
          option.series[0].data = y;
          this.$nextTick(() => {
            this.chart.setOption(option);
          });
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.initChart();
    if (this.$refs.parent) {
      window.addEventListener('resize', () => {
        this.width = window.getComputedStyle(this.$refs.parent).width;
      });
    }
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
    },
    resize() {
      this.chart.resize();
    }
  }
};
</script>

<style lang="scss" scoped>
.policy-quantity {
  flex: 0 0 50%;
  height: 380px;
  background: #ffffff;
  box-shadow: 0px 6px 12px 0px rgba(242, 242, 242, 0.5);
  padding: 0 24px;
  border-radius: 4px;
  margin-right: 24px;
  &-text {
    justify-content: flex-start;
    align-items: center;
    font-size: 28px;
    color: #545473;
    padding: 41px 0 39px 0;
    border-bottom: 1px solid #ebedf2;
    .text {
      position: absolute;
      left: 59px;
      top: -9px;
      font-size: 28px;
      color: #464668;
    }
    .text-today {
      position: absolute;
      left: 90px;
      top: -9px;
    }
    .num {
      flex: 0 0 50%;
      position: relative;
      font-size: 16px;
      color: #989ab3;
    }
  }
  .echartDom {
    width: 100%;
    height: 320px;
    margin: -28px auto 0;
  }
}
</style>
