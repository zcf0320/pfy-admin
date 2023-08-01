import request from '@/utils/request';

// 获取在线服务列表
export function getOnlineServiceList(data) {
  return request({
    url: 'scm/onlineService/list',
    method: 'post',
    data
  });
}
// 获取在线服务详情
export function getOnlineServiceDetails(params) {
  return request({
    url: 'scm/onlineService/detail',
    method: 'get',
    params
  });
}
// 导出数据
export function exportOnlineService(data) {
  return request({
    url: 'scm/recordExport/onlineServiceList',
    method: 'post',
    data
  });
}
// 操作日志
export function onlineServiceLog(params) {
  return request({
    url: 'scm/onlineService/onlineServiceLog',
    method: 'get',
    params
  });
}
// 上传诉求报告
export function uploadReport(data) {
  return request({
    url: 'scm/onlineService/uploadDemandReport',
    method: 'post',
    data
  });
}
// 获取体检报告解读详情
export function getInterpretDetail(params) {
  return request({
    url: 'scm/serviceInfo/serviceCheckUp',
    method: 'get',
    params
  });
}
// 获取体检报告解读详情
export function OlgetInterpretDetail(params) {
  return request({
    url: 'scm/serviceInfo/serviceCheckUpOl',
    method: 'get',
    params
  });
}
// 获取糖尿病管理详情
export function getDiabetesDetail(id) {
  return request({
    url: `scm/diabetes/details/${id}`,
    method: 'get'
  });
}

// 获取在线糖尿病管理详情
export function OlgetDiabetesDetail(id) {
  return request({
    url: `scm/diabetes/detailsOl/${id}`,
    method: 'get'
  });
}
/**
 * 获取医加壹详情
 * @param {*} id
 * @returns
 */
export function getYjyDetail(id) {
  return request({
    url: `inquiries/diagnose/yjyDetail?id=${id}`,
    method: 'get'
  });
}

/**
 * 获取在线医加壹详情
 * @param {*} id
 * @returns
 */
export function OlgetYjyDetail(id) {
  return request({
    url: `inquiries/diagnose/yjyDetailOl?id=${id}`,
    method: 'get'
  });
}
/**
 * 下载医加壹服务材料
 * @param {*} serviceRecordId
 * @returns
 */
export function downloadYjyFiles(serviceRecordId) {
  return request({
    url: `scm/onlineService/downloadZip?serviceRecordId=${serviceRecordId}`,
    method: 'get'
  });
}
/**
 * 获取问卷列表
 * @param {*} serviceRecordId
 * @returns
 */
export function getQuestionnaireListById(serviceRecordId) {
  return request({
    url: `/scm/onlineService/questionnaire/list?serviceRecordId=${serviceRecordId}`,
    method: 'get'
  });
}
/**
 * 获取问卷详情
 * @param {*} id
 * @returns
 */
export function getQuestionnaireDetail(id) {
  return request({
    url: `/scm/onlineService/questionnaire/detail?id=${id}`,
    method: 'get'
  });
}

/**
 * 客服查询获取保单信息列表
 * @param {*} value
 * @returns
 */
export function getPolicyInfoList(value) {
  return request({
    url: `/scm/reverse/queryPolicyInfo?value=${value}`,
    method: 'get'
  });
}

/**
 * 在线cbt睡眠管理详情
 * @param {*} serviceRecordId
 * @returns
 */
export function OlgetSleepManage(params) {
  return request({
    url: 'health-management/public/sleepManage/getDetailByServiceRecordIdOl',
    method: 'get',
    params
  });
}

/**
 * 皮肤检测详情
 * @param {*} serviceRecordId
 * @returns
 */

export function getSkinCheckDetail(params) {
  return request({
    url: 'health-management/skin/manage/getSkinDetailByServiceRecordId',
    method: 'get',
    params
  });
}
/**
 * 在线皮肤检测详情
 * @param {*} serviceRecordId
 * @returns
 */
export function OlgetSkinCheckDetail(params) {
  return request({
    url: 'health-management/skin/manage/getSkinDetailByServiceRecordIdOl',
    method: 'get',
    params
  });
}

/**
 * 用户睡眠日记
 * @param {*} params
 * @returns
 */
export function getSleepRecordOl(params) {
  return request({
    url: 'health-management/public/sleepManage/getSleepRecordByRecordOl',
    method: 'get',
    params
  });
}

/**
 * 睡眠问卷结果
 * @param {*} params
 * @returns
 */
export function getQuestionResultByUser(params) {
  return request({
    url: 'health-management/public/sleepManage/getQuestionResultByRecordIdOl',
    method: 'get',
    params
  });
}
/**
 * 打卡记录趋势图
 * @param {*} params
 * @returns
 */
export function getPunchRecord(params) {
  return request({
    url: 'health-management/public/sleepManage/getTrendByRecordIdOl',
    method: 'get',
    params
  });
}
/**
 * 甲状腺使用详情
 * @param {*} serviceRecordId
 * @returns
 */
export function getThyroidDetailOnline(serviceRecordId) {
  return request({
    url: `health-management/public/thyroidManage/selectDetailByServiceRecordOl?serviceRecordId=${serviceRecordId}`,
    method: 'get'
  });
}
/**
 * 甲状腺测试问卷使用列表
 * @param {*} params
 * @returns
 */
export function getThyroidQuestionnaireRecordOnline(params) {
    return request({
        url: 'health-management/public/questionnaire/getQuestionResultByUserOl',
        method: 'get',
        params
    });
}
