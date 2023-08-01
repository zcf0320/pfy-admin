import * as supplierApi from '@/api/supplier';

const state = {
  // 证件弹框显示
  cardModalShow: false
};

const mutations = {
  // 修改数据弹框
  SET_CARD_MODAL: (state, data) => {
    state.cardModalShow = data;
  }
};

const actions = {
  // 新增证件
  addCredentials(ctx, params) {
    return supplierApi.addCredentials(params);
  },
  // 新增供应商
  addSupplier(ctx, params) {
    return supplierApi.addSupplier(params);
  },
  // 获取供应商列表
  getProviderList(ctx, params) {
    return supplierApi.getProviderList(params);
  },
  // 供应商详情
  getProviderDetail(ctx, params) {
    return supplierApi.getProviderDetail(params);
  },
  // 编辑供应商
  updateProvider(ctx, params) {
    return supplierApi.updateProvider(params);
  },
  // 删除证件
  deleteCredential(ctx, params) {
    return supplierApi.deleteCredential(params);
  },
  // 删除供应商
  deleteSupplier(ctx, params) {
    return supplierApi.deleteSupplier(params);
  },
  // 供应商企业名称去重校验
  checkDistinctName(ctx, params) {
    return supplierApi.checkDistinctName(params);
  },
  // 供应商简称去重校验
  checkDistinctSimpleName(ctx, params) {
    return supplierApi.checkDistinctSimpleName(params);
  },
  // 健告问卷选项列表
  healthOptionList(ctx, params) {
    return supplierApi.healthOptionList(params);
  },
  // 健告选项修改/新增
  healthOptionSave(ctx, params) {
    return supplierApi.healthOptionSave(params);
  },
  // 健告选项详情
  healthOptionDetail(ctx, params) {
    return supplierApi.healthOptionDetail(params);
  },
  // 健告选项删除
  deleteOption(ctx, params) {
    return supplierApi.deleteOption(params);
  },
  // 健告问卷列表
  healthQuesList(ctx, params) {
    return supplierApi.healthQuesList(params);
  },
  // 健告问卷修改/新增
  healthQuesEdit(ctx, params) {
    return supplierApi.healthQuesEdit(params);
  },
  // 健告问卷状态修改
  healthQuesStatus(ctx, params) {
    return supplierApi.healthQuesStatus(params);
  },
  // 健告问卷详情
  healthQuesDetail(ctx, params) {
    return supplierApi.healthQuesDetail(params);
  },
  // 健告问卷删除
  deleteQues(ctx, params) {
    return supplierApi.deleteQues(params);
  },
  // 修改结算规则
  saveSettlementRule(ctx, params) {
    return supplierApi.saveSettlementRule(params);
  },
  // 获取结算规则
  getSettlRule(ctx, params) {
    return supplierApi.getSettlRule(params);
  },
  // 获取所有结算详情列表
  getSettlementDetails(ctx, params) {
    return supplierApi.getSettlementDetails(params);
  },
  // 禁用供应商账号状态
  releaseProvider(ctx, params) {
    return supplierApi.releaseProvider(params);
  },
  // 启用供应商账号状态
  enableProvider(ctx, params) {
    return supplierApi.enableProvider(params);
  },
  // 查看服务项涉及
  queryUsersAndPackages(ctx, params) {
    return supplierApi.queryUsersAndPackages(params);
  },
  // 查看服务项涉及服务包
  getRelatePackages(ctx, params) {
    return supplierApi.getRelatePackages(params);
  },
  // 查看服务项涉及用户
  getRelateUsers(ctx, params) {
    return supplierApi.getRelateUsers(params);
  },
  // 服务项停止合作
  updateCorpStatus(ctx, params) {
    return supplierApi.updateCorpStatus(params);
  },
  // 查找服务项集合
  findServiceInfoList(ctx, params) {
    return supplierApi.findServiceInfoList(params);
  },
  // 合同列表
  findContract(ctx, params) {
    return supplierApi.findContract(params);
  },
  // 保存或修改合同
  saveContract(ctx, params) {
    return supplierApi.saveContract(params);
  },
  // 合同详情
  contractDetail(ctx, params) {
    return supplierApi.contractDetail(params);
  },
  // 合同删除
  contractDelete(ctx, params) {
    return supplierApi.contractDelete(params);
  },
  // 证件详情
  credentialDetail(ctx, params) {
    return supplierApi.credentialDetail(params);
  },
  // 获取保司结算列表
  getCompanySettlementList(ctx, params) {
    return supplierApi.getCompanySettlementList(params);
  },
  // 获取保司结算详情
  getCompanySettlementDetail(ctx, params) {
    return supplierApi.getCompanySettlementDetail(params);
  },
  // 获取保司结算详情列表
  getCompanySettlementDetailList(ctx, params) {
    return supplierApi.getCompanySettlementDetailList(params);
  },
  // 获取保司结算详情详情
  getCompanySettlementDetailDetail(ctx, params) {
    return supplierApi.getCompanySettlementDetailDetail(params);
  },
  // 结算单详情更新
  setCompanySettlementDetail(ctx, params) {
    return supplierApi.setCompanySettlementDetail(params);
  },
  // 结算单统计
  getSettlementStatistics(ctx, params) {
    return supplierApi.getSettlementStatistics(params);
  },
  // 完成人列表
  getFinisherList(ctx, params) {
    return supplierApi.getFinisherList(params);
  },
  // 账期列表
  getSettlementMonth(ctx, params) {
    return supplierApi.getSettlementMonth(params);
  },
  // 保险公司的承保机构
  getAgencyList(ctx, params) {
    return supplierApi.getAgencyList(params);
  },
  // 服务项列表查询
  getServiceList() {
    return supplierApi.getServiceList();
  },
  // 留言
  setCompanySettlementMessage(ctx, params) {
    return supplierApi.setCompanySettlementMessage(params);
  },
  // 理赔结算统计
  getSettleDetailStatistics(ctx, params) {
    return supplierApi.getSettleDetailStatistics(params);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
