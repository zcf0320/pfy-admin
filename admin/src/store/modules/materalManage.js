import * as materalManageApi from '@/api/materalManage';

const actions = {
  // 获取材料模板列表
  getMaterialLibraryList(ctx, params) {
    return materalManageApi.getMaterialLibraryList(params);
  },
  // 新增材料模板
  addMaterialLibrary(ctx, params) {
    return materalManageApi.addMaterialLibrary(params);
  },
  // 材料模板详情
  detailMaterialLibrary(ctx, params) {
    return materalManageApi.detailMaterialLibrary(params);
  },
  // 删除模板
  deleteMaterialLibrary(ctx, params) {
    return materalManageApi.deleteMaterialLibrary(params);
  },
  // 启用，禁用
  switchMaterialLibrary(ctx, params) {
    return materalManageApi.switchMaterialLibrary(params);
  },
  // 查询日志
  logMaterialLibrary(ctx, params) {
    return materalManageApi.logMaterialLibrary(params);
  },
  // 获取全部资料列表
  findAllMaterial(ctx, params) {
    return materalManageApi.findAllMaterial(params);
  }
};
export default {
  namespaced: true,
  actions
};
