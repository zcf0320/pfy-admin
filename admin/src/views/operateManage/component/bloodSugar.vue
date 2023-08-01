<template>
  <div id="myBloodSugar" :class="isEmpty ? 'myBloodPressure' : ''" />
</template>

<script>
import echarts from 'echarts';
export default {
  name: 'BloodSugar',
  props: {
    bloodSugarData: {
      type: Array,
      default() {
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
    bloodSugarData(newData) {
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
    if (this.bloodSugarData && this.bloodSugarData.length > 0) {
      this.isEmpty = false;
    } else {
      this.isEmpty = true;
    }
    this.bloodData = this.bloodSugarData;
  },
  mounted() {
    this.draw();
  },
  methods: {
    getValue(val) {
      const hasData = this.bloodData.find(itemData => {
        return this.$timeFormat(itemData.createTime, 'd号') === val;
      });
      let str = '';
      if (hasData) {
        str += '<div class="echart-w300">';
        str += `<div>${hasData.timeQuantum ||
          '-'}</div><div>血糖(mmol/L)：${hasData.bloodGlucose ||
          '-'}</div><div>备注信息：${hasData.remark ||
          '-'}</div><div>结论：${hasData.result || '-'}</div><div>填写时间：${
          hasData.measuringTime
            ? this.$moment(hasData.measuringTime).format('YYYY-MM-DD HH:MM:SS')
            : '-'
        }</div></div>`;
      }
      return str;
    },
    draw() {
      const vm = this;
      const chartEle = document.getElementById('myBloodSugar');
      chartEle.style.width = chartEle.parentNode.clientWidth + 'px';
      chartEle.style.height = '300px';
      const myChart = echarts.init(chartEle);
      // 处理血糖数据
      const bloodSugarArr = []; // 血糖
      const dayX = []; // x轴天数
      this.bloodData.forEach(item => {
        // 创建时间对象
        const date = new Date(item.createTime);
        const d = date.getDate();
        dayX.push(d + '号');
        bloodSugarArr.push(item.bloodGlucose);
      });
      const option = {
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
        legend: {
          data: ['血糖mmol/L']
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
            formatter: '{value}mmol/L',
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
            name: '血糖mmol/L',
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
