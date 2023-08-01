import request from '@/utils/request';
import axios from 'axios';
// 获取用户列表
export function getUserList(data) {
  return request({
    url: 'scm/user/manage/list',
    method: 'post',
    data
  });
}
// 获取用户详情
export function getUserDetails(params) {
  return request({
    url: 'scm/user/manage/detail',
    method: 'get',
    params
  });
}
// 导出数据
export function exportUser(data) {
  return request({
    url: 'scm/recordExport/userList',
    method: 'post',
    data
  });
}
// 操作日志
export function userLog(params) {
  return request({
    url: 'scm/user/userLog',
    method: 'get',
    params
  });
}
// 查询无限次数服务记录
export function getServiceList(params) {
  return request({
    url: 'scm/user/infiniteService',
    method: 'get',
    params
  });
}
// 获取用户血糖血压
export function getBloodValue(data) {
  return request({
    url: 'scm/user/bloodGlucoseAndPressureTrend',
    method: 'post',
    data
  });
}
// 获取用户星币明细
export function getUserScore(data) {
  return request({
    url: 'scm/scoreRecord/findAllByUserId',
    method: 'post',
    data
  });
}
// 查找用药计划列表
export function getDrugPlan(data) {
  return request({
    url: 'scm/medication/plan/findAllByPage',
    method: 'post',
    data
  });
}
// 用药详情
export function getDurgPlanDetail(data) {
  return request({
    url: 'scm/medication/plan/findHistory',
    method: 'post',
    data
  });
}
// 获取用户收货地址
export function getReceivingAddress(params) {
  return request({
    url: `scm/user/userReceivingAddress`,
    method: 'get',
    params
  });
}
// 获取用户收货地址
export function checkVerificationCode(data) {
  return request({
    url: 'scm/user/useService/checkVerificationCode',
    method: 'post',
    data
  });
}
// 成功之后回调接口,删除暂存记录
export function deleteTemporaryStorage(data) {
  return request({
    url: 'scm/user/useService/deleteTemporaryStorage',
    method: 'post',
    data
  });
}
// 成功之后回调接口,删除暂存记录
export function getTemporaryStorage(params) {
  return request({
    url: 'scm/user/useService/getTemporaryStorage',
    method: 'get',
    params
  });
}
// 预约暂存记录并且发送验证码(或者重新发送)
export function userReceivingTemporaryStorage(data) {
  return request({
    url: 'scm/user/useService/userReceivingTemporaryStorage',
    method: 'post',
    data
  });
}
// 预约暂存记录并且发送验证码(或者重新发送)
export function getConfig(params) {
  const { token } = params;
  delete params['token'];
  axios.defaults.headers.common['token'] = token;
  return axios({
    url: `${process.env.VUE_APP_BASE_API}user-center/reserve/provider/site`,
    method: 'get',
    params: params
  });
}
// 预约暂存记录并且发送验证码(或者重新发送)
export function addReserve(data) {
  const { token } = data;
  delete data['token'];
  axios.defaults.headers.common['token'] = token;
  return axios({
    url: `${process.env.VUE_APP_BASE_API}user-center/reserve/add`,
    method: 'post',
    data
  });
}
// 获取token
export function getToken(params) {
  return request({
    url: 'scm/user/useService/getToken',
    method: 'get',
    params
  });
}

