// 结算医保类型
export const settlementMedicalInsuranceTypes = [{
    label: '公费医疗',
    value: 1
}, {
    label: '基本医疗保险',
    value: 2
}, {
    label: '其他医疗保险',
    value: 3
}, {
    label: '全自费',
    value: 4
}];

// 给付方式
export const settlementTypes = [{
    label: '医疗费用补偿（按比例给付）',
    value: 1
}, {
    label: '定额给付',
    value: 2
}, {
    label: '定期给付',
    value: 3
}];

// 给付条件
export const paymentConditionTypes = [{
        label: '适用所有疾病',
        value: 1
    }, {
        label: '指定疾病',
        value: 2
    },
    {
        label: '身故',
        value: 4
    },
    {
        label: '残疾',
        value: 5
    }, {
        label: '其他',
        value: 3
    }
];

// 赔付金额单位
export const payoutAmountUnits = [{
    label: '元/天',
    value: 1
}, {
    label: '元/月',
    value: 2
}];

const day = [];
for (let index = 1; index < 31; index++) {
    day.push({
        label: `${index}天`,
        value: index
    });
}
// 天数
export const days = day;

const hospitalDay = [];
for (let index = 1; index < 201; index++) {
    hospitalDay.push({
        label: `${index}天`,
        value: index
    });
}
export const hospitalDays = hospitalDay;

const day90 = [];
for (let index = 0; index < 91; index++) {
    day90.push({
        label: `${index}天`,
        value: index
    });
}
day90.push({
    label: `180天`,
    value: 180
});
export const days90 = day90;

// 保险责任中止条件
export const terminationConditions = [{
    label: '达到最高支付限额',
    value: '1'
}, {
    label: '达到最高支付期限',
    value: '2'
}, {
    label: '被保险人身故',
    value: '3'
}, {
    label: '残疾恢复',
    value: '4'
}, {
    label: '欠交保费超宽限期',
    value: '5'
}, {
    label: '保障责任效力跟随主险',
    value: '6'
}];

// 保证续保
export const renewalFlags = [{
    label: '是',
    value: true
}, {
    label: '否',
    value: false
}];

// 续保年龄
const list = [];
for (let index = 1; index < 111; index++) {
    list.push({
        label: `${index}岁`,
        value: index
    });
}
export const renewalAgeLimits = list;

// 续保年限
export const renewalYearLimits = [{
        label: '1年',
        value: 1
    }, {
        label: '2年',
        value: 2
    }, {
        label: '3年',
        value: 3
    }, {
        label: '4年',
        value: 4
    }, {
        label: '5年',
        value: 5
    }, {
        label: '6年',
        value: 6
    }, {
        label: '7年',
        value: 7
    }, {
        label: '8年',
        value: 8
    }, {
        label: '9年',
        value: 9
    }, {
        label: '10年',
        value: 10
    },
    {
        label: '11年',
        value: 11
    }, {
        label: '12年',
        value: 12
    }, {
        label: '13年',
        value: 13
    }, {
        label: '14年',
        value: 14
    }, {
        label: '15年',
        value: 15
    }, {
        label: '16年',
        value: 16
    }, {
        label: '17年',
        value: 17
    }, {
        label: '18年',
        value: 18
    }, {
        label: '19年',
        value: 19
    }, {
        label: '20年',
        value: 20
    }
];
