import * as telWorkOrderManageApi from '@/api/telWorkOrderManage';

const actions = {
  // 电话问诊列表
  callRecordList(ctx, data) {
    return telWorkOrderManageApi.callRecordList(data);
  },
  // 电话问诊详情
  callRecordDetail(ctx, data) {
    return telWorkOrderManageApi.callRecordDetail(data);
  },
  // 给用户打电话
  makeCall(ctx, data) {
    return telWorkOrderManageApi.makeCall(data);
  },
  // 发送问诊结果
  sendResult(ctx, data) {
    return telWorkOrderManageApi.sendResult(data);
  },
  // 跟新备注
  updateRemark(ctx, data) {
    return telWorkOrderManageApi.updateRemark(data);
  }
};

export default {
  namespaced: true,
  actions
};
