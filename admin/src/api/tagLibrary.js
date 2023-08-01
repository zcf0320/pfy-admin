import request from '@/utils/request';

// 新增标签
export function addTag(data) {
    return request({
        url: 'scm/sys/tags/add',
        method: 'post',
        data
    });
}

// 获取标签列表
export function getTagList(data) {
    return request({
        url: 'scm/sys/tags/list',
        method: 'post',
        data
    });
}

// 删除标签
export function deleteTag(params) {
    return request({
        url: 'scm/sys/tags/delete',
        method: 'get',
        params
    });
}

// 根据服务项获取二级标签
export function getChildTag(params) {
    return request({
        url: 'scm/sys/tags/getAllChildTags',
        method: 'get',
        params
    });
}
// 标签查询(分页)
export function getTagListSearch(data) {
    return request({
        url: 'scm/sys/tags/findAllByCondition',
        method: 'post',
        data
    });
}
