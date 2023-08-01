import * as marketingToolApi from '@/api/marketingTool';

const actions = {
  // 查询用户问卷使用记录列表
  getUserRecordList(ctx, params) {
    return marketingToolApi.getUserRecordList(params);
  },
  // 获取C端问卷详情
  getQuestionnaireDetail(ctx, params) {
    return marketingToolApi.getQuestionnaireDetail(params);
  },
  // 获取C端问卷列表
  getQuestionnaireList() {
    return marketingToolApi.getQuestionnaireList();
  },
  // 用户使用问卷记录详情
  getUserUseDetail(ctx, params) {
    return marketingToolApi.getUserUseDetail(params);
  },
  // 在线用户使用问卷记录详情
  OlgetUserUseDetail(ctx, params) {
    return marketingToolApi.OlgetUserUseDetail(params);
  },
  // 获取渠道列表下拉
  getChannelList() {
    return marketingToolApi.getChannelList();
  },
  // 新增问卷渠道生成链接
  addChannelInfo(ctx, params) {
    return marketingToolApi.addChannelInfo(params);
  },
  // 查询问卷渠道列表
  getQuestionnaireChannelList(ctx, params) {
    return marketingToolApi.getQuestionnaireChannelList(params);
  },
  // 修改问卷渠道海报
  updateChannelPoster(ctx, params) {
    return marketingToolApi.updateChannelPoster(params);
  },
  // 校验问卷渠道是否存在
  checkQuestionnaireChannel(ctx, params) {
    return marketingToolApi.checkQuestionnaireChannel(params);
  },
  // 修改问卷渠道状态
  saveState(ctx, params) {
    return marketingToolApi.saveState(params);
  },
  // 保存问卷设置第一步
  saveQuestionnaireFirst(ctx, params) {
    return marketingToolApi.saveQuestionnaireFirst(params);
  },
  // 保存问卷个人信息设置第二部
  saveQuestionnaireSecond(ctx, params) {
    return marketingToolApi.saveQuestionnaireSecond(params);
  },
  // 保存问卷样式设置第三部
  saveQuestionnaireThird(ctx, params) {
    return marketingToolApi.saveQuestionnaireThird(params);
  },
  // 删除问卷
  delQuestionnaire(ctx, params) {
    return marketingToolApi.delQuestionnaire(params);
  },
  // 获取第一步问卷
  getFirstSetting(ctx, params) {
    return marketingToolApi.getFirstSetting(params);
  },
  // 查找问卷所有设置
  getAllSetting(ctx, params) {
    return marketingToolApi.getAllSetting(params);
  },
  // 保存所以配置
  setAllSetting(ctx, params) {
    return marketingToolApi.setAllSetting(params);
  },
  // 发布
  openQuestionnaire(ctx, params) {
    return marketingToolApi.openQuestionnaire(params);
  },
  // 查询问卷日志
  getLogs(ctx, params) {
    return marketingToolApi.getLogs(params);
  },
  // 查找所有最新协议
  getProtocol(ctx, params) {
    return marketingToolApi.getProtocol(params);
  },
  // 通过id查找协议
  getProtocolById(ctx, params) {
    return marketingToolApi.getProtocolById(params);
  },
  // 发布协议
  saveProtocol(ctx, params) {
    return marketingToolApi.saveProtocol(params);
  },
  // 单个协议所有历史版本
  getProtocolHistory(ctx, params) {
    return marketingToolApi.getProtocolHistory(params);
  }
};

export default {
  namespaced: true,
  actions
};
