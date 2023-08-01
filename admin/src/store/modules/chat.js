import * as chatApi from '@/api/chat';

const actions = {
  // 聊天窗口信息
  getChartWindow(ctx, params) {
    return chatApi.getChartWindow(params);
  },
  // 获取聊天设置详情
  getChartSettingDetail(ctx, params) {
    return chatApi.getChartSettingDetail(params);
  },
  // 聊天设置
  updateChartSetting(ctx, params) {
    return chatApi.updateChartSetting(params);
  },
  // 切换医生状态
  changeState(ctx, params) {
    return chatApi.changeState(params);
  }
};

export default {
  namespaced: true,
  actions
};
