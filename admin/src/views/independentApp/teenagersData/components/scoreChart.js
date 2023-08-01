const option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    extraCssText:
      'box-shadow: 0px 0px 4px 0px rgba(204, 204, 204, 0.5);border-radius: 4px;',
    backgroundColor: '#fff',
    textStyle: {
      color: '#464668'
    }
  },
  grid: {
    left: '0%',
    right: '0%',
    bottom: '10%',
    top: '3%',
    containLabel: true
  },
  calculable: true,
  xAxis: {
    type: 'category',
    axisTick: {
      // y轴刻度线
      show: false,
      alignWithLabel: true
    },
    axisLine: {
      // y轴
      show: true,
      lineStyle: {
        type: 'dashed', // 设置网格线类型 dotted：虚线   solid:实线
        width: 1,
        color: '#CCCCCC'
      }
    },
    splitLine: {
      // 网格线
      lineStyle: {
        type: 'dashed', // 设置网格线类型 dotted：虚线   solid:实线
        width: 1,
        color: '#CCCCCC'
      },
      show: true // 隐藏或显示
    },
    boundaryGap: true,
    axisLabel: {
      color: '#989AB3',
      show: true,
      formatter: '{value}岁'
    },
    data: [14, 15, 17, 18, 19, 22, 23, 27, 33],
    formatter: '{b0} 岁'
  },
  yAxis: {
    type: 'value',
    axisTick: {
      // y轴刻度线
      show: false
    },
    axisLine: {
      // y轴
      show: true,
      lineStyle: {
        type: 'dashed', // 设置网格线类型 dotted：虚线   solid:实线
        width: 1,
        color: '#CCCCCC'
      }
    },
    splitLine: {
      // 网格线
      lineStyle: {
        type: 'dashed', // 设置网格线类型 dotted：虚线   solid:实线
        width: 1,
        color: '#CCCCCC'
      },
      show: true // 隐藏或显示
    },
    // 刻度标签
    axisLabel: {
      show: true,
      color: '#989AB3',
      formatter: '{value}cm'
    }
  },
  color: [],
  series: [
    {
      name: '得分',
      type: 'bar',
      data: [2, 1, 1, 1, 1, 1, 0, 1, 0],
      barWidth: '25'
    }
  ]
};
export default option;
