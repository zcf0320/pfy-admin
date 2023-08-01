import * as serviceTypeApi from '@/api/serviceType';

const actions = {
  // 新增分类
  addType(ctx, data) {
    return serviceTypeApi.addType(data);
  },
  // 获取分类列表
  getTypeList(ctx, data) {
    return serviceTypeApi.getTypeList(data);
  },
  // 删除分类
  deleteType(ctx, data) {
    return serviceTypeApi.deleteType(data);
  },
  // 获取树形列表
  getTreeList(ctx, data) {
    return serviceTypeApi.getTreeList(data);
  },
  // 编辑标签
  updateType(ctx, data) {
    return serviceTypeApi.updateType(data);
  }
};

export default {
  namespaced: true,
  actions
};
