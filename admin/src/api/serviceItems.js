import request from '@/utils/request';

// 新增服务项
export function createServiceItem(params) {
  return request({
    url: 'scm/serviceInfo/save',
    method: 'post',
    data: params
  });
}

// 服务项列表查询
export function getServiceList(params) {
  return request({
    url: 'scm/serviceInfo/list',
    method: 'post',
    data: params
  });
}
// 服务项查询所有列表
export function getAllServiceList() {
  return request({
    url: 'scm/serviceInfo/getAllInfoIdAndName',
    method: 'get'
  });
}

// 服务项详情查询
export function getServiceInfo(params) {
  return request({
    url: 'scm/serviceInfo/detail',
    method: 'get',
    params
  });
}

// 服务项编辑
export function updateServiceItem(params) {
  return request({
    url: 'scm/serviceInfo/update',
    method: 'post',
    data: params
  });
}

// 删除服务项
export function deleteServiceItems(params) {
  return request({
    url: 'scm/serviceInfo/delete',
    method: 'get',
    params
  });
}
// 获取服务内容列表
export function getServiceVos() {
  return request({
    url: 'scm/serviceInfo/infos',
    method: 'get'
  });
}
// 获取券码列表
export function getCodeList(data) {
  return request({
    url: 'scm/serviceInfo/thirdCodeList',
    method: 'post',
    data
  });
}
// 券码保存
export function codeSave(data) {
  return request({
    url: 'scm/serviceInfo/thirdCodeSubmit',
    method: 'post',
    data
  });
}
// 失效券码
export function cancelCode(params) {
  return request({
    url: 'scm/serviceInfo/tpCodeCancel',
    method: 'get',
    params
  });
}

// 获取服务网点列表
export function getServiceSiteList(data) {
  return request({
    url: 'scm/serviceSite/list',
    method: 'post',
    data
  });
}
// 新增服务网点
export function addServiceSite(data) {
  return request({
    url: 'scm/serviceSite/save',
    method: 'post',
    data
  });
}
// 编辑服务网点
export function updateServiceSite(data) {
  return request({
    url: 'scm/serviceSite/update',
    method: 'post',
    data
  });
}
// 删除服务网点
export function deleteServiceSite(params) {
  return request({
    url: 'scm/serviceSite/delete',
    method: 'get',
    params
  });
}

// 获取上门城市列表
export function getServiceCityList(data) {
  return request({
    url: 'scm/upDoorCity/list',
    method: 'post',
    data
  });
}
// 新增上门城市
export function addServiceCity(data) {
  return request({
    url: 'scm/upDoorCity/save',
    method: 'post',
    data
  });
}
// 编辑上门城市
export function updateServiceCity(data) {
  return request({
    url: 'scm/upDoorCity/update',
    method: 'post',
    data
  });
}
// 删除上门城市
export function deleteServiceCity(params) {
  return request({
    url: 'scm/upDoorCity/delete',
    method: 'get',
    params
  });
}
// 获取供应商列表
export function getCreditList(params) {
  return request({
    url: 'scm/company/credit/list',
    method: 'get',
    params
  });
}
// 获取体征详情
export function getSignServiceDetail(params) {
  return request({
    url: 'scm/reverse/signServiceDetail',
    method: 'get',
    params
  });
}

// 获取星矿可用服务项包括供应商
export function getServiceListAndProvider(params) {
  return request({
    url: 'scm/score/mall/getInfoAndProvider',
    method: 'get',
    params
  });
}
// 获取预约配置字段信息
export function getReverseConfigs() {
  return request({
    url: 'scm/serviceInfo/getReverseConfigs',
    method: 'get'
  });
}
// 保存预约配置字段信息
export function saveReverseConfig(data) {
  return request({
    url: 'scm/serviceInfo/updateReverseConfig',
    method: 'post',
    data
  });
}
// 发布
export function publishServiceInfo(params) {
  const { id, status } = params;
  return request({
    url: `scm/serviceInfo/publishServiceInfo/${id}/${status}`,
    method: 'get'
  });
}
// 下架
export function downShelfServiceInfo(params) {
  const { id, status } = params;
  return request({
    url: `scm/serviceInfo/downShelfServiceInfo/${id}/${status}`,
    method: 'get'
  });
}

// 获取供应商类型数据
export function getProviderType(params) {
  return request({
    url: `scm/provider/getProviderType`,
    method: 'get',
    params
  });
}

// 获取供应商数据
export function getProviderData(params) {
  return request({
    url: `scm/provider/getProviderData`,
    method: 'get',
    params
  });
}

// 获取服务项状态
export function getServiceStatus(params) {
  return request({
    url: `scm/serviceInfo/getServiceStatus`,
    method: 'get',
    params
  });
}

// 获取服务项状态趋势
export function getServiceStatusData(params) {
  return request({
    url: `scm/serviceInfo/getServiceStatusData`,
    method: 'get',
    params
  });
}

// 服务项类型使用次数
export function findServiceUseCount(params) {
  return request({
    url: `scm/sys/config/findServiceUseCount`,
    method: 'get',
    params
  });
}

// 获取供应商地区分布
export function getProviderAreaData(params) {
  return request({
    url: `scm/provider/getProviderAreaData`,
    method: 'get',
    params
  });
}

// 老花镜列表导出
export function presbyopicGlasses(data) {
  return request({
    url: `scm/recordExport/presbyopicGlasses`,
    method: 'post',
    data
  });
}

// 结算规则查看
export function getSettlementRuleMethod(params) {
  return request({
    url: `scm/settlement/getSettlementRuleMethod`,
    method: 'get',
    params
  });
}

// 结算规则保存
export function saveSettlementRuleMethod(data) {
  return request({
    url: 'scm/settlement/saveSettlementRuleMethod',
    method: 'post',
    data
  });
}
// 获取关联服务包(分页)
export function getRelaPackages(data) {
  return request({
    url: 'scm/serviceInfo/findPackageByInfoId',
    method: 'post',
    data
  });
}
// 服务项下拉
export function getServiceinfos() {
  return request({
    url: 'scm/serviceInfo/infos',
    method: 'get'
  });
}
// 服务项标签分词
export function setServiceLable(data) {
  return request({
    url: 'scm/serviceInfo/serviceLable',
    method: 'post',
    data
  });
}
// 服务项应用设置跳转
export function getServiceSetDetail(params) {
  return request({
    url: 'scm/serviceInfo/serviceInfoType',
    method: 'get',
    params
  });
}
// 根据服务类型获取服务项
export function getServiceLstByType(serviceType) {
  return request({
    url: `scm/servicePackage/by/serviceType/find/serviceInfo/${serviceType}`,
    method: 'get'
  });
}
// 标签树
export function getTagTree(params) {
  return request({
    url: 'scm/sys/tags/getServiceTagTree',
    method: 'get',
    params
  });
}
