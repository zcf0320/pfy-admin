import request from '@/utils/request';

// 新增标签
export function addType(data) {
    return request({
        url: 'scm/serviceInfoType/add',
        method: 'post',
        data
    });
}

// 获取标签列表
export function getTypeList(data) {
    return request({
        url: 'scm/serviceInfoType/findAll',
        method: 'post',
        data
    });
}

// 删除标签
export function deleteType(params) {
    return request({
        url: 'scm/serviceInfoType/delete',
        method: 'get',
        params
    });
}

// 获取树形列表
export function getTreeList() {
    return request({
        url: 'scm/serviceInfoType/list',
        method: 'get'
    });
}

// 编辑标签
export function updateType(data) {
    return request({
        url: 'scm/serviceInfoType/update',
        method: 'post',
        data
    });
}
