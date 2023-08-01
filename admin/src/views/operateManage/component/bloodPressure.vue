<template>
  <div id="myBloodPressure" :class="isEmpty ? 'myBloodPressure' : ''" />
</template>

<script>
import echarts from 'echarts';
export default {
  name: 'BloodPressure',
  props: {
    bloodPressureData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    index: {
      type: String,
      default: '1'
    }
  },
  data() {
    return {
      bloodData: [],
      isEmpty: false
    };
  },
  watch: {
    index(newIndex) {
      if (newIndex === '4') {
        this.draw();
      }
    },
    bloodPressureData(newData) {
      if (newData.length > 0) {
        this.isEmpty = false;
      } else {
        this.isEmpty = true;
      }
      this.bloodData = newData;
      this.draw();
    }
  },
  created() {
    if (this.bloodPressureData && this.bloodPressureData.length > 0) {
      this.isEmpty = false;
    } else {
      this.isEmpty = true;
    }
    this.bloodData = this.bloodPressureData;
  },
  mounted() {
    this.draw();
  },
  methods: {
    draw() {
      const chartEle = document.getElementById('myBloodPressure');
      chartEle.style.width = chartEle.parentNode.clientWidth + 'px';
      chartEle.style.height = '300px';
      const myChart = echarts.init(chartEle);
      // 处理血糖血压数据
      const heightPressure = []; // 高压
      const lowPressure = []; // 低压
      const dayX = []; // x轴天数
      this.bloodData.forEach(item => {
        // 创建时间对象
        const date = new Date(item.createTime);
        const d = date.getDate();
        dayX.push(d + '号');
        heightPressure.push(item.systolicBloodPressure);
        lowPressure.push(item.diastolicBloodPressure);
      });
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['高压mmHg', '低压mmHg']
        },
        color: ['#795BFE', '#3599FE'],
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
          axisTick: { show: false },
          data: []
        },
        yAxis: {
          type: 'value',
          // interval: 30, // 步长
          // min: 30,
          // max: 150,
          axisTick: { show: false },
          axisLine: {
            // y轴
            show: false
          },
          axisLabel: {
            formatter: '{value}mmHg',
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
          splitNumber: 1
        },
        series: [
          {
            name: '高压mmHg',
            type: 'line',
            smooth: true,
            areaStyle: {
              normal: {
                color: 'rgba(121,91,254,0.2)' // 改变区域颜色
              }
            },
            data: []
          },
          {
            name: '低压mmHg',
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
      option.series[0].data = heightPressure;
      option.series[1].data = lowPressure;
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
