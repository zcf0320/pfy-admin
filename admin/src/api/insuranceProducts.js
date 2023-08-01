import request from '@/utils/request';

// 新增或更新保险产品基础信息
export function createOrUpdateBaseMsg(data) {
  return request({
    url: 'insurance/insuranceProduct/createOrUpdateBaseMsg',
    method: 'post',
    data
  });
}

// 新增或更新主险权益
export function updateMainRight(data) {
  return request({
    url: `/insurance/insuranceProduct/updateMainRight`,
    method: 'post',
    data
  });
}

// 新增或更新保险产品保障计划
export function createOrUpdatePlan(data) {
  return request({
    url: 'insurance/insuranceProduct/updatePlan',
    method: 'post',
    data
  });
}

// 新增或更新保险产品服务包
export function createOrUpdatePackage(data) {
  return request({
    url: `insurance/insuranceProduct/servicePackage/config`,
    method: 'post',
    data
  });
}

// 新增或更新保险产品审核材料
export function createOrUpdateReviewMaterial(data) {
  return request({
    url: `insurance/insuranceProduct/updateReviewMaterial`,
    method: 'post',
    data
  });
}

// 查询保险产品详情
export function getInsuranceProductsDetails(params) {
  const { id } = params;
  return request({
    url: `insurance/insuranceProduct/detail/${id}`,
    method: 'get'
  });
}

/**
 * 保险产品列表查询
 * @param {*} data
 * @returns
 */
export function getInsuranceProductsList(data) {
  return request({
    url: 'insurance/insuranceProduct/list',
    method: 'post',
    data
  });
}

// 删除保险产品
export function deleteInsuranceProducts(params) {
  return request({
    url: 'insurance/insuranceProduct/delete',
    method: 'get',
    params
  });
}

// 获取保险险种
export function getInsuranceTypes() {
  return request({
    url: 'insurance/insuranceProduct/getInsuranceTypes',
    method: 'get'
  });
}
// 根据险种获取保险责任
export function getInsuranceTypeDetails(params) {
  return request({
    url: 'insurance/insuranceProduct/getInsuranceTypeDetails',
    method: 'get',
    params
  });
}
// 获取保障计划
export function getDetailPlan(params) {
  return request({
    url: 'insurance/insuranceProduct/detailPlan',
    method: 'get',
    params
  });
}
// 更新保险内容
export function updateContent(data) {
  return request({
    url: 'insurance/insuranceProduct/updateContent',
    method: 'post',
    data
  });
}
// 更新投保规则
export function saveRules(data) {
  return request({
    url: 'insurance/insuranceProductRule',
    method: 'post',
    data
  });
}

// 获取主险保障责任
export function getAllMain(params) {
  return request({
    url: 'insurance/protectRight/getAllMain',
    method: 'get',
    params
  });
}
// 获取保障责任保额list
export function getProtectPremiums(params) {
  return request({
    url: 'insurance/protectRight/getProtectPremiums',
    method: 'get',
    params
  });
}
// 校验保险产品名称是否重名
export function checkName(data) {
  return request({
    url: `insurance/insuranceProduct/duplicateNameVerification`,
    method: 'post',
    data
  });
}
// 发布
export function publishProduct(params) {
  return request({
    url: 'insurance/insuranceProduct/publishProduct',
    method: 'get',
    params
  });
}

// 下架
export function downShelfProduct(params) {
  return request({
    url: 'insurance/insuranceProduct/downShelfProduct',
    method: 'get',
    params
  });
}
// 屏蔽链接
export function shield(params) {
  return request({
    url: 'insurance/insuranceProduct/shield',
    method: 'get',
    params
  });
}
// 不屏蔽链接
export function unShield(params) {
  return request({
    url: 'insurance/insuranceProduct/unShield',
    method: 'get',
    params
  });
}
// 保险产品签约地区
export function getSignedArea(params) {
  return request({
    url: 'insurance/insuranceProduct/getSignedArea',
    method: 'get',
    params
  });
}
// 获取费率表
export function getRightRates(params) {
  return request({
    url: 'insurance/protectRight/getRightRates',
    method: 'get',
    params
  });
}
// 生成保险产品链接
export function getInsuranceLink(params) {
  return request({
    url: 'insurance/insuranceProduct/getInsuranceLink',
    method: 'get',
    params
  });
}
// 获取保险权益理赔配置
export function getRightClaimConfigs(params) {
  return request({
    url: 'insurance/right-claim-configs',
    method: 'get',
    params
  });
}
// 新增保险权益理赔配置
export function saveRightClaimConfigs(data) {
  return request({
    url: 'insurance/right-claim-configs',
    method: data[0].id ? 'put' : 'post',
    data
  });
}
// 检验保障责任名称是否重复
export function checkGuaranteePowerName(data) {
  return request({
    url: 'insurance/protectRight/checkRightName',
    method: 'post',
    data
  });
}

// 获取保障计划列表
export function getPlanServicePackages(params) {
  return request({
    url: 'insurance/insuranceProduct/servicePackages/list',
    method: 'get',
    params
  });
}

// 获取服务项审核材料
export function getClaimReviewServiceItems(params) {
  return request({
    url: 'insurance/insuranceProduct/claim-review/service-items',
    method: 'get',
    params
  });
}

// 获取预设销量配置
export function getPresetSales(params) {
  return request({
    url: `insurance/preset-sales/${params.productId}`,
    method: 'get'
  });
}

// 预设销量设置
export function setPresetSales(data) {
  return request({
    url: 'insurance/preset-sales',
    method: 'put',
    data
  });
}

