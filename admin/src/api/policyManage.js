import request from '@/utils/request';

// 获取保单列表
export function getPolicyList(data) {
    return request({
        url: 'insurance/policyManage/list',
        method: 'post',
        data
    });
}
// 确认导入保单
export function submitPolicy(data) {
    return request({
        url: 'insurance/policyManage/submit',
        method: 'post',
        data
    });
}
// 获取保单详情
export function getPolicyDetails(params) {
    return request({
        url: 'insurance/policyManage/detail',
        method: 'get',
        params
    });
}
// 保单撤单
export function cancelPolicy(params) {
    return request({
        url: 'insurance/policyManage/close',
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
