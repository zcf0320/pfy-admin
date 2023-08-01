import request from '@/utils/request';
import axios from 'axios';
// 获取预约服务列表
export function getAppointmentServiceList(data) {
  return request({
    url: 'scm/reverse/list',
    method: 'post',
    data
  });
}
// 新增企业预约
export function createAppointment(data) {
  return request({
    url: 'scm/reverse/saveRecord',
    method: 'post',
    data
  });
}
// 预约详情
export function getAppointmentServiceDetails(params) {
  return request({
    url: 'scm/reverse/detail',
    method: 'get',
    params
  });
}
// 关闭预约
export function closeAppointment(params) {
  return request({
    url: 'scm/reverse/close',
    method: 'get',
    params
  });
}
// 更新预约
export function updateAppointment(data) {
  return request({
    url: 'scm/reverse/update',
    method: 'post',
    data
  });
}
// 导出数据
export function exportAppointment(data) {
  return request({
    url: 'scm/recordExport/reverseList',
    method: 'post',
    data
  });
}
// 服务内容改变请求城市列表
export function serviceInfoChange(params) {
  return request({
    url: 'scm/reverse/serviceCitys',
    method: 'get',
    params
  });
}
// 保存预约人员名单
export function saveManyPeople(data) {
  return request({
    url: 'scm/reverse/saveMany',
    method: 'post',
    data
  });
}
// 审核预约
export function reviewedAppointment(data) {
  return request({
    url: 'scm/reverse/reviewed',
    method: 'post',
    data
  });
}
// 获取个人操作日志
export function getLogs(params) {
  return request({
    url: 'scm/reverse/personLog',
    method: 'get',
    params
  });
}
// 获取预约结算
export function getSettlementdetail(params) {
  return request({
    url: 'scm/reverse/reverseBySettlementdetail',
    method: 'get',
    params
  });
}
// 保存预约核销码
export function updateVerificationCode(params) {
  const { reserveId, code } = params;
  return request({
    url: `scm/reverse/updateVerificationCode/${reserveId}/${code}`,
    method: 'get'
  });
}

/**
 * 重疾绿通导出
 * @param {*} params
 * @returns
 */
export function exportMajorDisease(params) {
  return axios.get(
    `${process.env.VUE_APP_BASE_API}scm/reverse/majorDisease/export/`,
    {
      headers: {
        'Content-Type': 'application/octet-stream'
      },
      responseType: 'blob',
      method: 'get',
      params
    }
  );
}

/**
 * 获取审核材料
 * @param {*} id
 * @returns
 */
export function getMaterialDetail(id) {
  return request({
    url: `scm/reverse/materialDetail/${id}`,
    method: 'get'
  });
}

/**
 * 个人预约修改
 * @param {*} data
 * @returns
 */
export function updateReserve(data) {
    return request({
        url: 'scm/reverse/reserveDetailUpdate',
        data,
        method: 'post'
    });
}

/**
 * 是否服务核销
 * @param {*} data
 * @returns
 */
export function IfCancellation(data) {
  return request({
      url: '/scm/reverse/writeoffStatusUpdate',
      data,
      method: 'post'
  });
}
/**
 * 上传预约名单
 * @param {*} data
 * @returns
 */
export function uploadAppointmentNameList(data) {
    return request({
        url: 'scm/reverse/upload',
        method: 'post',
        data
    });
}
