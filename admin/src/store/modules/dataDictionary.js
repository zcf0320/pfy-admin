import * as dataDictionary from '@/api/dataDictionary';

const actions = {
  // 获取医院列表
  getHospitalList(ctx, params) {
    return dataDictionary.getHospitalList(params);
  },
  // 获取医院详情
  getHospitalDetail(ctx, params) {
    return dataDictionary.getHospitalDetail(params);
  },
  // 获取手术列表
  getSurgicalLibrary(ctx, params) {
    return dataDictionary.getSurgicalLibrary(params);
  },
  // 获取检验检查类型
  getInspectionType(ctx, params) {
    return dataDictionary.getInspectionType(params);
  },
  // 获取检查检验列表
  getInspectionList(ctx, params) {
    return dataDictionary.getInspectionList(params);
  },
  // 获取手术列表
  getSurgicalList(ctx, params) {
    return dataDictionary.getSurgicalList(params);
  },
  // 获取检验检查详情
  getChecksDetail(ctx, params) {
    return dataDictionary.getChecksDetail(params);
  },
  // 食物分类
  getFoodClassify(ctx, params) {
    return dataDictionary.getFoodClassify(params);
  },
  // 食物列表
  getFoodList(ctx, params) {
    return dataDictionary.getFoodList(params);
  },
  // 运动列表
  getSportList(ctx, params) {
    return dataDictionary.getSportList(params);
  }
};

export default {
  namespaced: true,
  actions
};
