import request from '@/utils/request';

// 新增专栏文章
export function createHealthColumn(data) {
    return request({
        url: 'scm/healthColumnContent/save',
        method: 'post',
        data
    });
}
// 获取专栏文章列表
export function getHealthColumnList(data) {
    return request({
        url: 'scm/healthColumnContent/list',
        method: 'post',
        data
    });
}
// 专栏文章详情
export function getHealthColumnDetails(params) {
    return request({
        url: 'scm/healthColumnContent/detail',
        method: 'get',
        params
    });
}
// 专栏文章更新
export function healthColumnUpdate(data) {
    return request({
        url: 'scm/healthColumnContent/update',
        method: 'post',
        data
    });
}
// 删除专栏文章
export function deleteHealthColumn(params) {
    return request({
        url: 'scm/healthColumnContent/delete',
        method: 'get',
        params
    });
}

// 应用设置列表查询
export function getHealthColumnApplicationList(data) {
    return request({
        url: 'scm/healthColumnApplication/list',
        method: 'post',
        data
    });
}
// 应用设置新增
export function saveHealthColumnApplication(data) {
    return request({
        url: 'scm/healthColumnApplication/save',
        method: 'post',
        data
    });
}
// 应用设置详情
export function getHealthColumnApplicationDetails(params) {
    return request({
        url: 'scm/healthColumnApplication/detail',
        method: 'get',
        params
    });
}
// 应用设置更新
export function updateHealthColumnApplication(data) {
    return request({
        url: 'scm/healthColumnApplication/update',
        method: 'post',
        data
    });
}
// 应用设置删除
export function deleteHealthColumnApplication(params) {
    return request({
        url: 'scm/healthColumnApplication/delete',
        method: 'get',
        params
    });
}
// 发布
export function updatePostStatus(params) {
    return request({
        url: `scm/healthColumnContent/updatePostStatus/${params.id}/${
            params.postStatus
        }`,
        method: 'get'
    });
}
