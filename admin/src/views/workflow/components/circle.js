const option = {
    title: {
        text: '80%',
        left: '36%',
        top: '38%',
        textStyle: {
            color: '#3599FE',
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center'
        },
        subtext: '  待处理',
        subtextStyle: {
            fontSize: 14,
            color: '#464668'
        }
    },
    graphic: {
        type: 'text',
        left: '57%',
        top: '42%',
        style: {
            text: '项',
            textAlign: 'center',
            fill: '#464668',
            fontSize: 14
        }
    },
    series: [
        {
            type: 'pie',
            radius: ['55%', '75%'],
            cneter: ['50%', '50%'],
            avoidLabelOverlap: false,
            color: ['#ccc', '#3599FE'],
            data: [
                {
                    value: 10,
                    name: '搜索引擎9',
                    label: { show: false },
                    labelLine: { show: false, length: 0, length2: 0 }
                },
                {
                    value: 848,
                    name: '待处理',
                    label: {
                        show: true,
                        width: 200,
                        normal: {
                            formatter: '{b}\n\n',
                            padding: [0, -60]
                        }
                    },
                    labelLine: { show: true, length: 20, length2: 55 }
                }
            ],
            width: '100%'
        }
    ]
};

export default option;
