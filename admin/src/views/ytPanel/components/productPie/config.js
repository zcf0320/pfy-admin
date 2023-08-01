const option = {
    title: {
        text: '各项占总销量的比重',
        left: 'center',
        top: '90%',
        textStyle: {
            color: '#8E8BBD',
            fontSize: 16,
            fontWeight: 400
        }
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        show: false,
        x: 'center',
        icon: 'rect',
        itemHeight: 12,
        itemWidth: 12,
        itemGap: 24,
        textStyle: {
            color: '#CFCCFF', // 文字的颜色。
            fontSize: 16,
            fontWeight: 700,
            padding: [5, 0, 0, 0]
        }
    },
    graphic: {
        type: 'text',
        left: 'center',
        top: '47%',
        style: {
            text: '产品销量',
            textAlign: 'center',
            fill: '#8E8BBD',
            fontSize: 20,
            fontWeight: 700
        }
    },
    color: ['#1AC85E', '#FFBD1B', '#3F5FFF'],
    series: [
        {
            type: 'pie',
            radius: ['40%', '60%'],
            data: [
                { value: 1048, name: '搜索引擎' },
                { value: 735, name: '直接访问' },
                { value: 580, name: '邮件营销' }
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            label: {
                normal: {
                    textStyle: {
                        color: 'rgba(207, 204, 255, 0.8)', // 改变标示文字的颜色
                        fontSize: 20
                    },
                    formatter: data => {
                        return data.percent.toFixed(0) + '%';
                    }
                }
            }
        }
    ]
};

export default option;
