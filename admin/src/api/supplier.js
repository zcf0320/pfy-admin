import request from '@/utils/request';

// 新增证件信息
export function addCredentials(data) {
  return request({
    url: 'scm/credential/save',
    method: 'post',
    data
  });
}

// 新增供应商
export function addSupplier(data) {
  return request({
    url: 'scm/provider/save',
    method: 'post',
    data
  });
}
// 获取供应商列表
export function getProviderList(data) {
  return request({
    url: 'scm/provider/list',
    method: 'post',
    data
  });
}
// 获取供应商详情
export function getProviderDetail(params) {
  return request({
    url: 'scm/provider/detail',
    method: 'get',
    params
  });
}
// 编辑供应商
export function updateProvider(data) {
  return request({
    url: 'scm/provider/update',
    method: 'post',
    data
  });
}
// 删除证件
export function deleteCredential(params) {
  return request({
    url: 'scm/credential/delete',
    method: 'get',
    params
  });
}
// 删除供应商
export function deleteSupplier(params) {
  return request({
    url: 'scm/provider/delete',
    method: 'get',
    params
  });
}
// 供应商企业名称去重校验
export function checkDistinctName(params) {
  return request({
    url: 'scm/provider/checkDistinctName',
    method: 'get',
    params
  });
}
// 供应商简称去重校验
export function checkDistinctSimpleName(params) {
  return request({
    url: 'scm/provider/checkDistinctSimpleName',
    method: 'get',
    params
  });
}

// 健告问卷选项列表
export function healthOptionList(data) {
  return request({
    url: 'insurance/healthOption/list',
    method: 'post',
    data
  });
}
// 健告选项修改/新增
export function healthOptionSave(data) {
  return request({
    url: 'insurance/healthOption/save',
    method: 'post',
    data
  });
}
// 健告选项详情
export function healthOptionDetail(params) {
  return request({
    url: 'insurance/healthOption/detail',
    method: 'get',
    params
  });
}
// 健告选项删除
export function deleteOption(params) {
  return request({
    url: 'insurance/healthOption/delete',
    method: 'post',
    params
  });
}
// 健告问卷列表
export function healthQuesList(data) {
  return request({
    url: 'insurance/healthQuestionnaire/list',
    method: 'post',
    data
  });
}
// 健告问卷修改/新增
export function healthQuesEdit(data) {
  return request({
    url: 'insurance/healthQuestionnaire/save',
    method: 'post',
    data
  });
}
// 健告问卷状态修改
export function healthQuesStatus(data) {
  return request({
    url: 'insurance/healthQuestionnaire/status/update',
    method: 'post',
    data
  });
}
// 健告问卷详情
export function healthQuesDetail(params) {
  return request({
    url: 'insurance/healthQuestionnaire/detail',
    method: 'get',
    params
  });
}
// 健告问卷删除
export function deleteQues(params) {
  return request({
    url: 'insurance/healthQuestionnaire/delete',
    method: 'delete',
    params
  });
}
// 修改结算规则
export function saveSettlementRule(data) {
  return request({
    url: 'scm/settlement/saveSettlementRule',
    method: 'post',
    data
  });
}
// 获取结算规则
export function getSettlRule(params) {
  return request({
    url: 'scm/settlement/getProviderCompanySettlRule',
    method: 'get',
    params
  });
}
// 获取所有结算详情列表
export function getSettlementDetails(data) {
  return request({
    url: 'scm/settlement/getSettlementDetails',
    method: 'post',
    data
  });
}
// 启用供应商账号状态
export function enableProvider(params) {
  const { id, accountStatus } = params;
  return request({
    url: `scm/provider/enableProvider/${id}/${accountStatus}`,
    method: 'get'
  });
}
// 解约供应商账号状态
export function releaseProvider(params) {
  const { id, accountStatus } = params;
  return request({
    url: `scm/provider/releaseProvider/${id}/${accountStatus}`,
    method: 'get'
  });
}
// 查看服务项涉及
export function queryUsersAndPackages(params) {
  return request({
    url: `scm/provider/serviceList/queryUsersAndPackages/${params.serviceInfoId}
        `,
    method: 'get'
  });
}
// 查看服务项涉及服务包
export function getRelatePackages(data) {
  return request({
    url: 'scm/provider/serviceList/serviceInfoRelatePackages',
    method: 'post',
    data
  });
}
// 查看服务项涉及用户
export function getRelateUsers(data) {
  return request({
    url: 'scm/provider/serviceList/serviceInfoRelateUsers',
    method: 'post',
    data
  });
}
// 服务项停止合作
export function updateCorpStatus(params) {
  return request({
    url: `scm/provider/updateInfoListCooperationStatus/${params.id}/${params.serviceInfoId}/${params.cooperationStatus}
        `,
    method: 'get'
  });
}
// 查找服务项集合
export function findServiceInfoList(params) {
  return request({
    url: `scm/providerContract/findServiceInfoList/${params.providerId}`,
    method: 'get'
  });
}
// 合同列表
export function findContract(data) {
  return request({
    url: 'scm/providerContract/findAllByPage',
    method: 'post',
    data
  });
}
// 保存或修改合同
export function saveContract(data) {
  return request({
    url: 'scm/providerContract/saveAndUpdate',
    method: 'post',
    data
  });
}
// 合同详情
export function contractDetail(params) {
  return request({
    url: `scm/providerContract/detail/${params.id}`,
    method: 'get'
  });
}
// 合同删除
export function contractDelete(params) {
  return request({
    url: `scm/providerContract/delete/${params.id}`,
    method: 'get'
  });
}
// 证件详情
export function credentialDetail(params) {
  return request({
    url: `scm/credential/detail`,
    method: 'get',
    params
  });
}
// 获取保司结算列表
export function getCompanySettlementList(data) {
  return request({
    url: `insurance/company-settlement/bill/list`,
    method: 'post',
    data
  });
}
// 获取保司结算详情
export function getCompanySettlementDetail(params) {
  return request({
    url: `insurance/company-settlement/bill-detail`,
    method: 'get',
    params
  });
}

