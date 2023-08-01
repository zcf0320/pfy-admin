import * as commodityExchangeApi from '@/api/commodityExchange';

const actions = {
  // 获取虚拟商品兑换列表
  virtualList(ctx, params) {
    return commodityExchangeApi.virtualList(params);
  },
  // 获取实物商品兑换列表
  physicalList(ctx, params) {
    return commodityExchangeApi.physicalList(params);
  },
  // 获取虚拟商品兑换详情
  virtualDetail(ctx, params) {
    return commodityExchangeApi.virtualDetail(params);
  },
  // 获取实物商品兑换详情
  physicalDetail(ctx, params) {
    return commodityExchangeApi.physicalDetail(params);
  },
  // 更新物流信息
  updateLogistics(ctx, params) {
    return commodityExchangeApi.updateLogistics(params);
  },
  // 获取物流公司名单
  getCourierCompanyList(ctx, params) {
    return commodityExchangeApi.getCourierCompanyList(params);
  },
  // 实物商品列表导出
  queryAndExportPhysicalCommodityExchange(ctx, params) {
    return commodityExchangeApi.queryAndExportPhysicalCommodityExchange(params);
  },
  // 虚拟商品列表导出
  queryAndExportVirtualCommodityExchange(ctx, params) {
    return commodityExchangeApi.queryAndExportVirtualCommodityExchange(params);
  }
};

export default {
  namespaced: true,
  actions
};
