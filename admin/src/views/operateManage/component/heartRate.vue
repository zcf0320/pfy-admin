<template>
  <div id="myBloodSugar" :class="isEmpty ? 'myBloodPressure' : ''" />
</template>

<script>
import echarts from 'echarts';
export default {
  name: 'BloodSugar',
  props: {
    heartRateData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    index: {
      type: String,
      default: '0'
    }
  },
  data() {
    return {
      heartRateList: [],
      isEmpty: false
    };
  },
  watch: {
    index(newIndex) {
      if (newIndex === '4') {
        this.draw();
      }
    },
    heartRateData(newData) {
      if (newData.length > 0) {
        this.isEmpty = false;
      } else {
        this.isEmpty = true;
      }
      this.heartRateList = newData;
      this.draw();
    }
  },
  created() {
    if (this.heartRateData && this.heartRateData.length > 0) {
      this.isEmpty = false;
    } else {
      this.isEmpty = true;
    }
    this.heartRateList = this.heartRateData;
  },
  mounted() {
    this.draw();
  },
  methods: {
    draw() {
      const chartEle = document.getElementById('myBloodSugar');
      chartEle.style.width = chartEle.parentNode.clientWidth + 'px';
      chartEle.style.height = '300px';
      const myChart = echarts.init(chartEle);
      // 处理血糖数据
      const bloodSugarArr = []; // 血糖
      const dayX = []; // x轴天数
      this.heartRateList.forEach(item => {
        // 创建时间对象
        const date = new Date(item.createTime);
        const d = date.getDate();
        dayX.push(d + '号');
        bloodSugarArr.push(item.heartRate);
      });
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['心率次/分钟']
        },
        color: ['#3599FE'],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLine: {
            // y轴
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#989AB3'
            }
          },
          axisTick: { show: false }
        },
        yAxis: {
          type: 'value',
          axisTick: { show: false },
          axisLine: {
            // y轴
            show: false
          },
          axisLabel: {
            formatter: '{value}次/分钟',
            textStyle: {
              color: '#3599FE'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: '#989AB3'
            }
          },
          splitNumber: 2
        },
        series: [
          {
            name: '心率次/分钟',
            type: 'line',
            smooth: true,
            areaStyle: {
              normal: {
                color: 'rgba(53,153,254,0.2)' // 改变区域颜色
              }
            },
            data: []
          }
        ]
      };
      option.xAxis.data = dayX;
      option.series[0].data = bloodSugarArr;
      myChart.setOption(option);
    }
  }
};
</script>

<style scoped lang="scss">
.myBloodPressure {
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
