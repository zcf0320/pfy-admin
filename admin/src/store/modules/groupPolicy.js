import * as groupPolicyApi from '@/api/groupPolicy';

const actions = {
  // 获取保单列表
  getPolicyList(ctx, params) {
    return groupPolicyApi.getPolicyList(params);
  },
  // 新增保单
  createPolicy(ctx, params) {
    return groupPolicyApi.createPolicy(params);
  },
  // 获取保单详情
  getPolicyDetails(ctx, params) {
    return groupPolicyApi.getPolicyDetails(params);
  },
  // 保单撤单
  cancelPolicy(ctx, params) {
    return groupPolicyApi.cancelPolicy(params);
  },
  // 导出数据
  exportPolicy(ctx, params) {
    return groupPolicyApi.exportPolicy(params);
  },
  // 获取被保人名单
  groupPolicyPersonList(ctx, params) {
    return groupPolicyApi.groupPolicyPersonList(params);
  },
  // 获取对应保险产品保障计划列表
  getPlanList(ctx, params) {
    return groupPolicyApi.getPlanList(params);
  }
};

export default {
  namespaced: true,
  actions
};
