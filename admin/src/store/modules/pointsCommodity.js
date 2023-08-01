import * as pointsCommodityApi from '@/api/pointsCommodity';

const actions = {
  // 新增积分商品
  addPointsCommodity(ctx, params) {
    return pointsCommodityApi.addPointsCommodity(params);
  },
  // 获取积分商品列表
  getPointsCommodityList(ctx, params) {
    return pointsCommodityApi.getPointsCommodityList(params);
  },
  // 获取积分商品信息
  getPointsCommodityDetails(ctx, params) {
    return pointsCommodityApi.getPointsCommodityDetails(params);
  },
  // 更新积分商品信息
  updatePointsCommodity(ctx, params) {
    return pointsCommodityApi.updatePointsCommodity(params);
  },
  // 获取积分兑换记录
  getPointsExchangeList(ctx, params) {
    return pointsCommodityApi.getPointsExchangeList(params);
  },
  // 更新商品发布状态
  changePointsState(ctx, params) {
    return pointsCommodityApi.changePointsState(params);
  }
};

export default {
  namespaced: true,
  actions
};