// 获取口腔服务可选的省份和城市
export function getCitys(params) {
  const { token } = params;
  delete params['token'];
  axios.defaults.headers.common['token'] = token;
  return axios({
    url: `${process.env.VUE_APP_BASE_API}user-center/zhonghang/mouse/cities`,
    method: 'get',
    params
  });
}
// 获取对应城市的服务网点
export function getSites(params) {
  const { token } = params;
  delete params['token'];
  axios.defaults.headers.common['token'] = token;
  return axios({
    url: `${process.env.VUE_APP_BASE_API}user-center/zhonghang/mouse/sites`,
    method: 'get',
    params
  });
}
// 获取对应城市的服务网点可预约日期
export function getDate(params) {
  const { token } = params;
  delete params['token'];
  axios.defaults.headers.common['token'] = token;
  return axios({
    url: `${process.env.VUE_APP_BASE_API}user-center/zhonghang/mouse/date`,
    method: 'get',
    params
  });
}
// 获取对应网点的时间
export function getTimes(params) {
  const { token } = params;
  delete params['token'];
  axios.defaults.headers.common['token'] = token;
  return axios({
    url: `${process.env.VUE_APP_BASE_API}user-center/zhonghang/mouse/times`,
    method: 'get',
    params
  });
}
// 虚拟商品兑换
export function couponCode(data) {
  const { token } = data;
  delete data['token'];
  axios.defaults.headers.common['token'] = token;
  return axios({
    url: `${process.env.VUE_APP_BASE_API}user-center/onlineService/create/couponCode`,
    method: 'post',
    data
  });
}
// 实物商品兑换
export function create(data) {
  const { token } = data;
  delete data['token'];
  axios.defaults.headers.common['token'] = token;
  return axios({
    url: `${process.env.VUE_APP_BASE_API}user-center/physicalGoods/create`,
    method: 'post',
    data
  });
}
// 实物商品规格
export function productSpecifications(params) {
  const { token } = params;
  delete params['token'];
  axios.defaults.headers.common['token'] = token;
  return axios({
    url: `${process.env.VUE_APP_BASE_API}user-center/physicalGoods/productSpecifications`,
    method: 'get',
    params
  });
}
// 获取省市区
export function getProvincesAndCities(params) {
  const { token } = params;
  delete params['token'];
  axios.defaults.headers.common['token'] = token;
  return axios({
    url: `${process.env.VUE_APP_BASE_API}user-center/all/provincesAndCities`,
    method: 'get',
    params
  });
}
// 保存地址
export function saveAddress(data) {
  const { token } = data;
  delete data['token'];
  axios.defaults.headers.common['token'] = token;
  return axios({
    url: `${process.env.VUE_APP_BASE_API}user-center/third/user/address`,
    method: 'post',
    data
  });
}

/** ****************** 健康档案****************************/
// 查找基本健康档案信息
export function findHealthFile(userId) {
  return request({
    url: `scm/healthFile/findHealthFile/${userId}`,
    method: 'get'
  });
}
// 查找HRA问卷
export function findHRAQuestionnaireInfo(userId) {
  return request({
    url: `scm/healthFile/findHRAQuestionnaireInfo/${userId}`,
    method: 'get'
  });
}
// 查找BMI问卷
export function findBMIInfo(data) {
  return request({
    url: 'scm/healthFile/findBMIInfo',
    method: 'post',
    data
  });
}
// 查找病史图解详情(按月)
export function findMedicalInfo(data) {
  return request({
    url: 'scm/healthFile/findMedicalInfo',
    method: 'post',
    data
  });
}
// 查找月经图解详情(按月)
export function findMenstruationInfo(data) {
  return request({
    url: 'scm/healthFile/findMenstruationInfo',
    method: 'post',
    data
  });
}
// 查找运动图解详情(按月)
export function findSportInfo(data) {
  return request({
    url: 'scm/healthFile/findSportInfo',
    method: 'post',
    data
  });
}
// 用户服务权益列表
export function getUserRecordList(params) {
  return request({
    url: 'scm/user/userRecordList',
    method: 'get',
    params
  });
}

// 修改头像
export function updateAvatar(data) {
  return request({
    url: `scm/employeeManager/update/headPortrait`,
    method: 'post',
    data
  });
}
// 查询系统通知列表,只显示未读信息
export function getUserInfo() {
  return request({
    url: 'scm/notice/list',
    method: 'get'
  });
}
// 用户画像
export function getUserPotrait(params) {
  return request({
    url: `scm/user/userDetails?userId=${params.userId}`,
    method: 'get'
  });
}
// 就医记录
export function getMedicalRecord(params) {
  return request({
    url: `scm/medicalRecord/findAll/${params}`,
    method: 'get'
  });
}
// 查看检验检查和药品
export function getMedicalRecordDetail(params) {
  return request({
    url: `scm/medicalRecord/find/check/drug/${params}`,
    method: 'get'
  });
}
// 查看检查项目
export function getCheckDetail(params) {
  return request({
    url: `scm/medicalRecord/find/check/project/${params}`,
    method: 'get'
  });
}
/**
 * 获取用户家庭列表
 * @param {*} userId
 * @returns
 */
export function getFamilyList(userId) {
    return request({
        url: `scm/uc-user-family/queryUserFamilyList?userId=${userId}`,
        method: 'get'
    });
}
