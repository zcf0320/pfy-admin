import * as commentManageApi from '@/api/commentManage';

const actions = {
  // 获取评价列表
  getCommentList(ctx, params) {
    return commentManageApi.getCommentList(params);
  },
  // 获取评价详情
  getCommentDetails(ctx, params) {
    return commentManageApi.getCommentDetails(params);
  },
  // 更新运营备注
  updateRemark(ctx, params) {
    return commentManageApi.updateRemark(params);
  },
  // 导出数据
  exportComment(ctx, params) {
    return commentManageApi.exportComment(params);
  }
};

export default {
  namespaced: true,
  actions
};
