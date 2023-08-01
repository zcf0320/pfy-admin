import * as healthColumnApi from '@/api/healthColumn';

const actions = {
  // 新增专栏文章
  createHealthColumn(ctx, params) {
    return healthColumnApi.createHealthColumn(params);
  },
  // 获取专栏文章列表
  getHealthColumnList(ctx, params) {
    return healthColumnApi.getHealthColumnList(params);
  },
  // 专栏文章详情
  getHealthColumnDetails(ctx, params) {
    return healthColumnApi.getHealthColumnDetails(params);
  },
  // 专栏文章更新
  healthColumnUpdate(ctx, params) {
    return healthColumnApi.healthColumnUpdate(params);
  },
  // 删除专栏文章
  deleteHealthColumn(ctx, params) {
    return healthColumnApi.deleteHealthColumn(params);
  },

  // 应用设置列表查询
  getHealthColumnApplicationList(ctx, params) {
    return healthColumnApi.getHealthColumnApplicationList(params);
  },
  // 应用设置新增
  saveHealthColumnApplication(ctx, params) {
    return healthColumnApi.saveHealthColumnApplication(params);
  },
  // 应用设置详情
  getHealthColumnApplicationDetails(ctx, params) {
    return healthColumnApi.getHealthColumnApplicationDetails(params);
  },
  // 应用设置更新
  updateHealthColumnApplication(ctx, params) {
    return healthColumnApi.updateHealthColumnApplication(params);
  },
  // 应用设置删除
  deleteHealthColumnApplication(ctx, params) {
    return healthColumnApi.deleteHealthColumnApplication(params);
  },
  // 发布
  updatePostStatus(ctx, params) {
    return healthColumnApi.updatePostStatus(params);
  }
};

export default {
  namespaced: true,
  actions
};
