import request from '@/utils/request';
/**
 * 查询理赔列表
 * @param { data } data
 */
export function getClaimlist(data) {
  return request({
    url: 'scm/claimSettelement/list',
    method: 'post',
    data
  });
}

/**
 * 查询理赔详情
 * @param { params } params
 */
export function getClaimDetail(params) {
  return request({
    url: 'scm/claimSettelement/warnsDetail',
    method: 'get',
    params
  });
}

/**
 * 获取审核类目下对应的原因
 * @param { params } params
 */
export function getCategoryReasonList(params) {
  return request({
    url: 'scm/claimSettelement/getReviewCategoryAndReason',
    method: 'get',
    params
  });
}

/**
 * 审核通过
 * @param { data } data
 */
export function passReview(data) {
  return request({
    url: 'scm/claimSettelement/passReview',
    method: 'post',
    data
  });
}

/**
 * 审核不通过
 * @param { data } data
 */
export function rejectReview(data) {
  return request({
    url: 'scm/claimSettelement/rejectReview',
    method: 'post',
    data
  });
}

// 查询核赔预警统计列表
export function getClaimStatisticsList(data) {
  return request({
    url: 'claim/claim/warns',
    method: 'post',
    data
  });
}

// 核赔预警统计列表导出
export function downClaimStatisticsList(params) {
  params = JSON.stringify(params);
  return `${process.env.VUE_APP_BASE_API}claim/claim/warns/download/${params}`;
}

// 核赔预警详情
export function claimStatisticsDetail(claimId) {
  return request({
    url: `claim/claim/warnsDetail/${claimId}`,
    method: 'get'
  });
}

// 核赔预警姓名
export function getClaimName(searchName) {
  return request({
    url: `claim/claim/names/${searchName}`,
    method: 'get'
  });
}

// 核赔预警规则
export function getClaimRules() {
  return request({
    url: `claim/claim/rules`,
    method: 'get'
  });
}

// 药品比价
export function getDrugPriceList(data) {
  return request({
    url: '/claim/medicines/compare',
    method: 'post',
    data
  });
}

// 导入
export function uploadClaimExcel(fd) {
  return request({
    url: `/claim/claim/import`,
    method: 'post',
    data: fd
  });
}
/**
 * 下载不通过数据
 * @param { params } params
 */
export function downFailModel(params) {
  return `${process.env.VUE_APP_BASE_API}claim/claim/download/${params}`;
}

// 保存预警备注
export function setClaimRemark(data) {
  return request({
    url: 'scm/claimSettelement/saveWarningDescription',
    method: 'post',
    data
  });
}
/* ********************************************补充资料**************************************** */

// 查询诊疗资料结构化数据
export function getTreatmentStructured(data) {
  const { id, type } = data;
  return request({
    url: `scm/treatmentStructured/findAll/${id}/type/${type}`,
    method: 'get'
  });
}

// 模糊查询疾病
export function getDiseaseAll(data) {
  return request({
    url: `scm/treatmentStructured/findDisease/${data}`,
    method: 'get'
  });
}

// 模糊查询药品
export function getDrugNameAll(data) {
  return request({
    url: `scm/treatmentStructured/findDrugName/${data}`,
    method: 'get'
  });
}
// 查询药品规格
export function getSpecifications(data) {
  return request({
    url: `scm/treatmentStructured/findSpecifications/${data}`,
    method: 'get'
  });
}

// 保存或修改诊疗资料结构化数据
export function saveOrUpdate(data) {
  return request({
    url: 'scm/treatmentStructured/saveOrUpdate',
    method: 'post',
    data
  });
}

// 保存或修改诊疗资料结构化数据
export function saveCheck(data) {
  return request({
    url: 'scm/treatmentStructured/saveOrUpdate/check',
    method: 'post',
    data
  });
}

// 保存或修改医疗费用结算单
export function saveMedicalExpense(data) {
  return request({
    url: 'scm/treatmentStructured/saveOrUpdate/medicalExpense',
    method: 'post',
    data
  });
}

// 保存或修改医疗发票
export function saveMedicalInvoice(data) {
  return request({
    url: 'scm/treatmentStructured/saveOrUpdate/medicalInvoice',
    method: 'post',
    data
  });
}

// 保存或修改病例首页
export function saveMedicalHomePage(data) {
  return request({
    url: 'scm/treatmentStructured/saveOrUpdate/medicalHomePage',
    method: 'post',
    data
  });
}

// 保存或修改银行卡
export function saveBankCard(data) {
  return request({
    url: 'scm/treatmentStructured/saveOrUpdate/BankCard',
    method: 'post',
    data
  });
}

// 保存或修改身份证
export function saveIdentityCard(data) {
  return request({
    url: 'scm/treatmentStructured/saveOrUpdate/IdentityCard',
    method: 'post',
    data
  });
}

// 模糊查找检查检验项目名称
export function findCheckName(params) {
  return request({
    url: `scm/treatmentStructured/findCheckName/${params}`,
    method: 'get'
  });
}

// 查找国籍列表
export function findCountryList(params) {
  return request({
    url: 'scm/treatmentStructured/findCountryList',
    method: 'get',
    params
  });
}

// 查找银行列表
export function findBankList(params) {
  return request({
    url: 'scm/treatmentStructured/findBankList',
    method: 'get',
    params
  });
}

// 查找民族列表
export function findNationList(params) {
  return request({
    url: 'scm/treatmentStructured/findNationList',
    method: 'get',
    params
  });
}

// 查找二级科室列表
export function findSecondDepartment(params) {
  return request({
    url: 'scm/treatmentStructured/findSecondDepartment',
    method: 'get',
    params
  });
}

// 查找补充资料用户使用状态
export function findFurtherInformation(params) {
  return request({
    url: `scm/claimSettelement/findFurtherInformation/${params}`,
    method: 'get'
  });
}
// 查职业
export function findJobList(data) {
  return request({
    url: `scm/treatmentStructured/findJobList`,
    method: 'post',
    data
  });
}
// 药品分类
export function classify(params) {
  return request({
    url: `scm/claimSettelement/classify?claimRecordId=${params}`,
    method: 'get'
  });
}
// 药品分类上下移动
export function classifyMove(params) {
  return request({
    url: `scm/claimSettelement/medicine/classify/${params.medicineClassifyId}/${params.direction}`,
    method: 'get'
  });
}
// 药品分类选择
export function classifySelected(data) {
  return request({
    url: `scm/claimSettelement/classify/selected`,
    method: 'post',
    data
  });
}
// 审核日志
export function reviewLog(params) {
  return request({
    url: `scm/claimSettelement/review/log?claimRecordId=${params}`,
    method: 'get'
  });
}
// 查找检验检查项目明细
export function findCheckDetail(data) {
  return request({
    url: 'scm/treatmentStructured/findCheck/project',
    method: 'post',
    data
  });
}
// 获取核赔数量
export function getTipsNum() {
  return request({
    url: 'scm/claimSettelement/claim/tips/num',
    method: 'get'
  });
}

/**
 * 获取配置材料
 * @param {*} claimRecordId
 * @returns
 */
export function findDynamicFurtherInformation(claimRecordId) {
  return request({
    url: `scm/claimSettelement/findFurtherInformation/materials?claimRecordId=${claimRecordId}`,
    method: 'get'
  });
}
