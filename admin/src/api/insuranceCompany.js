import request from '@/utils/request';
// 下拉保险公司列表查询
export function getInsuranceCompanyList(params) {
    return request({
        url: 'insurance/insuranceCompany/info/list',
        method: 'get',
        params
    });
}
// 保险公司列表
export function getInsuranceCompanyListInput(data) {
    return request({
        url: 'insurance/insuranceCompany/list',
        method: 'post',
        data
    });
}
// 新增保险公司
export function addInsuranceCompany(data) {
    return request({
        url: 'insurance/insuranceCompany/save',
        method: 'post',
        data
    });
}
// 跟新保险公司
export function updateInsuranceCompany(data) {
    return request({
        url: 'insurance/insuranceCompany/update',
        method: 'post',
        data
    });
}
// 获取保险公司详情
export function getInsuranceCompanyDetails(params) {
    return request({
        url: 'insurance/insuranceCompany/detail',
        method: 'get',
        params
    });
}
// 删除保险公司
export function deleteInsuranceCompany(params) {
    return request({
        url: 'insurance/insuranceCompany/delete',
        method: 'get',
        params
    });
}
// 启用
export function activeCompany(params) {
    return request({
        url: 'insurance/insuranceCompany/activeCompany',
        method: 'get',
        params
    });
}
// 停用
export function stopCompany(params) {
    return request({
        url: 'insurance/insuranceCompany/stopCompany',
        method: 'get',
        params
    });
}
// 保单结算控制器
// 保险公司的承保机构
export function policyAgency(params) {
    return request({
        url: 'insurance/policy-settlement/agency',
        method: 'get',
        params
    });
}
// 结算单详情
export function getBillDetail(params) {
    return request({
        url: 'insurance/policy-settlement/bill-detail',
        method: 'get',
        params
    });
}
// 结算单明细详情
export function getBillDetailDetail(params) {
    return request({
        url: 'insurance/policy-settlement/bill-item-detail',
        method: 'get',
        params
    });
}

// 结算单明细列表
export function getPolicyDetailList(data) {
    return request({
        url: 'insurance/policy-settlement/bill-item/list',
        method: 'post',
        data
    });
}
// 结算单列表-分页
export function getPolicyList(data) {
    return request({
        url: 'insurance/policy-settlement/bill/list',
        method: 'post',
        data
    });
}
// 结算单统计
export function getPolicyStatistics(data) {
    return request({
        url: 'insurance/policy-settlement/bill-item/statistics',
        method: 'post',
        data
    });
}
// 完成人列表
export function getFinisherList(params) {
    return request({
        url: 'insurance/policy-settlement/finisher',
        method: 'get',
        params
    });
}
// 结算规则列表
export function getRuleList(params) {
    return request({
        url: 'insurance/policy-settlement/rule/list',
        method: 'get',
        params
    });
}
// 配置结算规则
export function setSettlementRule(data) {
    return request({
        url: 'insurance/policy-settlement/rule/save',
        method: 'post',
        data
    });
}
// 账期列表
export function getMonthList() {
    return request({
        url: 'insurance/policy-settlement/settlement-month',
        method: 'get'
    });
}
// 结算单详情更新图片
export function setPolicySettlementDetail(data) {
    return request({
        url: 'insurance/policy-settlement/bill/update',
        method: 'post',
        data
    });
}
// 保存留言
export function setPolicySettlementMessage(data) {
    return request({
        url: 'insurance/policy-settlement/bill-detail/update/remark',
        method: 'post',
        data
    });
}
// //保单结算明细导出
// export function exportPolicySettle() {
//     return request({
//         url: 'insurance/policy-settlement/policy/export',
//         method: 'get'
//     })
// }
// //理赔结算明细导出
// export function exportClaimSettle() {
//     return request({
//         url: 'insurance/company-settlement/claim/export',
//         method: 'get'
//     })
// }
// 保单结算明细导出
export function exportPolicySettle() {
    return `${process.env.VUE_APP_BASE_API}insurance/policy-settlement/policy/export`;
}
// 理赔结算明细导出
export function exportClaimSettle() {
    return `${process.env.VUE_APP_BASE_API}insurance/company-settlement/claim/export`;
}
// 保单结算明细导出
export function exportPolicyDetail(data) {
    return request({
        url: 'insurance/policy-settlement/policy/export',
        method: 'post',
        data
    });
}
/**
 * 保司销售结算单列表
 * @param {*} data
 * @returns
 */
export function getInsuranceCompanySalesList(data) {
    return request({
        url: 'insurance/policy-settlement/bill/list',
        method: 'post',
        data
    });
}
/**
 * 新增保司销售结算
 * @param {*} data
 * @returns
 */
export function addInsuranceSales(data) {
    return request({
        url: 'insurance/policy-settlement/bill/saleAdd',
        method: 'post',
        data
    });
}
/**
 * 更新保司销售结算
 * @param {*} data
 * @returns
 */
export function updateInsuranceSales(data) {
    return request({
        url: 'insurance/policy-settlement/bill/saleUpdate',
        method: 'post',
        data
    });
}
/**
 * 保司销售结算详细信息
 * @param {*} settlementNo
 * @returns
 */
export function getInsuranceSalesDetail(settlementNo) {
    return request({
        url: `insurance/policy-settlement/bill-detail?id=${settlementNo}`,
        method: 'get'
    });
}
/**
 * 获取上传发票列表
 * @param {*} params
 * @returns
 */
export function getSettlementInvoiceList(params) {
    return request({
        url: '/insurance/scm-settlement-bill/selectByPage',
        params,
        method: 'get'
    });
}
/**
 * 上传发票图片
 * @param {*} data
 * @returns
 */
export function uploadSettlementInvoice(data) {
    return request({
        url: '/insurance/scm-settlement-bill/uploadSettlementBill',
        data,
        method: 'post',
        timeout: 1500000
    });
}
/**
 * 删除发票图片
 * @param {*} id
 * @returns
 */
export function deleteSettlementInvoice(id) {
    return request({
        url: '/insurance/scm-settlement-bill/delete',
        data: {
            id
        },
        method: 'post'
    });
}
