import * as personalInsuranceRecordApi from '@/api/personalInsuranceRecord';

const actions = {
  // 获取个险列表
  getRecordList(ctx, params) {
    return personalInsuranceRecordApi.getRecordList(params);
  },
  // 获取个险详情
  getRecordDetails(ctx, params) {
    return personalInsuranceRecordApi.getRecordDetails(params);
  },
  // 审核
  reviewRecord(ctx, params) {
    return personalInsuranceRecordApi.reviewRecord(params);
  },
  // 导出
  export(ctx, params) {
    return personalInsuranceRecordApi.exportList(params);
  }
};

export default {
  namespaced: true,
  actions
};
