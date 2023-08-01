export const priceUnit = {
    160: 10000,
    161: 1,
    162: 1
};
export const priceUnitText = {
    160: '万元',
    161: '元',
    162: '元/天'
};
export const KeyList = [{
    label: '固定保费',
    value: 7
}, {
    label: '年龄',
    value: 1
}, {
    label: '性别',
    value: 2
}, {
    label: '职业',
    value: 3
}, {
    label: '年龄+职业',
    value: 4
}, {
    label: '性别+职业',
    value: 5
}, {
    label: '年龄+性别',
    value: 6
}, {
    label: '有无社保',
    value: 8
}, {
    label: '年龄+社保',
    value: 9
}, {
    label: '性别+社保',
    value: 10
}];
export const PremiumType = {
    1: ['age'],
    2: ['gender'],
    3: ['jobType'],
    4: ['age', 'jobType'],
    5: ['gender', 'jobType'],
    6: ['age', 'gender'],
    7: ['fixed'],
    8: ['socialInsurance'],
    9: ['age', 'socialInsurance'],
    10: ['gender', 'socialInsurance']
};
export const KeyName = {
    'age': ['年龄'],
    'gender': ['男', '女'],
    'jobType': ['一类', '二类', '三类', '四类', '五类', '六类'],
    'fixed': ['固定保费'],
    'socialInsurance': ['有社保', '无社保']
};
export const TypeName = {
    'age': '年龄',
    'gender': '性别',
    'jobType': '职业类型',
    'fixed': '固定保费',
    'socialInsurance': '有无社保'
};
