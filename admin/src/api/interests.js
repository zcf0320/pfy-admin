import request from '@/utils/request';
// 获取赠送权益列表
export function listPresentation(data) {
    return request({
        url: 'scm/presentation/list',
        method: 'post',
        data
    });
}
// 获取赠送权益详情
export function detailPresentation(params) {
    return request({
        url: `scm/presentation/detail/${params}`,
        method: 'get'
    });
}
// 获取赠送权益列表
export function queryUserList(data) {
    return request({
        url: 'scm/presentation/queryUserList',
        method: 'post',
        data
    });
}
// 赠送权益新增保存
export function savePresentation(data) {
    return request({
        url: 'scm/presentation/save',
        method: 'post',
        data
    });
}
// 赠送权益编辑保存
export function updatePresentation(data) {
    return request({
        url: 'scm/presentation/update',
        method: 'post',
        data
    });
}
