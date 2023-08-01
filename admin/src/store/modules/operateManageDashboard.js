import * as operateManageDashboardApi from '@/api/operateManageDashboard';

const actions = {
  // 获取用户统计数据
  getUserDashboard(ctx, params) {
    return operateManageDashboardApi.getUserDashboard(params);
  },
  // 获取服务类比数据
  getOperateDashboard(ctx, params) {
    return operateManageDashboardApi.getOperateDashboard(params);
  },
  // 用户占比数据总览
  userScale(ctx, params) {
    return operateManageDashboardApi.userScale(params);
  }
};

export default {
  namespaced: true,
  actions
};
