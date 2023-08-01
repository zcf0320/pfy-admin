const option = {
  title: {
    text: '保单销量', // 主标题文本
    subtext: '累计销量', // 副标题文本
    left: 'center',
    top: '32%',
    textStyle: {
      fontSize: 16,
      color: '#8E8BBD',
      align: 'center'
    },
    subtextStyle: {
      fontSize: 32,
      color: 'rgba(207, 204, 255, 0.8)',
      fontWeight: 700
    }
  },
  series: [
    {
      type: 'pie',
      radius: ['68%', '93%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      labelLine: {
        show: false
      },
      color: ['#3F5FFF', '#FFBD1C'],
      data: [
        {
          value: 48,
          name: '搜索引擎'
        },
        { value: 735, name: '直接访问' }
      ]
    }
  ]
};
export default option;
