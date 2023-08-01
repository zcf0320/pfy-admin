<template>
  <div class="claim-apply flex">
    <div ref="echartDom" class="echartDom" />
    <div class="claim-apply-right">
      <div class="claim-apply-right-text top">
        理赔申请量
        <div class="num">{{ data.claimRecordNum }}</div>
      </div>
      <div class="claim-apply-right-text">
        理赔成功率
        <div class="num">{{ data.claimSuccessRate }}%</div>
      </div>
    </div>
  </div>
</template>

<script>
import Echart from 'echarts';
import option from '../components/applyLine';
export default {
  name: 'claimApply',
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
    'data.dateClaimRecordNums': {
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
          option.series[0].symbol =
            'image://http://g-hcare-scm-1301127519.cos.ap-shanghai.myqcloud.com/scm/pic/20210810093958red-dot.png?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDMyJNBigOXPcZHm8yf5D7lAOLHxMbIIl2%26q-sign-time%3D1628559598%3B1943919598%26q-key-time%3D1628559598%3B1943919598%26q-header-list%3D%26q-url-param-list%3D%26q-signature%3D3f9595a806fe1faf053f9e38021a0078b16e22b2';
          option.series[0].itemStyle = {
            normal: {
              lineStyle: {
                color: '#FF8CA1'
              }
            }
          };
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
    },
    resize() {
      this.chart.resize();
    }
  }
};
</script>

<style lang="scss" scoped>
.claim-apply {
  width: calc(100% - 31px);
  height: 178px;
  background: #ffffff;
  box-shadow: 0px 6px 12px 0px rgba(242, 242, 242, 0.5);
  border-radius: 4px;
  justify-content: flex-start;
  align-items: center;
  .echartDom {
    width: 80%;
    height: 238px;
  }
  &-right {
    margin-left: -20px;
    &-text {
      position: relative;
      font-size: 16px;
      color: #989ab3;
      padding-right: 10px;
      .num {
        position: absolute;
        top: -9px;
        left: 90px;
        font-size: 28px;
        color: #545473;
      }
    }
    .top {
      margin-bottom: 40px;
    }
  }
}
</style>
