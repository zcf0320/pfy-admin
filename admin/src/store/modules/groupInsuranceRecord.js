import * as groupInsuranceRecordApi from '@/api/groupInsuranceRecord';

const actions = {
  // 获取团险列表
  getRecordList(ctx, params) {
    return groupInsuranceRecordApi.getRecordList(params);
  },
  // 获取团险详情
  getRecordDetails(ctx, params) {
    return groupInsuranceRecordApi.getRecordDetails(params);
  },
  // 审核
  reviewRecord(ctx, params) {
    return groupInsuranceRecordApi.reviewRecord(params);
  },
  // 导出
  export(ctx, params) {
    return groupInsuranceRecordApi.exportList(params);
  },
  // 获取团险被保人列表
  getInsuredPeoples(ctx, params) {
    return groupInsuranceRecordApi.getInsuredPeoples(params);
  },
  // 被保人列表导出
  exportInsuredPeoples(ctx, params) {
    return groupInsuranceRecordApi.exportInsuredPeoples(params);
  }
};

export default {
  namespaced: true,
  actions
};