// 保险产品数据统计
export function getStatisticsAll(params) {
  return request({
    url: 'insurance/statistics/year/all',
    method: 'get',
    params
  });
}

// 根据年份产品数据统计
export function getStatistics(params) {
  return request({
    url: 'insurance/statistics/year',
    method: 'get',
    params
  });
}

/**
 *  保险产品列表查询
 * @param {*} params
 * @returns
 */
export function getInsuranceProductByName(params) {
  return request({
    url: 'insurance/insuranceProduct',
    method: 'get',
    params
  });
}

// 根据名称查询保障计划
export function getInsurancePlansByName(params) {
  return request({
    url: 'insurance/insuranceProduct/plans',
    method: 'get',
    params
  });
}

// 获取服务项初始化疾病
export function getServiceDefaultDisease(params) {
  return request({
    url: 'scm/medicine/service-item/default',
    method: 'get',
    params
  });
}
/** ******************保险产品统计明细*********************************** */
// 保险产品数据明细
export function getStatisticsProduct(data) {
  return request({
    url: 'insurance/statistics/product',
    method: 'post',
    data
  });
}
// 保险产品数据明细
export function getProductData(data) {
  return request({
    url: 'claim/InsuranceClaim/product/data',
    method: 'post',
    data
  });
}
// 保障理赔数据统计
export function getInsuranceClaim(data) {
  return request({
    url: 'claim/InsuranceClaim/claim/statistics',
    method: 'post',
    data
  });
}
// 查询保险产品简要信息(保障计划)
export function getInsuranceShort(params) {
  return request({
    url: 'insurance/insuranceProduct/short',
    method: 'get',
    params
  });
}
// 理赔数据统计药品统计
export function getInsuranceClaimMedicine(data) {
  return request({
    url: 'claim/InsuranceClaim/claim/medicine',
    method: 'post',
    data
  });
}
/** ******************保险产品配置结算规则*********************************** */
// 添加结算规则
export function setCompanySettlementRule(data) {
  return request({
    url: 'insurance/company-settlement/rule/save',
    method: 'post',
    data
  });
}
// 查询结算规则列表
export function getCompanySettlementRule(params) {
  return request({
    url: 'insurance/company-settlement/rule/list',
    method: 'get',
    params
  });
}
// 保单结算规则列表
export function getPolicySettlementRule(params) {
  return request({
    url: 'insurance/policy-settlement/rule/list',
    method: 'get',
    params
  });
}
// 保单结算规则设置
export function setPolicySettlementRule(data) {
  return request({
    url: 'insurance/policy-settlement/rule/save',
    method: 'post',
    data
  });
}
// 保障计划列表
export function getPolicyplanRule(params) {
  return request({
    url: 'insurance/policy-settlement/plan/price',
    method: 'get',
    params
  });
}
// 个险保单导出
export function exportPolicy(params) {
  return `${process.env.VUE_APP_BASE_API}insurance/policyManage/policy/export?${params}`;
}
// 个险保单一加一导出
// export function exportPolicyDoctor(servicePackageId, params) {
//   return `${process.env.VUE_APP_BASE_API}insurance/policyManage/policy/export?servicePackageId=${servicePackageId}&${params}`;
// }
// 整体保单数据统计
export function getStatisticsPolicy(params) {
  return request({
    url: 'insurance/statistics/policy',
    method: 'get',
    params
  });
}
// 保单用户数据统计
export function getStatisticsUser(params) {
  return request({
    url: 'insurance/statistics/policy/user',
    method: 'get',
    params
  });
}
// 保单结算数据统计
export function getStatisticsSettle(params) {
  return request({
    url: 'insurance/statistics/policy/settlement',
    method: 'get',
    params
  });
}
// 保单服务项数据统计
export function getStatisticsService(params) {
  return request({
    url: 'insurance/statistics/policy/service/info',
    method: 'get',
    params
  });
}
/**
 * 保险产品下拉列表查询
 * @param {*} params
 * @returns
 */
export function getProdList(params) {
  return request({
    url: 'insurance/insuranceProduct/prodList',
    method: 'get',
    params
  });
}

/**
 * 服务项理赔规则上传文件
 * @param {*} file formData
 * @param {*} type
 * @returns
 */
export function uploadFileByType(file, type) {
  return request({
    url: `insurance/insuranceProduct/uplaodFileByType?type=${type}`,
    data: file,
    method: 'post',
    timeout: 1500000
  });
}
/**
 * 获取保险产品库
 * @param {*} params
 * @returns
 */
export function getInsuranceProduct(params) {
  return request({
    url: '/insurance/insurance-products/listByPage',
    params,
    method: 'get'
  });
}
/**
 * 获取保险产品详情
 * @param {*} id
 * @returns
 */
export function getInsuranceProductDetail(id) {
  return request({
    url: `/insurance/insurance-products/detail?id=${id}`,
    method: 'get'
  });
}
/**
 * 获取保险产品图谱
 * @param {*} id
 * @returns
 */
export function getInsuranceAtlas(id) {
  return request({
    url: `/insurance/insurance-products/getAtlas?id=${id}`,
    method: 'get'
  });
}
/**
 * 更新保险库
 * @param {*} data
 * @returns
 */
export function updateInsuranceProduct(data) {
  return request({
    url: '/insurance/insurance-products/update',
    data,
    method: 'post'
  });
}
/**
 * 上传团险被保人名单
 * @param {*} data
 * @returns
 */
export function uploadGroupPolicy(data) {
    return request({
        url: '/insurance/groupPolicyManage/groupImport',
        data,
        method: 'post'
    });
}
