import * as examineReason from '@/api/examineReason';

const actions = {
  // 根据状态获取类目列表数据
  getCatelist(ctx, params) {
    return examineReason.getCatelist(params);
  },

  // 类目修改/新增保存
  saveFormData(ctx, params) {
    return examineReason.saveFormData(params);
  },

  // 类目状态跟新
  updateCateStatus(ctx, params) {
    return examineReason.updateCateStatus(params);
  },

  // 类目数据获取
  getFormData(ctx, params) {
    return examineReason.getFormData(params);
  },

  // 类目原因列表
  getReasonList(ctx, params) {
    return examineReason.getReasonList(params);
  },

  // 类目原因保存
  saveReason(ctx, params) {
    return examineReason.saveReason(params);
  },

  // 类目原因状态跟新
  updateReasonCateStatus(ctx, params) {
    return examineReason.updateReasonCateStatus(params);
  },

  // 类目原因数据获取
  getReasonFormData(ctx, params) {
    return examineReason.getReasonFormData(params);
  }
};

export default {
  namespaced: true,
  actions
};
