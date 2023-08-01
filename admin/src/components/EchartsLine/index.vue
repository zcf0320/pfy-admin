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
    type: {
      type: String,
      default: 'line',
      validator: function(value) {
        return ['line', 'bar', 'stack', 'tiled'].indexOf(value) !== -1;
      }
    },
    width: { type: Number, default: null },
    height: { type: Number, default: 100 },
    id: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      default: () => {
        return {
          titleText: String,
          titleSubtext: String,
          legendData: [],
          xAxisData: [],
          series: [],
          color: [],
          axisLabel: {}
        };
      }
    }
  },
  data() {
    return {
      defaultSettings: {
        title: {},
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            },
            lineStyle: {
              color: '#ccc',
              type: 'dashed'
            }
          },
          extraCssText: 'line-height:24px;',
          textStyle: {
            color: '#464668',
            fontSize: 12
          },
          backgroundColor: ' #F3F6F9'
        },
        textStyle: {
          // color: "#989AB3"
        },
        legend: {
          data: []
        },

        grid: {
          left: '0%',
          right: '1%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: '#F0F0F0',
                width: 1 // 这里是为了突出显示加上的
              }
            },
            splitLine: {
              lineStyle: {
                color: '#F0F0F0',
                width: 16
              }
            },
            data: [],
            axisLabel: {
              interval: 0,
              rotate: 60,
              textStyle: {
                color: '#989AB3', // 更改坐标轴文字颜色
                fontSize: 12 // 更改坐标轴文字大小
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#F0F0F0',
                width: 1 // 这里是为了突出显示加上的
              }
            },
            splitLine: {
              lineStyle: {
                color: '#F0F0F0',
                width: 1
              }
            },
            axisLabel: {
              interval: 0,
              textStyle: {
                color: '#989AB3', // 更改坐标轴文字颜色
                fontSize: 14 // 更改坐标轴文字大小
              }
            }
          }
        ],
        series: []
      }
    };
  },
  watch: {
    data: {
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
      const data = this.$extends(true, {}, this.data);
      const option = this.$extends(true, {}, this.defaultSettings);
      // 处理数据
      option.title.text = data.titleText || '';
      option.title.subtext = data.titleSubtext || '';
      option.legend.data = data.legendData || [];
      option.color = data.color || [];
      option.xAxis[0].data = data.xAxisData || [];
      if (this.$isNotEmpty(data.axisLabel)) {
        option.xAxis[0].axisLabel = data.axisLabel;
      }
       if (this.$isNotEmpty(data.yAxisLabel)) {
        option.yAxis[0].axisLabel = data.yAxisLabel;
      }
      if (this.$isNotEmpty(data.tooltip)) {
        option.tooltip = Object.assign(this.defaultSettings.tooltip, data.tooltip);
      }
      // series 数据
      if (this.$isNotEmpty(data.series)) {
        data.series.forEach(item => {
          item.type = item.type || this.type;
        });
      }
      option.series = data.series || [];
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
