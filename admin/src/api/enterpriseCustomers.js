import request from '@/utils/request';

// 企业客户列表信息
export function getCustomerList(data) {
    return request({
        url: 'scm/companyCustomer/list',
        method: 'post',
        data
    });
}
// 保存企业客户信息
export function createCustomer(data) {
    return request({
        url: 'scm/companyCustomer/save',
        method: 'post',
        data
    });
}
// 更新企业客户信息
export function updateCustomer(data) {
    return request({
        url: 'scm/companyCustomer/update',
        method: 'post',
        data
    });
}
// 启用企业客户账号状态
export function enableCompanyStatus(params) {
    return request({
        url: `scm/companyCustomer/enableCompany/${params.id}/${
            params.accountStatus
        }`,
        method: 'get'
    });
}
// 停用企业客户账号状态
export function disableCompanyStatus(params) {
    return request({
        url: `scm/companyCustomer/disableCompany/${params.id}/${
            params.accountStatus
        }`,
        method: 'get'
    });
}
// 查询企业客户详情
export function getCustomerDetails(params) {
    return request({
        url: 'scm/companyCustomer/detail',
        method: 'get',
        params
    });
}
// 删除企业客户
export function deleteCustomer(params) {
    return request({
        url: 'scm/companyCustomer/delete',
        method: 'get',
        params
    });
}
// 企业客户企业名称去重校验
export function checkDistinctName(params) {
    return request({
        url: 'scm/companyCustomer/checkDistinctName',
        method: 'get',
        params
    });
}
// 企业客户简称去重校验
export function checkDistinctSimpleName(params) {
    return request({
        url: 'scm/companyCustomer/checkDistinctSimpleName',
        method: 'get',
        params
    });
}
