<template>
  <div
    :id="id"
    :style="{
      width: width ? width + 'px' : '100%',
      height: height ? height + 'px' : '100%'
    }"
  />
</template>

<script>
import echarts from 'echarts';
export default {
  name: 'EchartsLine',
  props: {
    width: { type: Number, default: 100 },
    height: { type: Number, default: 100 },
    id: {
      type: String,
      required: true
    },
    seriesData: {
      type: Array,
      require: true,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  watch: {
    seriesData: {
      handler(val) {
        if (this.$isEmpty(val)) {
          return;
        }
        this.init();
      },
      deep: true
    }
  },
  mounted() {
    this.init();
    window.addEventListener('resize', () => {
      this.chart.resize();
    });
  },
  methods: {
    /**
     *  初始化报表数据
     */
    init: function() {
      const option = {
        tooltip: {},
        legend: {},
        grid: {
          top: '40%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        radar: {
          name: {
            textStyle: {
              color: '#000',
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator: [
            { name: '睡眠', max: 100 },
            { name: '营养', max: 100 },
            { name: 'BMI', max: 100 },
            { name: '习惯', max: 100 },
            { name: '压力', max: 100 },
            { name: '运动', max: 100 }
          ],
          splitArea: {
            show: true,
            areaStyle: {
              color: ['#fff', '#F9FCFF']
              // 图表背景网格的颜色
            }
          }
        },
        series: [
          {
            name: '评分',
            type: 'radar',
            lineStyle: {
              color: '#3599FE'
            },
            data: [
              {
                value: this.seriesData || []
              }
            ]
          }
        ]
      };
      const reInt = this.$isNotEmpty(this.chart);
      // 如果是首次初始化
      if (!reInt) {
        this.chart = echarts.init(document.getElementById(this.id));
      } else {
        this.chart.clear(); // 重新渲染之前，先清空
      }
      this.chart.setOption(option);
    }
  }
};
</script>

<style scoped lang="scss"></style>
