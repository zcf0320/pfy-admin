import * as enterpriseCustomers from '@/api/enterpriseCustomers';

const actions = {
  // 企业客户列表信息
  getCustomerList(ctx, params) {
    return enterpriseCustomers.getCustomerList(params);
  },
  // 保存企业客户信息
  createCustomer(ctx, params) {
    return enterpriseCustomers.createCustomer(params);
  },
  // 查询企业客户详情
  getCustomerDetails(ctx, params) {
    return enterpriseCustomers.getCustomerDetails(params);
  },
  // 更新企业客户信息
  updateCustomer(ctx, params) {
    return enterpriseCustomers.updateCustomer(params);
  },
  // 启用企业客户账号状态
  enableCompanyStatus(ctx, params) {
    return enterpriseCustomers.enableCompanyStatus(params);
  },
  // 停用企业客户账号状态
  disableCompanyStatus(ctx, params) {
    return enterpriseCustomers.disableCompanyStatus(params);
  },
  // 删除企业客户
  deleteCustomer(ctx, params) {
    return enterpriseCustomers.deleteCustomer(params);
  },
  // 企业客户企业名称去重校验
  checkDistinctName(ctx, params) {
    return enterpriseCustomers.checkDistinctName(params);
  },
  // 企业客户简称去重校验
  checkDistinctSimpleName(ctx, params) {
    return enterpriseCustomers.checkDistinctSimpleName(params);
  }
};

export default {
  namespaced: true,
  actions
};
