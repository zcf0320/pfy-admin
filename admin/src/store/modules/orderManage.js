import * as orderMangeApi from '@/api/orderManage';

const actions = {
  // 获取订单列表
  getOrderList(ctx, params) {
    return orderMangeApi.getOrderList(params);
  },
  // 获取订单详情
  getOrderDetails(ctx, params) {
    return orderMangeApi.getOrderDetails(params);
  },
  // 获取订单详情
  OlgetOrderDetails(ctx, params) {
    return orderMangeApi.OlgetOrderDetails(params);
  },
  // 供应商列表
  getSupplierList(ctx, params) {
    return orderMangeApi.getSupplierList(params);
  },
  // 购药订单处方单信息
  orderPrescription(ctx, params) {
    return orderMangeApi.orderPrescription(params);
  }
};

export default {
  namespaced: true,
  actions
};
