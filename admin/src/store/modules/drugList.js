import * as drugListApi from '@/api/drugList';

const actions = {
  // 医保药物列表
  getMedicineList(ctx, params) {
    return drugListApi.getMedicineList(params);
  },
  // 医保药物列表
  getCatalogs(ctx, params) {
    return drugListApi.getCatalogs(params);
  },
  // 添加目录
  addCatalog(ctx, params) {
    return drugListApi.addCatalog(params);
  }
};

export default {
  namespaced: true,
  actions
};
