import request from '@/utils/request';

// 上传图片
export function uploadPic(fd) {
  return request({
    url: 'scm/sys/uploadPic',
    method: 'post',
    data: fd,
    timeout: 15000
  });
}
// 上传pdf
export function uploadPdf(fd) {
  return request({
    url: 'scm/sys/uploadPdf',
    method: 'post',
    data: fd,
    timeout: 15000
  });
}
// 获取年份服务数据
export function getYearServiceData(fd) {
  return request({
    url: 'dataReport/getServiceList',
    method: 'post',
    data: fd
  });
}
// 获取数据字段
export function getKeyList() {
  return request({
    url: 'scm/data/list',
    method: 'get'
  });
}
// 获取地区级联数据
export function getAllCityList() {
  return request({
    url: 'scm/sys/allCity',
    method: 'get'
  });
}
// 获取职业列表数据
// export function getJobsList() {
//   return request({
//     url: 'scm/user/job',
//     method: 'get'
//   });
// }
// 获取操作日志
export function getSysLogs(params) {
  return request({
    url: 'scm/sys/log',
    method: 'get',
    params
  });
}
// 获取独立ai操作日志
export function getSysLogsFe(params) {
  return request({
    url: 'health-management/public/log/log',
    method: 'get',
    params
  });
}
// 获取图片地址
export function getImageUrl(params) {
  return request({
    url: 'scm/credential/detail',
    method: 'get',
    params
  });
}
// 获取配置选项
export function getSysConfig(params) {
  return request({
    url: 'scm/sys/config/all',
    method: 'get',
    params
  });
}

// 查询个人信用
export function getPersonCredit(params) {
  return request({
    url: 'scm/person/credit/idCardEnd',
    method: 'get',
    params
  });
}
// 修改密码
export function updatePassword(params) {
  return request({
    url: `scm/employeeManager/updatePassword/${params.userName}/${params.oldPwd}/${params.newPwd}`,
    method: 'get'
  });
}
// 获取未读系统消息
export function getNoticeList() {
  return request({
    url: 'scm/notice/list',
    method: 'get'
  });
}
// 获取保险产品职业列表
// export function getInsuredJob() {
//   return request({
//     url: 'scm/insuranceProduct/getInsuredJob',
//     method: 'get'
//   });
// }
// 上传结算凭证
export function uplaodCerti(fd, type) {
  return request({
    url: `scm/settlement/uplaodCertificate?type=${type}`,
    method: 'post',
    data: fd,
    timeout: 1500000
  });
}
// 获取用户角色
export function getUserRole() {
  return request({
    url: `scm/employeeManager/getUserRolesByName`,
    method: 'get'
  });
}
/**
 * 全部已读消息
 * @returns
 */
export function readAllNotice() {
  return request({
    url: 'scm/notice/isRead/all',
    method: 'get'
  });
}

/**
 * 获取呼叫中心token
 * @returns
 */
export function getCCCToken() {
  return request({
    url: 'scm/tencent/cloud/service/call/get/token',
    method: 'get'
  });
}

export function htmlToImg(content) {
  return request({
    url: 'insurance/insuranceProduct/htmlToImg',
    data: { content },
    method: 'post'
  });
}
