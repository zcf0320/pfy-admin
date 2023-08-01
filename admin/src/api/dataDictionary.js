
import request from '@/utils/request';
// 获取医院列表
export function getHospitalList(data) {
    return request({
        url: 'claim/hospitals/all',
        method: 'post',
        data
    });
}
// 获取医院详情
export function getHospitalDetail(params) {
    return request({
        url: 'claim/hospitals/detail',
        method: 'get',
        params
    });
}
// 获取手术列表
export function getSurgicalLibrary(params) {
    return request({
        url: 'claim/operations/all',
        method: 'get',
        params
    });
}
// 获取检验检查类型
export function getInspectionType(params) {
    return request({
        url: 'claim/checks/series',
        method: 'get',
        params
    });
}
// 获取检查检验列表
export function getInspectionList(params) {
    return request({
        url: 'claim/checks/all',
        method: 'get',
        params
    });
}
// 获取手术列表
export function getSurgicalList(params) {
    return request({
        url: 'claim/operations/all',
        method: 'get',
        params
    });
}
// 获取检验检查详情
export function getChecksDetail(params) {
    return request({
        url: 'claim/checks/detail',
        method: 'get',
        params
    });
}
// 获取食物分类
export function getFoodClassify() {
    return request({
        url: 'scm/food/classify',
        method: 'get'
    });
}
// 获取食物列表
export function getFoodList(params) {
    return request({
        url: 'scm/food/list',
        method: 'get',
        params
    });
}
// 获取运动列表
export function getSportList(params) {
    return request({
        url: 'scm/sport/list',
        method: 'get',
        params
    });
}
/**
 * 上传药品
 * @param {*} data
 * @returns
 */
export function uploadMedicine(data) {
    return request({
        url: 'claim/insurance/medicine/import',
        method: 'post',
        data
    });
}
