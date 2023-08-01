import request from '@/utils/request';

export default {
  /**
   * 获取门店账号列表
   * @param {*} params
   * @returns
   */
  getStoreAccountList(params) {
    return request({
      url: '/scm/employeeDrugstore/page',
      params,
      method: 'get'
    });
  },
  /**
   * 重置门店账号密码
   * @param {*} id
   * @returns
   */
  resetPwd(id) {
    return request({
      url: `/scm/employeeDrugstore/resetPassword?id=${id}`,
      method: 'get'
    });
  },
  /**
   * 获取门店下拉列表
   * @returns
   */
  getStoreList() {
    return request({
      url: '/scm/employeeDrugstore/allDrugstore',
      method: 'get'
    });
  },
  /**
   * 获取门店角色下拉列表
   * @returns
   */
  getStoreRolesList() {
    return request({
      url: '/scm/employeeDrugstore/getRole',
      method: 'get'
    });
  },
  /**
   * 添加/修改门店账号
   * @param {*} data
   * @returns
   */
  updateStoreAccount(data) {
    return request({
      url: '/scm/employeeDrugstore/saveOrUpdate',
      data,
      method: 'post'
    });
  },
  /**
   * 获取账号下拉列表
   * @returns
   */
  getStoreEmployeeList() {
    return request({
      url: '/scm/employeeDrugstore/getEmployee',
      method: 'get'
    });
  },
  /**
   * 删除门店账号
   * @param {*} id
   * @returns
   */
  deleteStoreAccount(id) {
    return request({
      url: `/scm/employeeDrugstore/deleteEm?id=${id}`,
      method: 'get'
    });
  }
};
