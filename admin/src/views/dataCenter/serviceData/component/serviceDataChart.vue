<template>
  <div
    :id="chartId"
    :class="isEmpty ? 'serciceChart' : ''"
    width="100%"
    height="400px"
  />
</template>

<script>
import echarts from 'echarts';
export default {
  name: 'ServiceDataChart',
  props: {
    serviceDataList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    chartId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      data: [],
      isEmpty: false
    };
  },
  created() {
    if (this.serviceDataList && this.serviceDataList.length > 0) {
      this.isEmpty = false;
    } else {
      this.isEmpty = true;
    }
    this.data = this.serviceDataList;
  },
  mounted() {
    this.draw();
  },
  methods: {
    draw() {
      const chartEle = document.getElementById(this.chartId);
      chartEle.style.height = '400px';
      const myChart = echarts.init(chartEle);
      const option = {
        legend: {},
        tooltip: {},
        dataset: {
          source: []
        },
        xAxis: {
          type: 'category',
          axisLine: {
            // y轴
            show: false
          },
          axisTick: { show: false }
        },
        yAxis: {
          axisTick: { show: false },
          axisLine: {
            // y轴
            show: false
          },
          axisLabel: {
            formatter: '{value}次',
            textStyle: {
              color: '#989AB3'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: '#EAEDF2'
            }
          }
        },
        series: [
          {
            type: 'bar',
            barWidth: '10px',
            color: '#3599FE',
            itemStyle: {
              // 柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
              normal: {
                // 柱形图圆角，初始化效果
                barBorderRadius: [20, 20, 0, 0]
              }
            },
            seriesLayoutBy: 'row'
          },
          {
            type: 'bar',
            barWidth: '10px',
            color: '#19C5BD',
            itemStyle: {
              // 柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
              normal: {
                // 柱形图圆角，初始化效果
                barBorderRadius: [20, 20, 0, 0]
              }
            },
            seriesLayoutBy: 'row'
          }
        ]
      };
      const source = [
        [
          '月份',
          '1月',
          '2月',
          '3月',
          '4月',
          '5月',
          '6月',
          '7月',
          '8月',
          '9月',
          '10月',
          '11月',
          '12月'
        ],
        ['月服务使用次数'],
        ['累计使用次数']
      ];
      this.serviceDataList.forEach(item => {
        source[1].push(item.use_count);
        source[2].push(item.use_sum);
      });
      this.$set(option.dataset, 'source', source);
      myChart.setOption(option);
    }
  }
};
</script>

<style lang="scss" scoped>
.serciceChart {
  &::after {
    content: '';
    display: block;
    width: 293px;
    height: 184px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: url('../../../../assets/empty-img.png') no-repeat center center;
    background-size: contain;
  }
}
</style>
