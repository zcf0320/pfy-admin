import * as servicePackageApi from '@/api/servicePackage';

const actions = {
  // 获取服务包列表
  getServicePackageList(ctx, params) {
    return servicePackageApi.getServicePackageList(params);
  },
  // 获取服务包列表
  getServicePackageListNew(ctx, params) {
    return servicePackageApi.getServicePackageListNew(params);
  },
  // 新增服务包
  addServicePackage(ctx, params) {
    return servicePackageApi.addServicePackage(params);
  },
  // 获取服务包详情
  getServicePackageDetail(ctx, params) {
    return servicePackageApi.getServicePackageDetail(params);
  },
  // 跟新服务包
  updateServicePackage(ctx, params) {
    return servicePackageApi.updateServicePackage(params);
  },
  // 删除服务包
  deleteServicePackage(ctx, params) {
    return servicePackageApi.deleteServicePackage(params);
  },
  // 发布服务包
  publishServicePackage(ctx, params) {
    return servicePackageApi.publishServicePackage(params);
  },
  // 下架服务包
  downShelfServicePackage(ctx, params) {
    return servicePackageApi.downShelfServicePackage(params);
  },
  // 获取服务分类
  findServicePackageCategory(ctx, params) {
    return servicePackageApi.findServicePackageCategory(params);
  },
  // 更新服务列表
  updateServiceInfoList(ctx, params) {
    return servicePackageApi.updateServiceInfoList(params);
  },
  // 修改服务包定价方式
  saveServiceMethod(ctx, params) {
    return servicePackageApi.saveServiceMethod(params);
  },
  // 服务包定价方式回显
  getServiceMethod(ctx, params) {
    return servicePackageApi.getServiceMethod(params);
  },
  // 服务包重名校验
  checkPackage(ctx, params) {
    return servicePackageApi.checkPackage(params);
  }
};

export default {
  namespaced: true,
  actions
};
