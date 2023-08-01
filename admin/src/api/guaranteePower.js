import request from '@/utils/request';

// 创建保险权益
export function createProtectRight(data) {
    return request({
        url: 'insurance/protectRight/save',
        method: 'post',
        data
    });
}
// 获取保障责任列表
export function getProtectRightList(data) {
    return request({
        url: 'insurance/protectRight/list',
        method: 'post',
        data
    });
}
// 获取保障责任详情
export function getProtectRightDetail(params) {
    return request({
        url: 'insurance/protectRight/detail',
        method: 'get',
        params
    });
}
// 删除保障责任
export function deleteGuaranteePower(params) {
    return request({
        url: 'insurance/protectRight/delete',
        method: 'get',
        params
    });
}
// 更新基础信息
export function updateBaseMsg(data) {
    return request({
        url: 'insurance/protectRight/updateBaseMsg',
        method: 'post',
        data
    });
}
// 更新保额设置
export function updatePriceSetting(data) {
    return request({
        url: 'insurance/protectRight/updatePriceSetting',
        method: 'post',
        data
    });
}
// 更新费率表
export function updateRateTable(data) {
    return request({
        url: 'insurance/protectRight/updateRateTable',
        method: 'post',
        data
    });
}
// 更新测算因子
export function updateCalculatingFactor(data) {
    return request({
        url: 'insurance/protectRight/updateCalculatingFactor',
        method: 'post',
        data
    });
}
// 发布
export function publishProtectRight(params) {
    return request({
        url: 'insurance/protectRight/publishProtectRight',
        method: 'get',
        params
    });
}
// 下架
export function downShelfProtectRight(params) {
    return request({
        url: 'insurance/protectRight/downShelfProtectRight',
        method: 'get',
        params
    });
}

// 保险类型获取保障责任类型
export function getListTypeTree(params) {
    return request({
        url: 'insurance/protectRight/listTypeTree',
        method: 'get',
        params
    });
}

// 获取保障责任医院列表
export function protectRightHospital(params) {
    return request({
        url: `insurance/protectRight/hospital?rightId=${params.rightId}`,
        method: 'get'
    });
}
