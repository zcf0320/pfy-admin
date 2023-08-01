import * as guaranteePowerApi from '@/api/guaranteePower';

const ageOptions = [];
// 初始化age
for (let i = 0; i < 100; i++) {
  ageOptions.push({
    id: i,
    name: i
  });
}

const state = {
  ageOptions,
  jobOptions: {
    163: '一类',
    164: '二类',
    165: '三类',
    166: '四类',
    167: '五类',
    168: '六类'
  },
  sexOptions: {
    169: '男',
    170: '女'
  },
  tableHeader: {
    age: '年龄',
    sex: '性别',
    job: '职业'
  },
  rateText: {
    171: '1/100',
    172: '1/1000',
    173: '1/10'
  },
  types: {
    1: '重疾险',
    2: '意外险',
    3: '防癌险',
    4: '健康险',
    5: '车险',
    6: '财险',
    7: '人寿险',
    8: '一般医疗险',
    9: '百万医疗险'
  }
};

const actions = {
  // 创建保障责任
  createProtectRight(ctx, params) {
    return guaranteePowerApi.createProtectRight(params);
  },
  // 获取保障责任列表
  getProtectRightList(ctx, params) {
    return guaranteePowerApi.getProtectRightList(params);
  },
  // 获取保障责任详情
  getProtectRightDetail(ctx, params) {
    return guaranteePowerApi.getProtectRightDetail(params);
  },
  // 删除保障责任
  deleteGuaranteePower(ctx, params) {
    return guaranteePowerApi.deleteGuaranteePower(params);
  },
  // 更新基础信息
  updateBaseMsg(ctx, params) {
    return guaranteePowerApi.updateBaseMsg(params);
  },
  // 更新保额设置
  updatePriceSetting(ctx, params) {
    return guaranteePowerApi.updatePriceSetting(params);
  },
  // 更新费率表
  updateRateTable(ctx, params) {
    return guaranteePowerApi.updateRateTable(params);
  },
  // 更新测算因子
  updateCalculatingFactor(ctx, params) {
    return guaranteePowerApi.updateCalculatingFactor(params);
  },
  // 发布
  publishProtectRight(ctx, params) {
    return guaranteePowerApi.publishProtectRight(params);
  },
  // 下架
  downShelfProtectRight(ctx, params) {
    return guaranteePowerApi.downShelfProtectRight(params);
  },
  // 保险类型获取保障责任类型
  getListTypeTree(ctx, params) {
    return guaranteePowerApi.getListTypeTree(params);
  },
  // 获取保障责任医院列表
  protectRightHospital(ctx, params) {
    return guaranteePowerApi.protectRightHospital(params);
  }
};

export default {
  namespaced: true,
  state,
  actions
};
