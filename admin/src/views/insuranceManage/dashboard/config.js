export const productOptions = {
  title: {
    text: '保险产品数量',
    left: 'center',
    top: '38%',
    textStyle: {
      fontSize: 38,
      fontWeight: 500,
      fill: '#464668'
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    itemWidth: 20,
    itemHeight: 14,
    itemGap: 24,
    left: '76%',
    textStyle: {
      color: '#A2A3B7'
    }
  },
  graphic: {
    type: 'text',
    left: 'center',
    top: '57%',
    style: {
      text: '保险产品数量',
      textAlign: 'center',
      fill: '#A2A3B7',
      fontSize: 14
    }
  },
  series: [
    {
      name: '保险类型',
      type: 'pie',
      radius: ['70%', '80%'],
      color: [
        '#5B8FF9',
        '#5AD8A6',
        '#5D7092',
        '#F6DB16',
        '#E8684A',
        '#6DC8EC',
        '#9270CA',
        '#FF9D4D',
        '#269A99',
        '#FF99C3'
      ],
      startAngle: 270, // 起始角度
      label: {
        show: false
      },
      data: [
        {
          value: 0,
          name: '重疾险'
        },
        {
          value: 0,
          name: '防癌险'
        },
        {
          value: 0,
          name: '意外险'
        },
        {
          value: 0,
          name: '一般医疗险'
        },
        {
          value: 0,
          name: '百万医疗险'
        },
        {
          value: 0,
          name: '慢性病险'
        },
        {
          value: 0,
          name: '齿科'
        },
        {
          value: 0,
          name: '中端医疗险'
        },
        {
          value: 0,
          name: '高端医疗险'
        },
        {
          value: 0,
          name: '医美'
        }
      ]
    }
  ]
};

export const policyAge = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: '65%',
    top: 'center',
    itemWidth: 20,
    itemHeight: 14,
    itemGap: 24,
    textStyle: {
      color: '#A2A3B7'
    },
    data: [
      '未知',
      '小于18岁',
      '18岁～30岁',
      '30岁～45岁',
      '45岁～65岁',
      '大于65岁'
    ]
  },
  series: [
    {
      name: '保单年龄',
      type: 'pie',
      radius: ['65%', '75%'],
      center: ['35%', '50%'],
      label: {
        show: false
      },
      color: ['#5D7092', '#5B8FF9', '#5AD8A6', '#9270CA', '#F6DB16', '#E8684A'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      labelLine: {
        show: false
      },
      data: [
        {
          value: 0,
          name: '未知'
        },
        {
          value: 0,
          name: '小于18岁'
        },
        {
          value: 0,
          name: '18岁～30岁'
        },
        {
          value: 0,
          name: '30岁～45岁'
        },
        {
          value: 0,
          name: '45岁～65岁'
        },
        {
          value: 0,
          name: '大于65岁'
        }
      ]
    }
  ]
};

export const policyType = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    left: 'center',
    top: 'bottom',
    itemWidth: 20,
    itemHeight: 14,
    itemGap: 24,
    textStyle: {
      color: '#A2A3B7'
    }
  },

  series: [
    {
      name: '保单分类',
      type: 'pie',
    radius: ['65%', '75%'],
    center: ['50%', '50%'],
      label: {
        show: false
      },
      color: [
        '#5B8FF9',
        '#6DC8EC',
        '#5AD8A6',
        '#5D7092',
        '#F6DB16',
        '#E8684A',
        '#FF9D4D',
        '#269A99',
        '#FF99C3',
        '#99ACFF'
      ],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      labelLine: {
        show: false
      },
      data: [
        {
          value: 0,
          name: '防癌险'
        },
        {
          value: 0,
          name: '意外险'
        },
        {
          value: 0,
          name: '重疾险'
        },
        {
          value: 0,
          name: '一般医疗险'
        },
        {
          value: 0,
          name: '百万医疗险'
        },
        {
          value: 0,
          name: '中端医疗险'
        },
        {
          value: 0,
          name: '医美'
        },
        {
          value: 0,
          name: '高端医疗险'
        },
        {
          value: 0,
          name: '齿科'
        },
        {
          value: 0,
          name: '特药险'
        },
        {
          value: 0,
          name: '慢性病用药险'
        }
      ]
    }
  ]
};
export const productTypes = {
  title: {
    text: '',
    left: 'left'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    right: 0,
    top: 100,
    radius: '50%',
    data: ['个险', '团险']
  },
  series: [
    {
      name: '保险分类',
      type: 'pie',
      selectedMode: 'single',
      radius: ['50%', '75%'],
      startAngle: 240, // 起始角度
      label: {
        show: false,
        formatter: '{b}：{d}% \n',
        with: 20
      },
      color: ['#5FAEFF', '#18C4BD'],
      data: [
        {
          value: 3,
          name: '个险',
          selected: false
        },
        {
          value: 5,
          name: '团险'
        }
      ]
    }
  ]
};
export const productSort = {
  title: {
    text: '',
    left: 'left'
  },
  grid: {
    left: '10%'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    right: 0,
    top: 50,
    data: ['重疾险', '防癌险', '意外险', '一般医疗险', '百万医疗险']
    //
  },
  series: [
    {
      name: '保险产品类型',
      type: 'pie',
      selectedMode: 'single',
      radius: ['50%', '75%'],
      startAngle: 240, // 起始角度
      label: {
        show: false,
        position: 'inner'
      },
      // labelLine: {
      //     show: false
      // },
      color: ['#5FAEFF', '#18C4BD', '#AF5FFF', '#FF9F00', '#FF5E7D'],
      data: [
        {
          value: 0,
          name: '重疾险',
          selected: false
        },
        {
          value: 0,
          name: '防癌险'
        },
        {
          value: 0,
          name: '意外险'
        },
        {
          value: 0,
          name: '一般医疗险'
        },
        {
          value: 0,
          name: '百万医疗险'
        }
      ]
    }
  ]
};
export const policyStatistics = {
  tooltip: {
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  color: ['#5AD8A6', '#F6DB16', '#5B8FF9', '#6DC8EC'],
  label: {
    color: '#464668'
  },
  series: [
    {
      name: '核赔统计',
      type: 'pie',
      radius: '50%',
      data: [
        {
          value: 0,
          name: '核赔通过',
          selected: false
        },
        {
          value: 0,
          name: '核赔不通过'
        },
        {
          value: 0,
          name: '初审待审核'
        },
        {
          value: 0,
          name: '待医学核赔'
        }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};
