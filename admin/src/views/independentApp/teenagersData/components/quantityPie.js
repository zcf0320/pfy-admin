const option = {
  tooltip: {
    trigger: 'item',
    extraCssText:
      'box-shadow: 0px 0px 4px 0px rgba(204, 204, 204, 0.5);border-radius: 4px;',
    backgroundColor: '#fff',
    textStyle: {
      color: '#464668'
    }
  },
  title: {
    text: '计划保单量占比',
    textStyle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#545473'
    },
    x: '3%',
    y: '10%',
    subtextStyle: {
      fontSize: 24,
      color: '#545473'
    }
  },
  legend: {
    top: '-3%',
    left: '3%',
    textStyle: {
      fontSize: 12, // 字体大小
      color: '#464668' // 字体颜色
    },
    orient: 'vertical',
    icon: 'circle',
    itemWidth: 8,
    itemHeight: 8,
    itemGap: 16
  },
  color: [
    '#009AFF',
    '#00C8BE',
    '#FF355B',
    '#BD55FF',
    '#FFC055',
    '#CBEAFF',
    '#9F9EFF',
    '#1D26B2',
    '#FF8BFC',
    '#31EF56'
  ],
  series: [
    {
      name: '',
      type: 'pie',
      radius: ['55%', '70%'],
      center: ['60%', '55%'],
      avoidLabelOverlap: true,
      labelLine: {
        show: true,
        length: 8
      },
      data: []
    }
  ]
};
export default option;
