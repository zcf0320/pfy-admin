import request from '@/utils/request';

// 获取团险列表
export function getRecordList(data) {
    return request({
      url: 'insurance/underwriting/group/list',
      method: 'post',
      data
    });
}
// 获取团险详情
export function getRecordDetails(params) {
  return request({
    url: 'insurance/underwriting/group/detail',
    method: 'get',
    params
  });
}
// 审核
export function reviewRecord(params) {
  return request({
    url: 'insurance/underwriting/group/review',
    method: 'get',
    params
  });
}
// 导出
export function exportList(data) {
  return request({
    url: 'insurance/export/queryGroupInsuranceAndExport',
    method: 'post',
    data
  });
}
// 获取团险被保人信息
export function getInsuredPeoples(data) {
  return request({
    url: 'insurance/underwriting/group/insuredPeoples/list',
    method: 'post',
    data
  });
}
// 被保人列表导出
export function exportInsuredPeoples(params) {
  return request({
    url: 'insurance/underwriting/group/insuredPeoples/export',
    method: 'get',
    params
  });
}
