import request from '@/utils/request';

// 电话问诊列表
export function callRecordList(data) {
    return request({
        url: 'inquiries/callRecord/callRecordList',
        method: 'post',
        data
    });
}
// 电话问诊详情
export function callRecordDetail(params) {
    return request({
        url: 'inquiries/diagnose/telOrderDetail',
        method: 'get',
        params
    });
}
// 给用户打电话
export function makeCall(params) {
    return request({
        url: 'inquiries/workOrder/makeCall',
        method: 'get',
        params
    });
}
// 发送问诊结果
export function sendResult(data) {
    return request({
        url: 'inquiries/workOrder/sendResult',
        method: 'post',
        data
    });
}
// 更新备注
export function updateRemark(data) {
    return request({
        url: 'inquiries/workOrder/update/remark',
        method: 'post',
        data
    });
}
