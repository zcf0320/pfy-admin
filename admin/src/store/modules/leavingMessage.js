import * as leavingMessageApi from '@/api/leavingMessage';

const actions = {
  // 获取留言列表
  getMessageList(ctx, params) {
    return leavingMessageApi.getMessageList(params);
  },
  // 获取留言详情
  getMessageDetail(ctx, params) {
    return leavingMessageApi.getMessageDetail(params);
  },
  // 备注留言
  setMessageRemark(ctx, params) {
    return leavingMessageApi.setMessageRemark(params);
  },
  // 完成留言
  setMessageState(ctx, params) {
    return leavingMessageApi.setMessageState(params);
  }
};

export default {
  namespaced: true,
  actions
};
