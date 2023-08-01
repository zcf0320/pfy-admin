const option = {
  // title: {
  //     text: '年度保单统计',
  //     textStyle: {
  //         color: 'rgba(255, 255, 255, 0.6)',
  //         fontSize: 32
  //     },
  //     left: 70
  // },
  // legend: {
  //     data: ['2011年', '2012年']
  // },
  xAxis: {
    type: 'category',
    data: [
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
    axisLabel: {
      textStyle: {
        color: '#8E8BBD', // 坐标值得具体的颜色
        fontSize: 12
      }
    },
    axisLine: {
      lineStyle: {
        color: '#ccc',
        type: 'dashed'
      }
    },
    axisTick: {
      show: false
    },
    boundaryGap: 20
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      textStyle: {
        color: '#8E8BBD', // 坐标值得具体的颜色
        fontSize: 12
      }
    },
    axisLine: {
      lineStyle: {
        color: '#ccc',
        type: 'dashed'
      }
    },
    axisTick: {
      show: false
    },
    splitLine: {
      // 网格线
      lineStyle: {
        type: 'dashed' // 设置网格线类型 dotted：虚线   solid:实线
      },
      show: true // 隐藏或显示
    }
  },
  color: '#FFB900',
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130, 200, 150, 80, 70, 110],
      type: 'bar',
      barWidth: 20
    }
  ]
};
export default option;
