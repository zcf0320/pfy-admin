const option = {
  title: {
    text: 'Customized Pie',
    left: 'center',
    top: 10,
    textStyle: {
      color: '#8E8BBD',
      fontWeight: 'bold',
      fontSize: 24
    }
  },
  legend: {
    top: '88%',
    left: 'center',
    icon: 'rect',
    itemHeight: 12,
    itemWidth: 12,
    itemGap: 16,
    textStyle: {
      color: '#fff',
      fontSize: 16,
      padding: [0, 0, 0, 8],
      fontWeight: 'bold'
    }
  },
  graphic: {
    type: 'text',
    left: 'center',
    top: '78%',
    style: {
      text: '各项占总销量的比重',
      textAlign: 'center',
      fontSize: 16,
      fill: '#8E8BBD',
      fontWeight: 'bold'
    }
  },
  tooltip: {
    trigger: 'item'
  },
  color: [
    '#32F09A',
    '#FFBD1B',
    '#3F5FFF',
    '#7542EC',
    '#FC8451',
    '#74BFDE',
    '#FF1BA4',
    '#3CA272',
    '#EE6666',
    '#FFE935'
  ],
  series: [
    {
      name: '',
      type: 'pie',
      radius: ['10%', '55%'],
      center: ['50%', '43%'],
      data: [
        { value: 335, name: '直接访问' },
        { value: 310, name: '邮件营销' },
        { value: 274, name: '联盟广告' },
        { value: 235, name: '视频广告' },
        { value: 400, name: '搜索引擎' }
      ],
      roseType: 'radius',
      label: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
      },
      labelLine: {
        smooth: 0.2,
        length: 10,
        length2: 20
      },
      itemStyle: {
        shadowBlur: 200,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      },

      animationType: 'scale',
      animationEasing: 'elasticOut',
      // eslint-disable-next-line no-unused-vars
      animationDelay: function(idx) {
        return Math.random() * 200;
      }
    }
  ]
};
export default option;
