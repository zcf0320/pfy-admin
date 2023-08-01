import * as secondaryTreatmentApi from '@/api/secondaryTreatment';

const actions = {
  // 获取查找所有在线服务
  listTreatment(ctx, params) {
    return secondaryTreatmentApi.listTreatment(params);
  },
  // 添加服务及审核材料
  saveServiceAndMaterial(ctx, params) {
    return secondaryTreatmentApi.saveServiceAndMaterial(params);
  },
  // 修改用户配置
  updateUserinfoConfig(ctx, params) {
    return secondaryTreatmentApi.updateUserinfoConfig(params);
  },
  // 获取二次诊疗列表
  getSecondaryTreatmentList(ctx, params) {
    return secondaryTreatmentApi.getSecondaryTreatmentList(params);
  },
  // 获取二次诊疗详情
  detailSecondaryTreatment(ctx, params) {
    return secondaryTreatmentApi.detailSecondaryTreatment(params);
  },
   // 获取在线二次诊疗详情
  OldetailSecondaryTreatment(ctx, params) {
    return secondaryTreatmentApi.OldetailSecondaryTreatment(params);
  },
  // 审核通过
  passSecondaryTreatment(ctx, params) {
    return secondaryTreatmentApi.passSecondaryTreatment(params);
  },
  // 审核不通过
  rejectSecondaryTreatment(ctx, params) {
    return secondaryTreatmentApi.rejectSecondaryTreatment(params);
  },
  // 添加审核材料
  initSecondaryTreatment(ctx, params) {
    return secondaryTreatmentApi.initSecondaryTreatment(params);
  },
  // 添加审核材料
  deleteSecondaryTreatment(ctx, params) {
    return secondaryTreatmentApi.deleteSecondaryTreatment(params);
  }
};

export default {
  namespaced: true,
  actions
};
