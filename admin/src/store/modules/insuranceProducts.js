import * as insuranceProductsApi from '@/api/insuranceProducts';

const state = {
  treatmentList: [],
  keyList: [],
  keys: {},
  policyData: {},
  productId: ''
};

const mutations = {
  set_TreatmentList: (state, data) => {
    state.treatmentList = data;
  },
  set_keyList: (state, data) => {
    state.keyList = data;
  },
  set_keys: (state, data) => {
    data.forEach(item => {
      state.keys[item.id] = item.name;
    });
  },
  SET_POLICY_DATA: (state, data) => {
    state.policyData = data;
  },
  SET_PRODUCTID: (state, data) => {
    state.productId = data;
  }
};

const actions = {
  // 新增或更新保险产品基础信息
  createOrUpdateBaseMsg(ctx, params) {
    return insuranceProductsApi.createOrUpdateBaseMsg(params);
  },
  // 更新保险产品主险权益
  updateMainRight(ctx, params) {
    return insuranceProductsApi.updateMainRight(params);
  },
  // 新增或更新保险产品保障计划
  createOrUpdatePlan(ctx, params) {
    return insuranceProductsApi.createOrUpdatePlan(params);
  },
  // 新增或更新保险产品服务包
  createOrUpdatePackage(ctx, params) {
    return insuranceProductsApi.createOrUpdatePackage(params);
  },
  // 新增或更新保险产品审核材料
  createOrUpdateReviewMaterial(ctx, params) {
    return insuranceProductsApi.createOrUpdateReviewMaterial(params);
  },
  // 获取保险产品详情
  getInsuranceProductsDetails(ctx, params) {
    return insuranceProductsApi.getInsuranceProductsDetails(params);
  },
  // 保险产品列表查询
  getInsuranceProductsList(ctx, params) {
    return insuranceProductsApi.getInsuranceProductsList(params);
  },
  // 删除保险产品
  deleteInsuranceProducts(ctx, params) {
    return insuranceProductsApi.deleteInsuranceProducts(params);
  },
  // 获取保险险种
  getInsuranceTypes(ctx, params) {
    return insuranceProductsApi.getInsuranceTypes(params);
  },
  // 根据险种获取保险责任
  getInsuranceTypeDetails({ commit }, params) {
    insuranceProductsApi.getInsuranceTypeDetails(params).then(res => {
      commit('SET_INSURANCE_TYPES', res.obj || []);
    });
  },
  // 获取保障计划
  getDetailPlan(ctx, params) {
    return insuranceProductsApi.getDetailPlan(params);
  },
  // 更新保险内容
  updateContent(ctx, params) {
    return insuranceProductsApi.updateContent(params);
  },
  // 更新投保规则
  saveRules(ctx, params) {
    return insuranceProductsApi.saveRules(params);
  },
  // 获取主险权益
  getAllMain(ctx, params) {
    return insuranceProductsApi.getAllMain(params);
  },
  // 获取保障责任保额list
  getProtectPremiums(ctx, params) {
    return insuranceProductsApi.getProtectPremiums(params);
  },
  // 检验保险产品名称是否重复
  checkName(ctx, params) {
    return insuranceProductsApi.checkName(params);
  },
  // 发布
  publishProduct(ctx, params) {
    return insuranceProductsApi.publishProduct(params);
  },
  // 下架
  downShelfProduct(ctx, params) {
    return insuranceProductsApi.downShelfProduct(params);
  },
  // 屏蔽链接
  shield(ctx, params) {
    return insuranceProductsApi.shield(params);
  },
  // 不屏蔽链接
  unShield(ctx, params) {
    return insuranceProductsApi.unShield(params);
  },
  // 保险产品签约地区
  getSignedArea(ctx, params) {
    return insuranceProductsApi.getSignedArea(params);
  },
  // 获取费率表
  getRightRates(ctx, params) {
    return insuranceProductsApi.getRightRates(params);
  },
  // 生成保险产品链接
  getInsuranceLink(ctx, params) {
    return insuranceProductsApi.getInsuranceLink(params);
  },
  // 获取保险权益理赔配置
  getRightClaimConfigs(ctx, params) {
    return insuranceProductsApi.getRightClaimConfigs(params);
  },
  // 新增保险权益理赔配置
  saveRightClaimConfigs(ctx, params) {
    return insuranceProductsApi.saveRightClaimConfigs(params);
  },
  // // 修改保险权益理赔配置
  // updateRightClaimConfigs(ctx, params) {
  //     return insuranceProductsApi.updateRightClaimConfigs(params);
  // },
  // 检验保障责任名称是否重复
  checkGuaranteePowerName(ctx, params) {
    return insuranceProductsApi.checkGuaranteePowerName(params);
  },
  // 获取保障计划对应的服务包
  getPlanServicePackages(ctx, params) {
    return insuranceProductsApi.getPlanServicePackages(params);
  },
  // 获取服务项审核材料
  getClaimReviewServiceItems(ctx, params) {
    return insuranceProductsApi.getClaimReviewServiceItems(params);
  },
  // 获取预设设置配置
  getPresetSales(ctx, params) {
    return insuranceProductsApi.getPresetSales(params);
  },
  // 设置预设销量
  setPresetSales(ctx, params) {
    return insuranceProductsApi.setPresetSales(params);
  },
  getStatisticsAll(ctx, params) {
    return insuranceProductsApi.getStatisticsAll(params);
  },
  getStatistics(ctx, params) {
    return insuranceProductsApi.getStatistics(params);
  },
  // 根据名字查询保险产品列表
  getInsuranceProductByName(ctx, params) {
    return insuranceProductsApi.getInsuranceProductByName(params);
  },
  // 根据名称查询保障计划
  getInsurancePlansByName(ctx, params) {
    return insuranceProductsApi.getInsurancePlansByName(params);
  },
  // 获取服务项初始化疾病
  getServiceDefaultDisease(ctx, params) {
    return insuranceProductsApi.getServiceDefaultDisease(params);
  },
  // 保险产品数据明细
  getStatisticsProduct(ctx, params) {
    return insuranceProductsApi.getStatisticsProduct(params);
  },
  // 保险产品数据明细
  getProductData(ctx, params) {
    return insuranceProductsApi.getProductData(params);
  },
  // 保障理赔数据统计
  getInsuranceClaim(ctx, params) {
    return insuranceProductsApi.getInsuranceClaim(params);
  },
  // 查询保险产品简要信息(保障计划)
  getInsuranceShort(ctx, params) {
    return insuranceProductsApi.getInsuranceShort(params);
  },
  //  理赔数据统计药品统计
  getInsuranceClaimMedicine(ctx, params) {
    return insuranceProductsApi.getInsuranceClaimMedicine(params);
  },
  // 添加结算规则
  setCompanySettlementRule(ctx, params) {
    return insuranceProductsApi.setCompanySettlementRule(params);
  },
  // 查询结算规则列表
  getCompanySettlementRule(ctx, params) {
    return insuranceProductsApi.getCompanySettlementRule(params);
  },
  // 保单结算规则列表
  getPolicySettlementRule(ctx, params) {
    return insuranceProductsApi.getPolicySettlementRule(params);
  },
  // 保单结算规则设置
  setPolicySettlementRule(ctx, params) {
    return insuranceProductsApi.setPolicySettlementRule(params);
  },
  // 保障计划列表
  getPolicyplanRule(ctx, params) {
    return insuranceProductsApi.getPolicyplanRule(params);
  },
  // 整体保单数据统计
  getStatisticsPolicy(ctx, params) {
    return insuranceProductsApi.getStatisticsPolicy(params);
  },
  setPolicyData({ commit }, data) {
    commit('SET_POLICY_DATA', data);
  },
  setProductid({ commit }, data) {
    commit('SET_PRODUCTID', data);
  },
  // 保单用户数据统计
  getStatisticsUser(ctx, params) {
    return insuranceProductsApi.getStatisticsUser(params);
  },
  // 保单结算数据统计
  getStatisticsSettle(ctx, params) {
    return insuranceProductsApi.getStatisticsSettle(params);
  },
  // 保单服务项数据统计
  getStatisticsService(ctx, params) {
    return insuranceProductsApi.getStatisticsService(params);
  },
  // 保险产品列表查询
  getProdList(ctx, params) {
    return insuranceProductsApi.getProdList(params);
  },
  uploadGroupPolicy(ctx, params) {
    return insuranceProductsApi.uploadGroupPolicy(params);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
