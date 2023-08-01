import request from '@/utils/request';

// 获取评价列表
export function getContentList(data) {
    return request({
        url: 'scm/publishContent/list',
        method: 'post',
        data
    });
}
// 新增内容
export function addContent(data) {
    return request({
        url: 'scm/publishContent/save',
        method: 'post',
        data
    });
}
// 导出
export function exportContent(data) {
    return request({
        url: 'scm/recordExport/queryAndExportPublish',
        method: 'post',
        data
    });
}
// 获取文章详情
export function getDetails(params) {
    return request({
        url: 'scm/publishContent/detail',
        method: 'get',
        params
    });
}
// 更新内容
export function updateContent(data) {
    return request({
        url: 'scm/publishContent/update',
        method: 'post',
        data
    });
}
// 删除内容
export function deleteContent(params) {
    return request({
        url: 'scm/publishContent/delete',
        method: 'get',
        params
    });
}
// 获取标签
export function getTags(params) {
    return request({
        url: 'scm/publishContent/getTags',
        method: 'get',
        params
    });
}
// 更新内容  发布
export function publishContent(params) {
    return request({
        url: `scm/publishContent/updatePostStatus/${params.id}/${
            params.postStatus
        }`,
        method: 'get'
    });
}
// 发送邮件
export function emailsSend(data) {
    return request({
        url: `scm/publishContent/emails/send?publishContentId=${
            data.publishContentId
        }`,
        method: 'post'
    });
}
// 员工邮箱列表
export function getEmployee(employeeName) {
    return request({
        url: `scm/publishContent/emails/get?employeeName=${employeeName}`,
        method: 'post'
    });
}
