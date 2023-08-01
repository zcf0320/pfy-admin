import request from '@/utils/request';

// 获取保单列表
export function getPolicyList(data) {
    return request({
        url: 'insurance/groupPolicyManage/groupList',
        method: 'post',
        data
    });
}
// 新增保单
export function createPolicy(data) {
    return request({
        url: 'insurance/groupPolicyManage/groupAdd',
        method: 'post',
        data
    });
}
// 获取保单详情
export function getPolicyDetails(params) {
    return request({
        url: 'insurance/groupPolicyManage/groupDetail',
        method: 'get',
        params
    });
}
// 保单撤单
export function cancelPolicy(params) {
    return request({
        url: 'insurance/groupPolicyManage/groupClose',
        method: 'get',
        params
    });
}
// 导出数据
export function exportPolicy(data) {
    return request({
        url: 'insurance/recordExport/policyList',
        method: 'post',
        data
    });
}
// 获取团险被保人名单
export function groupPolicyPersonList(data) {
    return request({
        url: 'insurance/groupPolicyManage/groupPolicyPersonList',
        method: 'post',
        data
    });
}
// 获取保险产品保障计划列表
export function getPlanList(params) {
    return request({
        url: `insurance/insuranceProduct/getPlanList/${params.insuranceProductId}`,
        method: 'get'
    });
}
