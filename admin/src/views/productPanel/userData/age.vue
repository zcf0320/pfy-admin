<template>
  <div class="user-age"><div id="ageRef" class="echartDom" /></div>
</template>

<script>
import Echart from 'echarts';
import option from '../components/quantityPie';
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
      chart: {},
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
    'data.ageStatistics': {
      handler(n) {
        if (n && n.length) {
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
      const echartDom = document.getElementById('ageRef');
      if (!echartDom) {
        console.warn('没有找到可渲染的chart-body');
        return;
      }
      if (!Echart) {
        console.warn('echart 未挂载在vue下');
        return;
      }
      this.chart = Echart.init(echartDom);
      option.title.text = '年龄分布';
      option.title.subtext = '保单年龄分布比例';

      const data = this.data.ageStatistics.map(item => {
        return {
          name: item.age,
          value: item.num
        };
      });
      option.series[0].data = data;
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
  flex: 0 0 45%;
  height: 281px;
  background: #ffffff;
  box-shadow: 0px 6px 12px 0px rgba(242, 242, 242, 0.5);
  border-radius: 4px;
  margin-right: 24px;
  .echartDom {
    width: 100%;
    height: 281px;
  }
}
</style>
