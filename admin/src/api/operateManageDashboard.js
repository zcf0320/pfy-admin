import request from '@/utils/request';

// 获取用户使用统计数据
export function getUserDashboard(params) {
  return request({
    url: `scm/dataReport/getUserDashboard/${params.create_time}`,
    method: 'get'
  });
}

// 获取服务类比数据
export function getOperateDashboard(params) {
  return request({
    url: `scm/dataReport/getOperateDashboard/${params.year}`,
    method: 'get'
  });
}
// 用户占比数据总览
export function userScale() {
  return request({
    url: `scm/user/userScale`,
    method: 'get'
  });
}

/**
 * 门店列表
 * @param {*} data
 * @returns
 */
export function getStoreList(data) {
  return request({
    url: '/scm/offlineDrugstore/findAllByPage',
    data,
    method: 'post'
  });
}
/**
 * 更新门店
 * @param {*} data
 * @returns
 */
export function updateStore(data) {
  return request({
    url: '/scm/offlineDrugstore/saveOrUpdate',
    data,
    method: 'post'
  });
}
/**
 * 获取门店详情
 * @param {*} id
 * @returns
 */
export function getStoreDetail(id) {
  return request({
    url: `/scm/offlineDrugstore/detail/${id}`,
    method: 'get'
  });
}
