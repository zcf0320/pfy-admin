import request from '@/utils/request';
import Axios from 'axios';
import { getToken } from '@/utils/auth';

// 获取查找所有在线服务
export function listTreatment(params) {
    return request({
        url: 'scm/secondaryTreatment/findAllByPage',
        method: 'post',
        data: params
    });
}
// 添加服务及审核材料
export function saveServiceAndMaterial(params) {
    return request({
        url: 'scm/secondaryTreatment/saveServiceAndMaterial',
        method: 'post',
        data: params
    });
}
// 修改用户配置
export function updateUserinfoConfig(params) {
    return request({
        url: 'scm/secondaryTreatment/updateUserinfoConfig',
        method: 'post',
        data: params
    });
}
// 获取二次诊疗列表
export function getSecondaryTreatmentList(params) {
    return request({
        url: 'scm/secondaryTreatment/findByCondition',
        method: 'post',
        data: params
    });
}
// 获取二次诊疗详情
export function detailSecondaryTreatment(params) {
    return request({
        url: `scm/secondaryTreatment/findRecord/${params}`,
        method: 'get'
    });
}
// 获取二次诊疗详情
export function OldetailSecondaryTreatment(params) {
    return request({
        url: `scm/secondaryTreatment/findRecordOl/${params}`,
        method: 'get'
    });
}
// 审核通过
export function passSecondaryTreatment(data) {
    return request({
        url: 'scm/secondaryTreatment/pass',
        method: 'post',
        data
    });
}
// 审核不通过
export function rejectSecondaryTreatment(params) {
    return request({
        url: `scm/secondaryTreatment/reject`,
        method: 'post',
        data: params
    });
}
// 查看材料
export function initSecondaryTreatment(serviceSettingsId) {
    return request({
        url: `scm/secondaryTreatment/findServiceAndMaterial/${serviceSettingsId}`,
        method: 'get'
    });
}
// 删除在线服务
export function deleteSecondaryTreatment(id) {
    return request({
        url: `scm/secondaryTreatment/delete/${id}`,
        method: 'get'
    });
}
/**
 * 多学科会诊导出
 * @param {*} params
 * @returns
 */
export function exportMultiConsulation(params) {
    return Axios.get(`${
        process.env.VUE_APP_BASE_API
    }scm/secondaryTreatment/multidisciplinaryConsultation/export`, {
        timeout: 1500000,
        headers: {
            'Content-Type': 'application/octet-stream',
            'Authorization': getToken()
        },
        params,
        responseType: 'blob'
    });
}
