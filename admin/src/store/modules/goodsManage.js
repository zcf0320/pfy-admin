import * as goodsManageApi from '@/api/goodsManage';

const actions = {
  // 获取商品列表
  getGoodsList(ctx, params) {
    return goodsManageApi.getGoodsList(params);
  },
  // 获取商品详情
  getGoodsDetails(ctx, params) {
    return goodsManageApi.getGoodsDetails(params);
  },
  // 获取疾病列表
  getDisease(ctx, params) {
    return goodsManageApi.getDisease(params);
  },
  // 获取商品分类
  getMedicineTypes(ctx, params) {
    return goodsManageApi.getMedicineTypes(params);
  },
  // 保存销售信息
  saveSaleMsg(ctx, params) {
    return goodsManageApi.saveSaleMsg(params);
  },
  // 更改销售状态
  changeState(ctx, params) {
    return goodsManageApi.changeState(params);
  },
  // 获取分类数据
  getTypeCount(ctx, params) {
    return goodsManageApi.getTypeCount(params);
  },
  // 模糊搜索疾病列表
  getDiseaseByName(ctx, params) {
    return goodsManageApi.getDiseaseByName(params);
  },
  // 修改药品图片信息
  saveGraphicDetails(ctx, params) {
    return goodsManageApi.saveGraphicDetails(params);
  },
  getRightDiseaseByName(ctx, params) {
    return goodsManageApi.getRightDiseaseByName(params);
  },
  getRightDrugsByName(ctx, params) {
    return goodsManageApi.getRightDrugsByName(params);
  }
};

export default {
  namespaced: true,
  actions
};
