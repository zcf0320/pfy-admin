import request from '@/utils/request';

// 获取个险列表
export function getRecordList(data) {
    return request({
      url: 'insurance/underwriting/single/list',
      method: 'post',
      data
    });
}
// 获取个险详情
export function getRecordDetails(params) {
  return request({
    url: 'insurance/underwriting/single/detail/' + params,
    method: 'get'
  });
}
// 审核
export function reviewRecord(data) {
  return request({
    url: 'insurance/underwriting/single/review',
    method: 'post',
    data
  });
}
// 导出
export function exportList(data) {
  return request({
    url: 'insurance/export/querySingleInsuranceAndExport',
    method: 'post',
    data
  });
}
