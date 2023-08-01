import * as userManageApi from '@/api/userManage';

const actions = {
  // 获取保单列表
  getUserList(ctx, params) {
    return userManageApi.getUserList(params);
  },
  // 获取用户详情
  getUserDetails(ctx, params) {
    return userManageApi.getUserDetails(params);
  },
  // 导出数据
  exportUser(ctx, params) {
    return userManageApi.exportUser(params);
  },
  // 操作日志
  userLog(ctx, params) {
    return userManageApi.userLog(params);
  },
  // 查询无限次数服务记录
  getServiceList(ctx, params) {
    return userManageApi.getServiceList(params);
  },
  // 查询用户血压血糖
  getBloodValue(ctx, params) {
    return userManageApi.getBloodValue(params);
  },
  // 查找用药计划列表
  getDrugPlan(ctx, params) {
    return userManageApi.getDrugPlan(params);
  },
  // 用药详情
  getDurgPlanDetail(ctx, params) {
    return userManageApi.getDurgPlanDetail(params);
  },
  // 查询用户星币明细
  getUserScore(ctx, params) {
    return userManageApi.getUserScore(params);
  },

  // 用户收货地址
  getReceivingAddress(ctx, params) {
    return userManageApi.getReceivingAddress(params);
  },
  // 校验验证码
  checkVerificationCode(ctx, params) {
    return userManageApi.checkVerificationCode(params);
  },
  // 成功之后回调接口,删除暂存记录
  deleteTemporaryStorage(ctx, params) {
    return userManageApi.deleteTemporaryStorage(params);
  },
  // 回显暂存记录
  getTemporaryStorage(ctx, params) {
    return userManageApi.getTemporaryStorage(params);
  },
  // 预约暂存记录并且发送验证码(或者重新发送)
  userReceivingTemporaryStorage(ctx, params) {
    return userManageApi.userReceivingTemporaryStorage(params);
  },
  // 预约暂存记录并且发送验证码(或者重新发送)
  getConfig(ctx, params) {
    return userManageApi.getConfig(params);
  },
  // 获取token
  getToken(ctx, params) {
    return userManageApi.getToken(params);
  },
  // 获取口腔服务可选的省份和城市
  getCitys(ctx, params) {
    return userManageApi.getCitys(params);
  },
  // 获取对应城市的服务网点
  getSites(ctx, params) {
    return userManageApi.getSites(params);
  },
  // 获取对应城市的服务网点可预约日期
  getDate(ctx, params) {
    return userManageApi.getDate(params);
  },
  // 获取对应城市的服务网点可预约日期
  getTimes(ctx, params) {
    return userManageApi.getTimes(params);
  },
  // 实物商品兑换
  create(ctx, params) {
    return userManageApi.create(params);
  },
  // 实物商品兑换
  couponCode(ctx, params) {
    return userManageApi.couponCode(params);
  },
  // 实物商品规格
  productSpecifications(ctx, params) {
    return userManageApi.productSpecifications(params);
  },
  // 获取省市区
  getProvincesAndCities(ctx, params) {
    return userManageApi.getProvincesAndCities(params);
  },
  // 保存收货地址
  saveAddress(ctx, params) {
    return userManageApi.saveAddress(params);
  },

  // 确认预约
  addReserve(ctx, params) {
    return userManageApi.addReserve(params);
  },
  // 查找基本健康档案信息
  findHealthFile(ctx, params) {
    return userManageApi.findHealthFile(params);
  },
  // 查找HRA问卷
  findHRAQuestionnaireInfo(ctx, params) {
    return userManageApi.findHRAQuestionnaireInfo(params);
  },
  // 查找BMI问卷
  findBMIInfo(ctx, params) {
    return userManageApi.findBMIInfo(params);
  },
  // 查找病史图解详情(按月)
  findMedicalInfo(ctx, params) {
    return userManageApi.findMedicalInfo(params);
  },
  // 查找月经图解详情(按月)
  findMenstruationInfo(ctx, params) {
    return userManageApi.findMenstruationInfo(params);
  },
  // 查找运动图解详情(按月)
  findSportInfo(ctx, params) {
    return userManageApi.findSportInfo(params);
  },
  // 用户服务权益列表
  getUserRecordList(ctx, params) {
    return userManageApi.getUserRecordList(params);
  },
  // 修改头像
  updateAvatar(ctx, params) {
    return userManageApi.updateAvatar(params);
  },
  // 查询系统通知列表,只显示未读信息
  getUserInfo(ctx, params) {
    return userManageApi.getUserInfo(params);
  },
  // 用户画像
  getUserPotrait(ctx, params) {
    return userManageApi.getUserPotrait(params);
  },
  // 就医记录
  getMedicalRecord(ctx, params) {
    return userManageApi.getMedicalRecord(params);
  },
  // 查看检验检查和药品
  getMedicalRecordDetail(ctx, params) {
    return userManageApi.getMedicalRecordDetail(params);
  },
  // 查看检验检查和药品
  getCheckDetail(ctx, params) {
    return userManageApi.getCheckDetail(params);
  }
};

export default {
  namespaced: true,
  actions
};
