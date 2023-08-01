import * as appointmentServiceApi from '@/api/appointmentService';

const actions = {
  // 获取预约服务列表
  getAppointmentServiceList(ctx, params) {
    return appointmentServiceApi.getAppointmentServiceList(params);
  },
  // 新增企业预约
  createAppointment(ctx, params) {
    return appointmentServiceApi.createAppointment(params);
  },
  // 预约详情
  getAppointmentServiceDetails(ctx, params) {
    return appointmentServiceApi.getAppointmentServiceDetails(params);
  },
  // 关闭预约
  closeAppointment(ctx, params) {
    return appointmentServiceApi.closeAppointment(params);
  },
  // 跟新预约
  updateAppointment(ctx, params) {
    return appointmentServiceApi.updateAppointment(params);
  },
  // 导出数据
  exportAppointment(ctx, params) {
    return appointmentServiceApi.exportAppointment(params);
  },
  // 服务内容改变请求城市列表
  serviceInfoChange(ctx, params) {
    return appointmentServiceApi.serviceInfoChange(params);
  },
  // 保存预约人员名单
  saveManyPeople(ctx, params) {
    return appointmentServiceApi.saveManyPeople(params);
  },
  // 审核预约
  reviewedAppointment(ctx, params) {
    return appointmentServiceApi.reviewedAppointment(params);
  },
  // 获取个人操作日志
  getLogs(ctx, params) {
    return appointmentServiceApi.getLogs(params);
  },
  // 获取结算清单
  getSettlementdetail(ctx, params) {
    return appointmentServiceApi.getSettlementdetail(params);
  },
  // 保存预约核销码
  updateVerificationCode(ctx, params) {
    return appointmentServiceApi.updateVerificationCode(params);
  }
};

export default {
  namespaced: true,
  actions
};
