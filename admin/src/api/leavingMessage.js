import request from '@/utils/request';

// 获取留言列表
export function getMessageList(data) {
    return request({
        url: 'scm/leavingMessage/list',
        method: 'post',
        data
    });
}
// 获取留言详情
export function getMessageDetail(params) {
    return request({
        url: 'scm/leavingMessage/detail',
        method: 'get',
        params
    });
}
// 备注留言
export function setMessageRemark(data) {
    return request({
        url: 'scm/leavingMessage/addHandleRemark',
        method: 'post',
        data
    });
}
// 完成留言
export function setMessageState(params) {
    return request({
        url: 'scm/leavingMessage/completeLeavingMessage',
        method: 'get',
        params
    });
}
