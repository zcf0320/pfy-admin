import * as settleApi from '@/api/settle';

const actions = {
  // 导出财务审批
  approvalDownload(ctx, params) {
    return settleApi.approvalDownload(params);
  },
  // 搜索类型
  getTypeList(ctx, params) {
    return settleApi.getTypeList(params);
  },
  // 搜索
  getKeywordList(ctx, params) {
    return settleApi.getKeywordList(params);
  },
  // 保险公司
  getCompanyData(ctx, params) {
    return settleApi.getCompanyData(params);
  },
  // 保单
  getPolicyData(ctx, params) {
    return settleApi.getPolicyData(params);
  },
  // 保险产品
  getProductData(ctx, params) {
    return settleApi.getProductData(params);
  },
  // 服务项
  getServiceItemData(ctx, params) {
    return settleApi.getServiceItemData(params);
  },
  // 服务单
  getServiceBillData(ctx, params) {
    return settleApi.getServiceBillData(params);
  },
  // 供应商
  getSupplierData(ctx, params) {
    return settleApi.getSupplierData(params);
  },
  // 获取结算明细详情
  getSupplierDetail(ctx, params) {
    return settleApi.getSupplierDetail(params);
  }
};

export default {
  namespaced: true,
  actions
};