// 获取保司结算详情列表
export function getCompanySettlementDetailList(data) {
  return request({
    url: 'insurance/company-settlement/bill-item/list',
    method: 'post',
    data
  });
}
// 获取保司结算详情详情
// export function getCompanySettlementDetailDetail(data) {
//     return request({
//         url: "insurance/company-settlement/bill-item/detail",
//         method: "post",
//         data
//     });
// }
// 结算单详情更新
export function setCompanySettlementDetail(data) {
  return request({
    url: 'insurance/company-settlement/bill/update',
    method: 'post',
    data
  });
}
// 结算单统计
export function getSettlementStatistics(data) {
  return request({
    url: `insurance/company-settlement/bill/statistics`,
    method: 'post',
    data
  });
}
// 完成人列表
export function getFinisherList(params) {
  return request({
    url: `insurance/company-settlement/finisher`,
    method: 'get',
    params
  });
}
// 账期列表
export function getSettlementMonth(params) {
  return request({
    url: `insurance/company-settlement/settlement-month`,
    method: 'get',
    params
  });
}
// 保险公司的承保机构
export function getAgencyList(params) {
  return request({
    url: `insurance/company-settlement/agency`,
    method: 'get',
    params
  });
}
// 服务项列表查询
export function getServiceList() {
  return request({
    url: 'scm/serviceInfo/infos',
    method: 'get'
  });
}
// 保存理赔结算留言
export function setCompanySettlementMessage(data) {
  return request({
    url: 'insurance/company-settlement/bill-detail/update/remark',
    method: 'post',
    data
  });
}
// 理赔结算明细详情
export function getCompanySettlementDetailDetail(params) {
  return request({
    url: `insurance/company-settlement/bill-item/detail/${params.id}`,
    method: 'get',
    params
  });
}

// 理赔结算明细统计数据
export function getSettleDetailStatistics(data) {
  return request({
    url: 'insurance/company-settlement/bill-item/statistics',
    method: 'post',
    data
  });
}

/**
 * 添加合同
 * @param {*} data
 * @returns
 */
export function addContract(data) {
  return request({
    url: 'scm/providerContract/save',
    method: 'post',
    data
  });
}
/**
 * 更新合同
 * @param {*} data
 * @returns
 */
export function updateContract(data) {
  return request({
    url: 'scm/providerContract/update',
    method: 'post',
    data
  });
}
/**
 * 保单结算统计
 * @param {*} data
 * @returns
 */
export function getPolicySettlementStatistics(data) {
  return request({
    url: 'insurance/policy-settlement/bill/statistics',
    method: 'post',
    data
  });
}

export function exportSettlementDetail(ids, type) {
  return request({
    url: '/scm/settlement/data/export',
    method: 'post',
    data: { ids, type }
  });
}
/**
 * 上传pdf或图片
 * @param {*} file
 * @param {*} type
 * @returns
 */
export function uploadPicOrPdf(file, type) {
  return request({
    url: `/scm/sys/uploadPdfOrPic?type=${type}`,
    data: file,
    method: 'post',
    timeout: 150000
  });
}
/**
 * 上传券码
 * @param {*} data
 * @returns
 */
export function uploadCode(data) {
    return request({
        url: 'scm/serviceInfo/thirdCodeImport',
        method: 'post',
        data
    });
}
