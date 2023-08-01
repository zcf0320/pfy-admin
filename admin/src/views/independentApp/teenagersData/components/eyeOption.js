const option = {
  title: {
    text: '总人数',
    textAlign: 'center',
    textStyle: {
      fontSize: 14,
      color: '#A2A3B7',
      width: 70,
      algin: 'center'
    },
    x: '38%',
    y: '35%',
    subtext: '457',
    subtextStyle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#464668',
      width: 70,
      algin: 'center'
    }
  },
  tooltip: {
    show: true,
    trigger: 'item',
    extraCssText:
      'box-shadow: 0px 0px 4px 0px rgba(204, 204, 204, 0.5);border-radius: 4px;',
    backgroundColor: '#fff',
    textStyle: {
      color: '#464668'
    }
  },
  legend: {
    show: false,
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
      radius: ['63%', '75%'],
      center: ['40%', '50%'],
      labelLine: {
        show: true
        // length: 8,
        // length2: 8
      },
      data: []
    }
  ]
};
export default option;
