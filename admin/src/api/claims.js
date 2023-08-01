import request from '@/utils/request';

// 获取理赔列表
export function getClaimsList(data) {
  return request({
    url: 'scm/claimSettelement/list',
    method: 'post',
    data
  });
}
// 获取理赔详情
export function getClaimsDetails(params) {
  return request({
    url: 'scm/claimSettelement/detail',
    method: 'get',
    params
  });
}
// 复核
export function claimSettelementCheck(data) {
  return request({
    url: '/scm/claimSettelement/check',
    method: 'post',
    data
  });
}
// 审核
export function reviewClaims(params) {
  return request({
    url: 'scm/claimSettelement/reviewd',
    method: 'get',
    params
  });
}
// 导出
export function exportList(data) {
  return request({
    url: 'scm/recordExport/queryAndExportClaimSettle',
    method: 'post',
    data
  });
}
