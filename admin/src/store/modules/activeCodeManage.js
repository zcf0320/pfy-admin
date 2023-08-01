import * as activeCodeManageApi from '@/api/activeCodeManage';

const actions = {
  // 获取券码列表
  getActiveCodeList(ctx, params) {
    return activeCodeManageApi.getActiveCodeList(params);
  },
  // 生成券码
  createActiveCode(ctx, params) {
    return activeCodeManageApi.createActiveCode(params);
  },
  // 获取券码详情
  getActiveCodeDetails(ctx, params) {
    return activeCodeManageApi.getActiveCodeDetails(params);
  },
  // 作废券码
  cancelActiveCode(ctx, params) {
    return activeCodeManageApi.cancelActiveCode(params);
  },
  // 导出数据
  exportActiveCode(ctx, params) {
    return activeCodeManageApi.exportActiveCode(params);
  }
};

export default {
  namespaced: true,
  actions
};
