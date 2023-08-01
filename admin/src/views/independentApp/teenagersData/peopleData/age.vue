<template>
  <div class="user-age"><div id="ageRef" class="echartDom"/></div>
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
      chart: {}
    };
  },
  watch: {
    data: {
      handler(n) {
        if (n && n.list) {
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
    window.addEventListener('resize', () => {
      this.resize();
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
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
      if (this.data.list.length <= 0) {
        echartDom.innerHTML = '<div class="empty-img"></div>';
        echartDom.removeAttribute('_echarts_instance_');
        return;
      }
      this.chart = Echart.init(echartDom);
      option.title.text = `全校总人数(${this.data.sumNum}人)`;
      // option.title.subtext = String(this.data.sumNum);
      const data = this.data.list.map(item => {
        return {
          name: item.age + '岁',
          value: item.num
        };
      });
      if (this.data.other) {
        data.push({
          name: '其他',
          value: this.data.other.num
        });
      }
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
  width: 504px;
  height: 255px;
  background: #ffffff;
  box-shadow: 0px 6px 12px 0px rgba(242, 242, 242, 0.5);
  border-radius: 4px;
  margin-right: 24px;
  .echartDom {
    width: 100%;
    height: 255px;
  }
}
</style>
