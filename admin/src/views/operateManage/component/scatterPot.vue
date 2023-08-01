<template>
  <div
    :id="id"
    :style="{
      width: width ? width + 'px' : '100%',
      height: height ? height + 'px' : '100%'
    }"
    :class="$isEmpty(data.series) ? 'empty-box' : ''"
  />
</template>

<script>
import echarts from 'echarts';
import { getMonthDays } from '@/utils/time';
export default {
  name: 'EchartsLine',
  props: {
    width: { type: Number, default: 100 },
    height: { type: Number, default: 100 },
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    keyValue: {
      type: String,
      required: true
    },
    showLabels: {
      type: Array,
      required: true
    },
    data: {
      type: Object,
      default: () => {
        return {
          titleText: String,
          series: [],
          month: new Date().getTime()
        };
      }
    }
  },
  data() {
    return {};
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
    getValue(val) {
      const hasData = this.data.series.find(
        itemData => this.$timeFormat(itemData.createTime, 'MM/dd') === val
      );
      let str = '';
      if (hasData) {
        const labels = this.showLabels;
        str += '<div>';
        labels.forEach(item => {
          str +=
            '<div>' + item.name + '：' + hasData[item.key] + '</div></div>';
        });
      }
      return str;
    },
    /**
     *  初始化报表数据
     */
    init: function() {
      const vm = this;
      const series = [];
      const xAxisData = [];
      const days = getMonthDays(new Date(this.data.month));
      for (let i = 1; i <= days; i++) {
        let month = new Date(this.data.month);
        month = month.setDate(i);
        const M = this.$timeFormat(month, 'MM/dd');
        xAxisData.push(M);
        const hasData = this.data.series.find(
          itemData => this.$timeFormat(itemData.createTime, 'MM/dd') === M
        );
        if (this.$isNotEmpty(hasData)) {
          series.push(hasData[this.keyValue]);
        } else {
          series.push(undefined);
        }
      }
      const option = {
        title: {
          text: this.data.titleText
        },
        tooltip: {
          trigger: 'axis',
          formatter: function(data) {
            return vm.getValue(data[0].axisValue);
          },
          axisPointer: {
            label: {
              backgroundColor: '#6a7985'
            },
            lineStyle: {
              color: '#EBEDF2',
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
        grid: {
          top: '20%',
          left: '0%',
          right: '1%',
          bottom: '4%',
          containLabel: true
        },
        xAxis: {
          // boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#464668FF',
              width: 1 // 这里是为了突出显示加上的
            }
          },
          data: xAxisData,
          axisLabel: {},
          splitLine: {
            lineStyle: {
              color: '#EBEDF2',
              width: 1
            }
          }
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              color: '#464668FF',
              width: 1 // 这里是为了突出显示加上的
            }
          },
          splitNumber: 1,
          splitLine: {
            lineStyle: {
              color: '#EBEDF2',
              width: 1
            }
          }
        },
        legend: {
          data: [this.title || '']
        },
        series: [
          {
            name: this.title || '',
            data: series,
            type: 'scatter',
            symbolSize: 12,
            itemStyle: {
              normal: {
                color: 'rgba(53, 153, 254, 1)'
              }
            }
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

<style scoped lang="scss">
.empty-box {
  &::after {
    content: '';
    display: block;
    width: 200px;
    height: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: url('../../../assets/empty-img.png') no-repeat center center;
    background-size: contain;
  }
}
</style>
