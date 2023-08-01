import * as insuranceCompanyApi from '@/api/insuranceCompany';

const actions = {
  // 下拉保险公司列表查询
  getInsuranceCompanyList(ctx, params) {
    return insuranceCompanyApi.getInsuranceCompanyList(params);
  },
  // 保险公司列表查询
  getInsuranceCompanyListInput(ctx, params) {
    return insuranceCompanyApi.getInsuranceCompanyListInput(params);
  },
  // 新增保险公司
  addInsuranceCompany(ctx, params) {
    return insuranceCompanyApi.addInsuranceCompany(params);
  },
  // 更新保险产品
  updateInsuranceCompany(ctx, params) {
    return insuranceCompanyApi.updateInsuranceCompany(params);
  },
  // 获取保险公司详情
  getInsuranceCompanyDetails(ctx, params) {
    return insuranceCompanyApi.getInsuranceCompanyDetails(params);
  },
  // 删除保险公司
  deleteInsuranceCompany(ctx, params) {
    return insuranceCompanyApi.deleteInsuranceCompany(params);
  },
  // 启用
  activeCompany(ctx, params) {
    return insuranceCompanyApi.activeCompany(params);
  },
  // 停用
  stopCompany(ctx, params) {
    return insuranceCompanyApi.stopCompany(params);
  },
  // 保单结算控制器
  // 保险公司的承保机构
  policyAgency(ctx, params) {
    return insuranceCompanyApi.policyAgency(params);
  },
  // 结算单详情
  getBillDetail(ctx, params) {
    return insuranceCompanyApi.getBillDetail(params);
  },
  // 结算单明细详情
  getBillDetailDetail(ctx, params) {
    return insuranceCompanyApi.getBillDetailDetail(params);
  },
  // 结算单明细列表
  getPolicyDetailList(ctx, params) {
    return insuranceCompanyApi.getPolicyDetailList(params);
  },
  // 结算单列表-分页
  getPolicyList(ctx, params) {
    return insuranceCompanyApi.getPolicyList(params);
  },
  // 结算单统计
  getPolicyStatistics(ctx, params) {
    return insuranceCompanyApi.getPolicyStatistics(params);
  },
  // //完成人列表
  getFinisherList(ctx, params) {
    return insuranceCompanyApi.getFinisherList(params);
  },
  // 结算规则列表
  getRuleList(ctx, params) {
    return insuranceCompanyApi.getRuleList(params);
  },
  // 配置结算规则
  setSettlementRule(ctx, params) {
    return insuranceCompanyApi.setSettlementRule(params);
  },
  // 账期列表
  getMonthList(ctx, params) {
    return insuranceCompanyApi.getMonthList(params);
  },
  setPolicySettlementDetail(ctx, params) {
    return insuranceCompanyApi.setPolicySettlementDetail(params);
  },
  setPolicySettlementMessage(ctx, params) {
    return insuranceCompanyApi.setPolicySettlementMessage(params);
  },
  exportPolicyDetail(ctx, params) {
    return insuranceCompanyApi.exportPolicyDetail(params);
  },
  getInsuranceCompanySalesList(ctx, params) {
    return insuranceCompanyApi.getInsuranceCompanySalesList(params);
  },
  addInsuranceSales(ctx, params) {
    return insuranceCompanyApi.addInsuranceSales(params);
  },
  updateInsuranceSales(ctx, params) {
    return insuranceCompanyApi.updateInsuranceSales(params);
  },
  getInsuranceSalesDetail(ctx, params) {
    return insuranceCompanyApi.getInsuranceSalesDetail(params);
  }
};

export default {
  namespaced: true,
  actions
};
