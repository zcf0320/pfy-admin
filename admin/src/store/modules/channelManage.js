import * as channelApi from '@/api/channelManage';

const actions = {
  // 新增渠道
  save(ctx, params) {
    return channelApi.save(params);
  },
  // 跟新渠道
  update(ctx, params) {
    return channelApi.update(params);
  },
  // 获取渠道列表
  getChannelList(ctx, params) {
    return channelApi.getChannelList(params);
  },
  // 获取渠道详情
  getChannelDetails(ctx, params) {
    return channelApi.getChannelDetails(params);
  },
  // 删除渠道
  delete(ctx, params) {
    return channelApi.deleteChannel(params);
  },
  // 获取渠道相关的公司
  getcompanyList(ctx, params) {
    return channelApi.getcompanyList(params);
  }
};

export default {
  namespaced: true,
  actions
};
