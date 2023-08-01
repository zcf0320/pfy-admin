import * as inquiryManageApi from '@/api/inquiryManageFe';

const actions = {
  // 获取问诊记录列表
  getContentList(ctx, params) {
    return inquiryManageApi.getContentList(params);
  },
  // 获取独立问诊记录列表
  getFeContentList(ctx, params) {
    return inquiryManageApi.getFeContentList(params);
  },
  // 获取独立问诊详情
  getFeDetails(ctx, params) {
    return inquiryManageApi.getFeDetails(params);
  },
  // 获取问诊详情
  getDetails(ctx, params) {
    return inquiryManageApi.getDetails(params);
  },
  // 获取问诊过程
  getProcess(ctx, params) {
    return inquiryManageApi.getProcess(params);
  },
  // 获取独立问诊过程
  getProcessFe(ctx, params) {
    return inquiryManageApi.getProcessFe(params);
  },
  // 获取症状库列表
  getSymptomList(ctx, params) {
    return inquiryManageApi.getSymptomList(params);
  },
  // 获取疾病库列表
  getDiseaseList(ctx, params) {
    return inquiryManageApi.getDiseaseList(params);
  },
  // 获取疾病详情
  getDiseaseInfo(ctx, params) {
    return inquiryManageApi.getDiseaseInfo(params);
  },
  // 获取疾病标签
  getDiseaseLabel() {
    return inquiryManageApi.getDiseaseLabel();
  },
  // 获取疾病图谱
  getDiseaseAtlas(ctx, params) {
    return inquiryManageApi.getDiseaseAtlas(params);
  },
  // 获取慢性病列表
  getChronic(ctx, params) {
    return inquiryManageApi.getChronic(params);
  },
  // 获取常见病列表
  getCommonDiseases(ctx, params) {
    return inquiryManageApi.getCommonDiseases(params);
  },
  // 编辑疾病详情
  setDiseaseInfo(ctx, params) {
    return inquiryManageApi.setDiseaseInfo(params);
  },
  // 获取全部科室多级
  getAllDepartment(ctx, params) {
    return inquiryManageApi.getAllDepartment(params);
  },
  // 获取全部二级科室多级
  getSubsDepartment() {
    return inquiryManageApi.getSubsDepartment();
  },
  saveCommonWord(ctx, params) {
    return inquiryManageApi.saveCommonWord(params);
  },
  queryCommonWord(ctx, params) {
    return inquiryManageApi.queryCommonWord(params);
  },
  updateCommonWord(ctx, params) {
    return inquiryManageApi.updateCommonWord(params);
  },
  deleteCommonWord(ctx, params) {
    return inquiryManageApi.deleteCommonWord(params);
  },
  addCountCommonWord(ctx, params) {
    return inquiryManageApi.addCountCommonWord(params);
  }
};

export default {
  namespaced: true,
  actions
};
