import request from '@/utils/request';

// 采购管理列表
export function getPurchasingList(data) {
    return request({
        url: 'market/purchasingManagement/list',
        method: 'post',
        data
    });
}
// 采购管理详情
export function getPurchasingDetail(params) {
    return request({
        url: 'market/purchasingManagement/detail',
        method: 'get',
        params
    });
}
// 采购管理公司信息修改
export function updateInfo(data) {
    return request({
        url: 'market/purchasingManagement/companyInformation/update',
        method: 'post',
        data
    });
}
// 采购管理日志
export function getLog(params) {
    return request({
        url: 'market/purchasingManagement/purchasingLog',
        method: 'get',
        params
    });
}
// 采购管理状态更新
export function updateStatus(data) {
    return request({
        url: 'market/purchasingManagement/status/update',
        method: 'post',
        data
    });
}
