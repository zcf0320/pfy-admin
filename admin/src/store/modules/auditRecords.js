import * as auditRecordsApi from '@/api/auditRecords';

const actions = {
  // 查询理赔列表
  getClaimlist(ctx, params) {
    return auditRecordsApi.getClaimlist(params);
  },

  // 查询理赔详情
  getClaimDetail(ctx, params) {
    return auditRecordsApi.getClaimDetail(params);
  },

  // 获取审核类目下对应的原因
  getCategoryReasonList(ctx, params) {
    return auditRecordsApi.getCategoryReasonList(params);
  },

  // 审核通过
  passReview(ctx, params) {
    return auditRecordsApi.passReview(params);
  },

  // 审核不通过
  rejectReview(ctx, params) {
    return auditRecordsApi.rejectReview(params);
  },

  // 查询核赔预警统计列表
  getClaimStatisticsList(ctx, params) {
    return auditRecordsApi.getClaimStatisticsList(params);
  },

  // 核赔预警统计列表导出
  downClaimStatisticsList(ctx, params) {
    return auditRecordsApi.downClaimStatisticsList(params);
  },

  // 核赔预警详情
  claimStatisticsDetail(ctx, params) {
    return auditRecordsApi.claimStatisticsDetail(params);
  },

  // 核赔预警姓名列表
  getClaimName(ctx, params) {
    return auditRecordsApi.getClaimName(params);
  },

  // 核赔预警规则列表
  getClaimRules() {
    return auditRecordsApi.getClaimRules();
  },

  // 查询药品比价列表
  getDrugPriceList(ctx, params) {
    return auditRecordsApi.getDrugPriceList(params);
  },

  // 上传核赔
  uploadClaimExcel(ctx, params) {
    return auditRecordsApi.uploadClaimExcel(params);
  },

  // 下载核赔数据
  downFailModel(ctx, params) {
    return auditRecordsApi.downFailModel(params);
  },

  // 保存预警备注
  setClaimRemark(ctx, params) {
    return auditRecordsApi.setClaimRemark(params);
  },

  // 查询诊疗资料结构化数据
  getTreatmentStructured(ctx, params) {
    return auditRecordsApi.getTreatmentStructured(params);
  },

  // 模糊查询疾病
  getDiseaseAll(ctx, params) {
    return auditRecordsApi.getDiseaseAll(params);
  },

  // 模糊查询药品
  getDrugNameAll(ctx, params) {
    return auditRecordsApi.getDrugNameAll(params);
  },

  // 查询药品规格
  getSpecifications(ctx, params) {
    return auditRecordsApi.getSpecifications(params);
  },

  // 保存或修改诊疗资料结构化数据
  saveOrUpdate(ctx, params) {
    return auditRecordsApi.saveOrUpdate(params);
  },

  // 保存检查数据
  saveCheck(ctx, params) {
    return auditRecordsApi.saveCheck(params);
  },

  // 保存或修改医疗费用结算单
  saveMedicalExpense(ctx, params) {
    return auditRecordsApi.saveMedicalExpense(params);
  },

  // 保存或修改医疗发票
  saveMedicalInvoice(ctx, params) {
    return auditRecordsApi.saveMedicalInvoice(params);
  },

  // 保存或修改病例首页
  saveMedicalHomePage(ctx, params) {
    return auditRecordsApi.saveMedicalHomePage(params);
  },

  // 保存或修改银行卡
  saveBankCard(ctx, params) {
    return auditRecordsApi.saveBankCard(params);
  },

  // 保存或修改身份证
  saveIdentityCard(ctx, params) {
    return auditRecordsApi.saveIdentityCard(params);
  },

  // 模糊查找检查检验项目名称
  findCheckName(ctx, params) {
    return auditRecordsApi.findCheckName(params);
  },

  // 查找国籍列表
  findCountryList(ctx, params) {
    return auditRecordsApi.findCountryList(params);
  },

  // 查找银行列表
  findBankList(ctx, params) {
    return auditRecordsApi.findBankList(params);
  },

  // 查找民族列表
  findNationList(ctx, params) {
    return auditRecordsApi.findNationList(params);
  },

  // 查找二级科室列表
  findSecondDepartment(ctx, params) {
    return auditRecordsApi.findSecondDepartment(params);
  },

  // 查找补充资料用户使用状态
  findFurtherInformation(ctx, params) {
    return auditRecordsApi.findFurtherInformation(params);
  },

  // 查找补充资料用户使用状态
  findJobList(ctx, params) {
    return auditRecordsApi.findJobList(params);
  },
  // 药品分类
  classify(ctx, params) {
    return auditRecordsApi.classify(params);
  },
  // 药品分类上下移动
  classifyMove(ctx, params) {
    return auditRecordsApi.classifyMove(params);
  },
  // 审核日志
  reviewLog(ctx, params) {
    return auditRecordsApi.reviewLog(params);
  },
  // 药品分类选择
  classifySelected(ctx, params) {
    return auditRecordsApi.classifySelected(params);
  },
  // 查找检验检查项目明细
  findCheckDetail(ctx, params) {
    return auditRecordsApi.findCheckDetail(params);
  },
  // 获取核赔待审核数量
  getTipsNum(ctx, params) {
    return auditRecordsApi.getTipsNum(params);
  }
};
export default {
  namespaced: true,
  actions
};
