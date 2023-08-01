
import request from '@/utils/request';

// 获取应用设置列表
export function getApplicationList(data) {
  return request({
    url: 'scm/appSetting/list',
    method: 'post',
    data
  });
}
// 新增应用设置
export function createApplication(data) {
  return request({
    url: 'scm/appSetting/saveOrUpdate',
    method: 'post',
    data
  });
}
// 更新应用设置
export function updateApplication(data) {
  return request({
    url: 'scm/appSetting/update',
    method: 'post',
    data
  });
}
// 删除应用设置
export function deleteApplication(params) {
  return request({
    url: 'scm/appSetting/delete',
    method: 'delete',
    params
  });
}
// 获取应用设置
export function getApplicationDetails(data) {
  return request({
    url: 'scm/appSetting/detail',
    method: 'post',
    data
  });
}
// 获取商品二级分类
export function getSecondTypes(params) {
  return request({
    url: 'scm/appSetting/getSecondTypes',
    method: 'get',
    params
  });
}
// 购买策略
export function updateStrategy(data) {
  return request({
    url: 'scm/purchePlan/update',
    method: 'post',
    data
  });
}
// 查询购买策略
export function getStrategy(params) {
  return request({
    url: 'scm/purchePlan/detail',
    method: 'get',
    params
  });
}
// 获取订单日志列表
export function getLogsList(params) {
  return request({
    url: 'scm/order/orderRecord',
    method: 'get',
    params
  });
}
// 获取结算列表
export function getSettleList(data) {
  return request({
    url: 'scm/settlement/list',
    method: 'post',
    data
  });
}
// 获取所有供应商
export function getSuppliersList(params) {
  return request({
    url: 'scm/settlement/getSuppliers',
    method: 'get',
    params
  });
}
// 获取结算详情
export function getSettleDetail(params) {
  return request({
    url: 'scm/settlement/detail',
    method: 'get',
    params
  });
}
// 获取结算订单详情
export function getSettleOrders(data) {
  return request({
    url: 'scm/settlement/getOrders',
    method: 'post',
    data
  });
}
// 确认结算
export function confirmSettlement(data) {
  return request({
    url: 'scm/settlement/confirmSettlement',
    method: 'post',
    data
  });
}
// 导出结算明细
export function exportExcel(params) {
  return request({
    url: 'scm/recordExport/queryAndExportSettlementOrders',
    method: 'get',
    params
  });
}
// 根据类型获取药品
export function findMedicineByType(data) {
  return request({
    url: 'scm/appSetting/findMedicineByType',
    method: 'post',
    data
  });
}
// 校验重名
export function checkName(params) {
  return request({
    url: 'scm/appSetting/checkDuplicateName',
    method: 'get',
    params
  });
}
// 获取基础药品库列表
export function getBasisDrugList(data) {
  return request({
    url: 'claim/medicines/basics',
    method: 'post',
    data
  });
}
// 药价监控列表
export function drugMonitor(data) {
  return request({
    url: 'claim/medicines/list',
    method: 'post',
    data
  });
}
// 药价监控详情
export function drugMonitorDetail(params) {
  return request({
    url: 'claim/medicines/price/trends',
    method: 'get',
    params
  });
}
// 获取药品规格
export function getDrugFormat(params) {
  return request({
    url: `claim/medicines/specs?medicineName=${params}`,
    method: 'get'
  });
}
// 获取商家列表
export function getMerchantList() {
  return request({
    url: 'claim/medicines/platform',
    method: 'get'
  });
}
// 获取药品详情
export function getDrugDetail(id) {
  return request({
    url: `claim/medicines/basics/${id}/info`,
    method: 'get'
  });
}
// 手动回去最新药品价格
export function getNewDrugPrice(id) {
  return request({
    url: `claim/medicines/${id}/renew/price`,
    method: 'get'
  });
}
// 疾病图谱
export function diseasesChart(diseaseName) {
  return request({
    url: 'claim/diseases/atlas',
    method: 'post',
    data: { diseaseName }
  });
}
// 结算订单列表导出
export function settlementDetails(data) {
  return request({
    url: 'scm/recordExport/settlementDetails',
    method: 'post',
    data
  });
}
// 获取药品相关单位
export function getDrugUnits() {
  return request({
    url: `claim/medicines/units`,
    method: 'get'
  });
}
// 更新基础药品
export function updateDrugDetails(data) {
  return request({
    url: 'claim/medicines/basics/update',
    method: 'post',
    data
  });
}
// 根据药房网药品库ID查询基础药品库药品包含的疾病信息
export function getDiseasesByMedicine(data) {
  return request({
    url: 'scm/appSetting/medicine/diseases',
    method: 'post',
    data
  });
}
// 批量更新药品，查询药品名
export function getDiseasesNameList(data) {
  return request({
    url: 'claim/medicines/basics/search/name',
    method: 'post',
    data
  });
}
// 批量更新药品,查询药品详情
export function getDiseasesNameDetail(data) {
  return request({
    url: 'claim/medicines/basics/search/info',
    method: 'post',
    data
  });
}
// 批量更新
export function batchUpdateDrug(data) {
  return request({
    url: 'claim/medicines/basics/batch/update',
    method: 'post',
    data
  });
}
// 药品价格曲线
export function viewCharts(parmas) {
  return request({
    url: `scm/medicine/trend?id=${parmas.id}`,
    method: 'get'
  });
}
// 获取药品分类
export function getMedicineTypes() {
  return request({
    url: `claim/medicine/classify/list`,
    method: 'get'
  });
}
// 点击上架出现提示药品关联的应用设置
export function getMedicineStatus(id) {
  return request({
    url: `scm/medicine/find/appSetting/medicine/status/${id}`,
    method: 'get'
  });
}
// 修改药品销售状态
export function updateMedicineStatus(data) {
  return request({
    url: 'scm/medicine/update/medicine/status',
    method: 'post',
    data
  });
}
// 通过基础药品库进行搜索
export function findDrug(name) {
  return request({
    url: `scm/medicine/find/drug/${name}`,
    method: 'get'
  });
}
/**
 * 药品导出
 * @returns
 */
