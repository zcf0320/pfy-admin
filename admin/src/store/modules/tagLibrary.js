import * as tagLibraryApi from '@/api/tagLibrary';

const actions = {
  // 新增标签
  addTag(ctx, data) {
    return tagLibraryApi.addTag(data);
  },
  // 获取标签列表
  getTagList(ctx, data) {
    return tagLibraryApi.getTagList(data);
  },
  // 删除标签
  deleteTag(ctx, data) {
    return tagLibraryApi.deleteTag(data);
  },
  // 根据服务项获取二级标签
  getChildTag(ctx, data) {
    return tagLibraryApi.getChildTag(data);
  },
  // 标签查询(分页)
  getTagListSearch(ctx, data) {
    return tagLibraryApi.getTagListSearch(data);
  }
};

export default {
  namespaced: true,
  actions
};
