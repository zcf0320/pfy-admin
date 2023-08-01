<template>
  <div class="user-age"><div id="eyeRef" class="echartDom"/></div>
</template>

<script>
import Echart from 'echarts';
import option from './eyeOption';
export default {
  name: 'userage',
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      chart: {}
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
      immediate: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
    window.addEventListener('resize', () => {
      this.resize();
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
  },
  methods: {
    initChart() {
      const echartDom = document.getElementById('eyeRef');
      if (!echartDom) {
        console.warn('没有找到可渲染的chart-body');
        return;
      }
      if (!Echart) {
        console.warn('echart 未挂载在vue下');
        return;
      }
      this.chart = Echart.init(echartDom);
      option.title.subtext = String(this.data.stuNum);
      const arr = [];
      const obj1 = { name: '正常', value: this.data.normalNum };
      const obj2 = { name: '近视', value: this.data.myopiaNum };
      arr.push(obj1, obj2);
      option.series[0].data = arr;
      option.legend.textStyle = {
        fontSize: 14, // 字体大小
        color: '#A2A3B7' // 字体颜色
      };
      option.legend.padding = [0, 16, 0, 0];
      option.legend.top = '41%';
      option.legend.left = '4%';

      this.chart.setOption(option);
    },
    resize() {
      this.chart.resize();
    }
  }
};
</script>

<style lang="scss" scoped>
.user-age {
  width: 350px;
  height: 180px;
  background: #ffffff;
  margin-right: 24px;
  .echartDom {
    width: 100%;
    height: 180px;
  }
}
</style>
