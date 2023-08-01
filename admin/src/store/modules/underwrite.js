import * as underwriteApi from '@/api/underwrite';

const actions = {
  // 获取核保列表
  getUnderwrite(ctx, params) {
    return underwriteApi.getUnderwrite(params);
  },
  // 获取理赔详情
  getUnderwriteDetails(ctx, params) {
    return underwriteApi.getUnderwriteDetails(params);
  },
  // 审核
  reviewUnderwrite(ctx, params) {
    return underwriteApi.reviewUnderwrite(params);
  },
  // 导出
  export(ctx, params) {
    return underwriteApi.exportList(params);
  }
};

export default {
  namespaced: true,
  actions
};
