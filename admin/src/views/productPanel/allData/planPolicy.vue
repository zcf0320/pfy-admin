<template>
  <div class="plan-policy">
    <div ref="echartDom" class="echartDom" />
  </div>
</template>

<script>
import Echart from 'echarts';
import planPolicyPie from '../components/planPolicyPie';
import planClaimPie from '../components/planClaimPie';
export default {
  name: 'planPolicy',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
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
    'data.planPolicyStatistics': {
      handler(n) {
        const policy = [];
        if (n && n.length) {
          n.forEach(element => {
            if (!this.title) {
              policy.push({
                name: element.planName,
                value: element.num
              });
            }
          });
        }
        if (!this.title) {
          planPolicyPie.series[0].data = policy;
          this.$nextTick(() => {
            this.chart.setOption(planPolicyPie);
          });
        }
      },
      deep: true,
      immediate: true
    },
    'data.planClaimStatistics': {
      handler(n) {
        const claim = [];
        if (n && n.length) {
          n.forEach(element => {
            if (this.title === '计划理赔量占比') {
              claim.push({
                name: element.planName,
                value: element.num
              });
            }
          });
        }
        if (this.title) {
          planClaimPie.series[0].data = claim;
          this.$nextTick(() => {
            this.chart.setOption(planClaimPie);
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
      if (this.title) {
        this.chart.setOption(planClaimPie);
      } else {
        this.chart.setOption(planPolicyPie);
      }
    },
    resize() {
      this.chart.resize();
    }
  }
};
</script>

<style lang="scss" scoped>
.plan-policy {
  flex: 0 0 50%;
  height: 208px;
  background: #ffffff;
  box-shadow: 0px 6px 12px 0px rgba(242, 242, 242, 0.5);
  border-radius: 4px;
  margin: 24px 24px 24px 0;
  .echartDom {
    width: 100%;
    height: 208px;
  }
}
</style>
