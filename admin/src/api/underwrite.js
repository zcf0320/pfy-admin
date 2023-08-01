import request from '@/utils/request';

// 获取核保列表
export function getUnderwrite(data) {
    return request({
      url: 'scm/insurance/list',
      method: 'post',
      data
    });
}
// 获取核保详情
export function getUnderwriteDetails(params) {
  return request({
    url: 'scm/insurance/detail',
    method: 'get',
    params
  });
}
// 审核
export function reviewUnderwrite(params) {
  return request({
    url: 'scm/insurance/reviewed',
    method: 'get',
    params
  });
}
// 导出
export function exportList(data) {
  return request({
    url: 'scm/recordExport/queryAndExportInsuare',
    method: 'post',
    data
  });
}
