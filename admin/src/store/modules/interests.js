import * as interestsApi from '@/api/interests';

const actions = {
  // 获取赠送权益列表
  listPresentation(ctx, params) {
    return interestsApi.listPresentation(params);
  },
  // 获取赠送权益详情
  detailPresentation(ctx, params) {
    return interestsApi.detailPresentation(params);
  },
  //  赠送权益新增保存
  savePresentation(ctx, params) {
    return interestsApi.savePresentation(params);
  },
  //  赠送权益编辑保存
  updatePresentation(ctx, params) {
    return interestsApi.updatePresentation(params);
  },
  //  赠送权益新增保存
  queryUserList(ctx, params) {
    return interestsApi.queryUserList(params);
  }
};

export default {
  namespaced: true,
  actions
};
