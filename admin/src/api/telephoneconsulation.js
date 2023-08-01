import request from '@/utils/request';

// 电话问诊列表
export function callRecordList(params) {
    return request({
        url: 'health-management/callRecord/callRecordList',
        method: 'get',
        params
    });
}
// 电话问诊详情
export function callRecordDetail(params) {
    return request({
        url: 'health-management/diagnose/detail',
        method: 'get',
        params
    });
}
// 给用户打电话
export function makeCall(params) {
    return request({
        url: 'health-management/workOrder/makeCall',
        method: 'get',
        params
    });
}
// 发送问诊结果
export function sendResult(data) {
    return request({
        url: 'health-management/workOrder/sendResult',
        method: 'post',
        data
    });
}
// 跟新备注
export function updateRemark(data) {
    return request({
        url: 'health-management/workOrder/update/remark',
        method: 'post',
        data
    });
}
// 模糊搜索疾病列表
export function getDiseaseByName(params) {
    return request({
        url: 'health-management/medicine/getDiseaseByName',
        method: 'get',
        params
    });
}
// 获取全部科室多级
export function getAllDepartment(params) {
    return request({
      url: 'health-management/medicine/departments/all',
      method: 'get',
      params
    });
  }
// 通过基础药品库进行搜索
export function findDrug(name) {
    return request({
      url: `health-management/medicine/find/drug/${name}`,
      method: 'get'
    });
  }
