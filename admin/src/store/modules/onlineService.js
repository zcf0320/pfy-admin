import * as onlineServiceApi from '@/api/onlineService';

const actions = {
  // 获取在线服务列表
  getOnlineServiceList(ctx, params) {
    return onlineServiceApi.getOnlineServiceList(params);
  },
  // 获取在线服务详情
  getOnlineServiceDetails(ctx, params) {
    return onlineServiceApi.getOnlineServiceDetails(params);
  },
  // 导出数据
  exportOnlineService(ctx, params) {
    return onlineServiceApi.exportOnlineService(params);
  },
  // 操作日志
  onlineServiceLog(ctx, params) {
    return onlineServiceApi.onlineServiceLog(params);
  },
  // 上传诉求报告
  uploadReport(ctx, params) {
    return onlineServiceApi.uploadReport(params);
  },
  // 获取体检报告详情
  getInterpretDetail(ctx, params) {
    return onlineServiceApi.getInterpretDetail(params);
  },
  // 获取在线体检报告详情
  OlgetInterpretDetail(ctx, params) {
    return onlineServiceApi.OlgetInterpretDetail(params);
  },
  // 获取糖尿病详情
  getDiabetesDetail(ctx, params) {
    return onlineServiceApi.getDiabetesDetail(params);
  },
  // 在线获取糖尿病详情
  OlgetDiabetesDetail(ctx, params) {
    return onlineServiceApi.OlgetDiabetesDetail(params);
  },
  // cbt睡眠管理详情
//   getSleepManage(ctx, params) {
//     return onlineServiceApi.getSleepManage(params);
//   },
  // 在线cbt睡眠管理详情
  OlgetSleepManage(ctx, params) {
    return onlineServiceApi.OlgetSleepManage(params);
  },
  // 皮肤检测详情
  getSkinCheckDetail(ctx, params) {
    return onlineServiceApi.getSkinCheckDetail(params);
  },
  // 在线皮肤检测详情
  OlgetSkinCheckDetail(ctx, params) {
    return onlineServiceApi.OlgetSkinCheckDetail(params);
  }
};

export default {
  namespaced: true,
  actions
};
