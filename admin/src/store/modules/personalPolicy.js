import * as personalPolicyApi from '@/api/personalPolicy';

const actions = {
  // 获取保单列表
  getPolicyList(ctx, params) {
    return personalPolicyApi.getPolicyList(params);
  },
  // 保单导入确认
  submitPolicy(ctx, params) {
    return personalPolicyApi.submitPolicy(params);
  },
  // 获取保单详情
  getPolicyDetails(ctx, params) {
    return personalPolicyApi.getPolicyDetails(params);
  },
  // 保单撤单
  cancelPolicy(ctx, params) {
    return personalPolicyApi.cancelPolicy(params);
  },
  // 导出数据
  exportPolicy(ctx, params) {
    return personalPolicyApi.exportPolicy(params);
  }
};

export default {
  namespaced: true,
  actions
};
