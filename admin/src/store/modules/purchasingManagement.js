import * as purchasingManagementApi from '@/api/purchasingManagement';

const actions = {
  // 采购管理列表
  getPurchasingList(ctx, params) {
    return purchasingManagementApi.getPurchasingList(params);
  },
  // 采购管理详情
  getPurchasingDetail(ctx, params) {
    return purchasingManagementApi.getPurchasingDetail(params);
  },
  // 采购管理公司信息修改
  updateInfo(ctx, params) {
    return purchasingManagementApi.updateInfo(params);
  },
  // 采购管理日志
  getLog(ctx, params) {
    return purchasingManagementApi.getLog(params);
  },
  // 采购状态跟新
  updateStatus(ctx, params) {
    return purchasingManagementApi.updateStatus(params);
  }
};

export default {
  namespaced: true,
  actions
};
