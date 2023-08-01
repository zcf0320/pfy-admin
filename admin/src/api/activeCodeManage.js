import request from '@/utils/request';

// 获取券码列表
export function getActiveCodeList(data) {
  return request({
    url: 'scm/activeCode/list',
    method: 'post',
    data
  });
}
// 生成券码
export function createActiveCode(data) {
  return request({
    url: 'scm/activeCode/save',
    method: 'post',
    data
  });
}
// 获取券码详情
export function getActiveCodeDetails(params) {
  return request({
    url: 'scm/activeCode/detail',
    method: 'get',
    params
  });
}
// 作废券码
export function cancelActiveCode(params) {
  return request({
    url: 'scm/activeCode/close',
    method: 'get',
    params
  });
}
// 导出数据
export function exportActiveCode(data) {
  return request({
    url: 'scm/recordExport/activeCodeList',
    method: 'post',
    data
  });
}
