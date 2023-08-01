import * as dataCenterApi from '@/api/dataCenter';

const actions = {

  // 查询本月是否存在数据
  hasServiceData(ctx, params) {
    return dataCenterApi.hasServiceData(params);
  },
  // 获取产品列表
  getProductList(ctx, params) {
    return dataCenterApi.getProductList(params);
  },
  // 选择产品
  selectProduct(ctx, params) {
    return dataCenterApi.selectProduct(params);
  },
  // 删除产品
  deleteProduct(ctx, params) {
    return dataCenterApi.deleteProduct(params);
  },
  // 保存产品
  saveProductData(ctx, params) {
    return dataCenterApi.saveProductData(params);
  }
};

export default {
  namespaced: true,
  actions
};
