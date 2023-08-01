<template>
  <div class="service-pie">
    <div class="service-pie-title">服务项理赔数据</div>
    <div class="service-pie-box flex">
      <div class="service-pie-rate flex">
        <div :id="`pie1${id}`" class="echartDom1" />
        <div class="service-pie-rate-box flex">
          <div class="service-pie-rate-item">
            理赔总量
            <div class="num">{{ data.claimNum }}</div>
          </div>
          <div class="service-pie-rate-item">
            今日理赔
            <div class="num">{{ data.todayClaimNum }}</div>
          </div>
        </div>
      </div>
      <div :id="`pie2${id}`" class="echartDom2" />
      <div :id="`pie3${id}`" class="echartDom3" />
    </div>
  </div>
</template>

<script>
import Echart from 'echarts';
import option from '../components/claimPie';
export default {
  name: 'servicePie',
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      chart1: {},
      chart2: {},
      chart3: {},
      width: ''
    };
  },
  watch: {
    width(n) {
      if (n) {
        this.$nextTick(() => {
          this.resize();
        });
      }
    },
    'data.claimNum': {
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
  mounted() {
    if (this.$refs.parent) {
      window.addEventListener('resize', () => {
        this.width = window.getComputedStyle(this.$refs.parent).width;
      });
    }
  },
  methods: {
    initChart() {
      const echartDom1 = document.getElementById(`pie1${this.id}`);
      const echartDom2 = document.getElementById(`pie2${this.id}`);
      const echartDom3 = document.getElementById(`pie3${this.id}`);
      if (!Echart) {
        console.warn('echart 未挂载在vue下');
        return;
      }
      this.chart1 = Echart.init(echartDom1);
      this.chart2 = Echart.init(echartDom2);
      this.chart3 = Echart.init(echartDom3);
      const config = JSON.parse(JSON.stringify(option));
      this.setChart1(config);
      this.setChart2(config);
      this.setChart3(config);
    },
    resize() {
      this.chart1.resize();
      this.chart2.resize();
      this.chart3.resize();
    },
    setChart1(config) {
      config.legend.show = false;
      config.title.text = '理赔率';
      config.color = ['#CCCCCC', '#C130FF'];
      const last = 100 - this.data.claimRate;
      config.series[0].data = [
        { name: '剩余', value: last },
        { name: '完成', value: this.data.claimRate }
      ];
      config.graphic.style.text = this.data.claimRate + '%';
      this.chart1.setOption(config);
    },
    setChart2(config) {
      config.legend.show = true;
      config.color = ['#009AFF', '#18C4BD', '#FF4769'];
      const data = this.data.claimStateStatistscs.map(item => {
        return {
          name: item.title,
          value: item.num
        };
      });
      config.series[0].data = data;
      config.title.show = false;
      config.graphic.style.text = '';
      this.chart2.setOption(config);
    },
    setChart3(config) {
      config.legend.show = true;
      config.color = ['#009AFF', '#18C4BD'];
      const data = this.data.claimStatistics.map(item => {
        return {
          name: item.title,
          value: item.num
        };
      });
      config.series[0].data = data;
      config.title.show = false;
      config.graphic.style.text = '';
      this.chart3.setOption(config);
    }
  }
};
</script>

<style lang="scss" scoped>
.service-pie {
  border-top: 1px solid #ebedf2;
  padding-bottom: 24px;
  margin: 0 24px;
  &-title {
    font-size: 18px;
    font-weight: bold;
    color: #545473;
    padding-top: 24px;
  }
  &-rate {
    width: 33%;
    justify-content: flex-start;
    align-items: center;
    &-item {
      position: relative;
      font-size: 14px;
      color: #a2a3b7;
      margin-bottom: 22px;
      .num {
        position: absolute;
        left: 72px;
        top: -7px;
        font-size: 24px;
        font-weight: bold;
        color: #464668;
      }
    }
    &-box {
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
    }
  }
  .echartDom1 {
    width: 80%;
    height: 160px;
    margin-left: -8%;
  }
  .echartDom2 {
    width: 33%;
    height: 160px;
  }
  .echartDom3 {
    width: 33%;
    height: 160px;
  }
}
</style>
