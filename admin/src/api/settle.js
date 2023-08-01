import request from '@/utils/request';

// 导出财务审批
export function approvalDownload(params) {
    params = JSON.stringify(params);
    return `${
        process.env.VUE_APP_BASE_API
    }scm/financial/approval/download/${params}`;
}
// 财务中心
// 搜索类型
export function getTypeList() {
    return request({
        url: 'scm/financial/data/types',
        method: 'get'
    });
}
// 搜索
export function getKeywordList(params) {
    return request({
        url: 'scm/financial/data/search',
        method: 'get',
        params
    });
}
// 保险公司
export function getCompanyData(data) {
    return request({
        url: 'scm/financial/data/insurance/company',
        method: 'post',
        data
    });
}
// 保单
export function getPolicyData(data) {
    return request({
        url: 'scm/financial/data/insurance/policy',
        method: 'post',
        data
    });
}
// 保险产品
export function getProductData(data) {
    return request({
        url: 'scm/financial/data/insurance/product',
        method: 'post',
        data
    });
}
// 服务项
export function getServiceItemData(data) {
    return request({
        url: 'scm/financial/data/service/item',
        method: 'post',
        data
    });
}
// 服务单
export function getServiceBillData(data) {
    return request({
        url: 'scm/financial/data/service/online',
        method: 'post',
        data
    });
}
// 供应商
export function getSupplierData(data) {
    return request({
        url: 'scm/financial/data/service/supplier',
        method: 'post',
        data
    });
}
// 获取结算明细详情
export function getSupplierDetail(data) {
    return request({
        url: `scm/settlement/getSettlementDetails/detail`,
        method: 'post',
        data
    });
}
/**
 * 修改供应商结算明细详情信息
 * @param {*} data
 * @returns
 */
export function updateSettlementDetail(data) {
return request({
    url: 'scm/settlement/settlementDetailUpdate',
    method: 'post',
    data
});
}
