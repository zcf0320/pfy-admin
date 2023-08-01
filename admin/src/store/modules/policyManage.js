import * as policyManageApi from '@/api/policyManage';

const actions = {
  // 获取保单列表
  getPolicyList(ctx, params) {
    return policyManageApi.getPolicyList(params);
  },
  // 保单导入确认
  submitPolicy(ctx, params) {
    return policyManageApi.submitPolicy(params);
  },
  // 获取保单详情
  getPolicyDetails(ctx, params) {
    return policyManageApi.getPolicyDetails(params);
  },
  // 保单撤单
  cancelPolicy(ctx, params) {
    return policyManageApi.cancelPolicy(params);
  },
  // 导出数据
  exportPolicy(ctx, params) {
    return policyManageApi.exportPolicy(params);
  }
};

export default {
  namespaced: true,
  actions
};
