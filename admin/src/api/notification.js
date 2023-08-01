import request from '@/utils/request';

// 短信模板列表
export function findSmsTemplate() {
    return request({
        url: 'scm/sms/record/findAllTemplate',
        method: 'get'
    });
}
// 查询员工全部消息通知
export function getAll(data) {
    return request({
        url: 'scm/notice/findAllByPage',
        method: 'post',
        data
    });
}
// 短信记录
export function smsList(data) {
    return request({
        url: 'scm/sms/record/findAllRecordByPage',
        method: 'post',
        data
    });
}
// 短信模板下拉列表
export function findTemplateName(params) {
    return request({
        url: 'scm/sms/record/findTemplateName/list',
        method: 'get',
        params
    });
}
// 短信模板列表
export function smsTemplate(params) {
    return request({
        url: 'scm/sms/record/findAllTemplate',
        method: 'get',
        params
    });
}

// 站内消息记录
export function messageList(data) {
    return request({
        url: 'scm/message/record/findAllRecordByPage',
        method: 'post',
        data
    });
}
//  站内消息下拉列表
export function searchMessage(params) {
    return request({
        url: `scm/message/record/findTemplateName/list/${params.channel}`,
        method: 'get'
    });
}
// 站内消息模板列表
export function messageTemplate(channel) {
    return request({
        url: `scm/message/record/findAllTemplate/${channel}`,
        method: 'get'
    });
}
// 标记已读消息
export function isRead(configId) {
    return request({
        url: `scm/notice/isRead/${configId}`,
        method: 'get'
    });
}