export function exportDrugData() {
  return `${process.env.VUE_APP_BASE_API}scm/order/data/export`;
}
/**
 * 获取新增销售结算时的销售内容列表
 * @returns
 */
export function getSettlementContentList() {
  return request({
    url: 'scm/settlement/salesSettlement/getContentList',
    method: 'get'
  });
}
/**
 * 获取账期列表
 * @returns
 */
export function getAccountPeriodList() {
  return request({
    url: 'scm/settlement/salesSettlement/getAccountPeriodList',
    method: 'get'
  });
}
/**
 * 新增销售结算
 * @param {*} data
 * @returns
 */
export function saveSettlement(data) {
  return request({
    url: 'scm/settlement/salesSettlement/save',
    method: 'post',
    data
  });
}
/**
 * 修改结算备注
 * @param {*} data
 * @returns
 */
export function updateSettlementRemark(data) {
  return request({
    url: 'scm/settlement/updateRemark',
    method: 'post',
    data
  });
}

// 上传结算凭证
export function uplaodCertificateReList(fd, type) {
  return request({
    url: `scm/settlement/uplaodCertificateReList?type=${type}`,
    method: 'post',
    data: fd,
    timeout: 1500000
  });
}
// 新增或者修改风险项
export function saveOrUpdateRisk(data) {
  return request({
    url: 'scm/medicineRisk/saveOrUpdate',
    method: 'post',
    data
  });
}
// 查看风险项
export function medicineRiskDetail(params) {
  return request({
    url: 'scm/medicineRisk/detail',
    method: 'get',
    params
  });
}

/**
 * 撤单
 * @param {*} data
 * @returns
 */
export function revokeOrder(data) {
  return request({
    url: 'scm/order/revoke',
    data,
    method: 'post'
  });
}
/**
 * 获取药品订单状态
 * @returns
 */
export function getOrderState() {
  return request({
    url: 'scm/order/getMedicineOrderState',
    method: 'get'
  });
}
