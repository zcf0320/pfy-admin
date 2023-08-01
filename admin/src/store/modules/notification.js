import * as notificationApi from '@/api/notification';

const actions = {
  // 查询员工全部消息通知
  getAll(ctx, params) {
    return notificationApi.getAll(params);
  },
  // 短信记录
  smsList(ctx, params) {
    return notificationApi.smsList(params);
  },
  // 模板下拉列表
  findTemplateName(ctx, params) {
    return notificationApi.findTemplateName(params);
  },
  // 短信模板列表
  smsTemplate(ctx, params) {
    return notificationApi.findSmsTemplate(params);
  },
  // 站内消息记录
  messageList(ctx, params) {
    return notificationApi.messageList(params);
  },
  // 站内消息下拉列表
  searchMessage(ctx, params) {
    return notificationApi.searchMessage(params);
  },
  // 站内消息模板列表
  messageTemplate(ctx, params) {
    return notificationApi.messageTemplate(params);
  },
  // 标记已读消息
  isRead(ctx, params) {
    return notificationApi.isRead(params);
  }
};

export default {
  namespaced: true,
  actions
};
