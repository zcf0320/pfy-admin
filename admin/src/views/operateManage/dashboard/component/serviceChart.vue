<template>
  <div>
    <Echarts :id="id" :options="options" :height="'400'" />
  </div>
</template>
<script>
export default {
  name: 'ServiceChart',
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      }
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      options: {
        legend: {
          data: ['预约次数', '预约人数', '使用次数', '使用人数']
        },
        color: ['#19C5BD', '#F54E60', '#3599fe', '#795BFE'],
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
          color: '#989AB3'
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
            data: [
              '一月',
              '二月',
              '三月',
              '四月',
              '五月',
              '六月',
              '七月',
              '八月',
              '九月',
              '十月',
              '十一月',
              '十二月'
            ],
            axisLabel: {
              interval: 0,
              rotate: 60
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
            }
          }
        ],
        series: [
          {
            key: 'reverse_amount',
            name: '预约次数',
            lineStyle: {
              color: '#19C5BD'
            },
            type: 'line',
            areaStyle: {
              color: '#EEFFFE'
            },
            data: []
          },
          {
            key: 'reverse_peoples',
            name: '预约人数',
            lineStyle: {
              color: '#F54E60'
            },
            type: 'line',
            areaStyle: {
              color: '#FFDCDF'
            },
            data: []
          },
          {
            key: 'used_amount',
            name: '使用次数',
            lineStyle: {
              color: '#3599fe'
            },
            type: 'line',
            areaStyle: {
              color: '#EBF5FF'
            },
            data: []
          },
          {
            key: 'used_peoples_amount',
            name: '使用人数',
            lineStyle: {
              color: '#795BFE',
              width: '2'
            },
            type: 'line',
            areaStyle: {
              color: '#E1DAFF'
            },
            data: []
          }
        ]
      }
    };
  },
  watch: {
    data: {
      handler(val) {
        if (this.$isNotEmpty(val)) {
          if (this.$isNotEmpty(val)) {
            this.formatData();
          }
        }
      },
      immediate: true
    }
  },
  created() {
    this.formatData();
  },
  methods: {
    formatData() {
      this.options.series.forEach(item => {
        item.data = this.data[item.key];
      });
    }
  }
};
</script>
<style lang="scss" scoped></style>
