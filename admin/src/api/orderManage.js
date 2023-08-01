import request from '@/utils/request';

// 获取订单列表
export function getOrderList(data) {
  return request({
    url: 'scm/order/list',
    method: 'post',
    data
  });
}
// 获取订单详情
export function getOrderDetails(params) {
  return request({
    url: 'scm/order/detail',
    method: 'get',
    params
  });
}
// 获取在线订单详情
export function OlgetOrderDetails(params) {
  return request({
    url: 'scm/order/detailOl',
    method: 'get',
    params
  });
}
// 获取供应商列表
export function getSupplierList(params) {
  return request({
    url: 'scm/order/supplierList',
    method: 'get',
    params
  });
}
// 购药订单处方单信息
export function orderPrescription(params) {
  return request({
    url: 'scm/order/orderPrescriptionInformation',
    method: 'get',
    params
  });
}
// 购药订单导出
export function exportOrderList() {
  return `${process.env.VUE_APP_BASE_API}scm/order/data/export`;
}

/**
 * 修改药品状态
 * @param {*} id
 * @returns
 */
export function updateDrugStatus(id) {
  return request({
    url: `/scm/order/updateCancelStatus?id=${id}`,
    method: 'get'
  });
}
