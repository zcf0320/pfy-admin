import request from '@/utils/request';

// 保险公司列表查询
export function getServicePackageList(data) {
  return request({
    url: 'scm/servicePackage/list',
    method: 'post',
    data
  });
}
// 新增的查询服务包接口
export function getServicePackageListNew(params) {
  return request({
    url: 'scm/servicePackage/infos',
    method: 'get',
    params
  });
}
// 服务包新增
export function addServicePackage(data) {
  return request({
    url: 'scm/servicePackage/save',
    method: 'post',
    data
  });
}
// 获取服务包详情
export function getServicePackageDetail(params) {
  return request({
    url: 'scm/servicePackage/detail',
    method: 'get',
    params
  });
}
// 跟新服务包
export function updateServicePackage(data) {
  return request({
    url: 'scm/servicePackage/update',
    method: 'post',
    data
  });
}
// 删除服务包
export function deleteServicePackage(params) {
  return request({
    url: 'scm/servicePackage/delete',
    method: 'get',
    params
  });
}
// 发布服务包
export function publishServicePackage(params) {
  return request({
    url: 'scm/servicePackage/publishServicePackage',
    method: 'get',
    params
  });
}
// 下架服务包
export function downShelfServicePackage(params) {
  return request({
    url: 'scm/servicePackage/downShelfServicePackage',
    method: 'get',
    params
  });
}
// 获取服务分类
export function findServicePackageCategory(params) {
  return request({
    url: 'scm/servicePackage/findServicePackageCategory',
    method: 'get',
    params
  });
}

// 更新服务列表
export function updateServiceInfoList(data) {
  return request({
    url: 'scm/servicePackage/updateServiceInfoList',
    method: 'post',
    data
  });
}

// 修改服务包定价方式
export function saveServiceMethod(data) {
  return request({
    url: 'scm/servicePackage/saveServicePackagePricingMethod',
    method: 'post',
    data
  });
}
// 服务包定价方式回显
export function getServiceMethod(params) {
  return request({
    url: 'scm/servicePackage/getServicePackagePricingMethod',
    method: 'get',
    params
  });
}
// 服务包重名校验
export function checkPackage(params) {
  return request({
    url: `scm/servicePackage/check/packageName/${params.packageName}`,
    method: 'get'
  });
}
// 获取智能匹配服务项统计
export function findRecommendServiceInfo(data) {
  return request({
    url: 'scm/servicePackage/findRecommendServiceInfo',
    method: 'post',
    data
  });
}

/**
 * 已经配置服务项列表/可配置的列表 type=0已配置/1可配置
 * @param {*} servicePackageId
 * @param {*} type
 * @returns
 */
export function getPackageService(servicePackageId, type) {
  return request({
    url: '/scm/servicePackage/getPackageService',
    method: 'get',
    params: {
      servicePackageId,
      type
    }
  });
}
/**
 * 修改配置列表
 * @param {*} data
 * @returns
 */
export function updatePackageService(data) {
    return request({
        url: '/scm/servicePackage/updatePackageService',
        method: 'post',
        data
    });
}
