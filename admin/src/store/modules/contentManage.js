import * as contentManageApi from '@/api/contentManage';

const actions = {
  // 获取评价列表
  getContentList(ctx, params) {
    return contentManageApi.getContentList(params);
  },
  // 新增内容
  addContent(ctx, params) {
    return contentManageApi.addContent(params);
  },
  // 导出数据
  exportContent(ctx, params) {
    return contentManageApi.exportContent(params);
  },
  // 获取文章详情
  getDetails(ctx, params) {
    return contentManageApi.getDetails(params);
  },
  // 更新内容
  updateContent(ctx, params) {
    return contentManageApi.updateContent(params);
  },
  // 删除内容
  deleteContent(ctx, params) {
    return contentManageApi.deleteContent(params);
  },
  // 获取标签
  getTags(ctx, params) {
    return contentManageApi.getTags(params);
  },
  // 更新内容  发布
  publishContent(ctx, params) {
    return contentManageApi.publishContent(params);
  },
  // 发送邮件
  emailsSend(ctx, params) {
    return contentManageApi.emailsSend(params);
  },
  // 员工邮箱列表
  getEmployee(ctx, params) {
    return contentManageApi.getEmployee(params);
  }
};

export default {
  namespaced: true,
  actions
};
