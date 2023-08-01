import request from '@/utils/request';
export default {
  /**
   * 激活码列表导出
   * @param {*} params
   * @returns
   */
  getActiveCodeCount(data) {
    return request({
      url: 'scm/recordExportCount/activeCodeList',
      method: 'post',
      data
    });
  },
  /**
   * 激活码列表导出
   * @param {*} params
   * @returns
   */
  getOnlineServiceCount(data) {
    return request({
      url: 'scm/recordExportCount/onlineServiceList',
      method: 'post',
      data
    });
  },
  /**
   * 实物商品兑换列表导出
   * @param {*} params
   * @returns
   */
  getCommodityExchangeCount(data) {
    return request({
      url: 'scm/recordExportCount/queryAndExportPhysicalCommodityExchange',
      method: 'post',
      data
    });
  },
  /**
   * 团险投保列表列表导出
   * @param {*} params
   * @returns
   */
  getGroupInsuranceCount(data) {
    return request({
      url: 'scm/recordExportCount/queryGroupInsuranceAndExport',
      method: 'post',
      data
    });
  },
  /**
   * 个险投保列表列表导出
   * @param {*} params
   * @returns
   */
  getSingleInsuranceCount(data) {
    return request({
      url: 'scm/recordExportCount/querySingleInsuranceAndExport',
      method: 'post',
      data
    });
  },
  /**
   * 预约列表导出
   * @param {*} params
   * @returns
   */
  getReverseListCount(data) {
    return request({
      url: 'scm/recordExportCount/reverseList',
      method: 'post',
      data
    });
  },
  /**
   * 用户列表导出
   * @param {*} params
   * @returns
   */
  getUserListCount(data) {
    return request({
      url: 'scm/recordExportCount/userList',
      method: 'post',
      data
    });
  },
  /**
   * 保单导出统计
   * @param {*} params
   * @returns
   */
  getPolicyManageCount(params) {
    return request({
      url: 'insurance/policyManage/policy/exportCount',
      method: 'get',
      params
    });
  },
  /**
   * 个险保单导出
   * @param {*} params
   * @returns
   */
  exportPolicyManageCount(params) {
    return request({
      url: 'insurance/policyManage/policy/export',
      method: 'get',
      params
    });
  },
  /**
   * 保单结算导出统计
   * @param {*} params
   * @returns
   */
  getPolicySettlementCount(params) {
    return request({
      url: 'insurance/policy-settlement/policy/exportCount',
      method: 'get',
      params
    });
  },
  /**
   * 保单结算导出
   * @param {*} params
   * @returns
   */
  exportPolicySettlementCount(params) {
    return request({
      url: 'insurance/policy-settlement/policy/export',
      method: 'get',
      params
    });
  }
};
