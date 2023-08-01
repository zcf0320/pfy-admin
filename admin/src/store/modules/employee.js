import * as employeeApi from '@/api/employee';

const actions = {
  // 新增账号
  employeeSave(ctx, params) {
    return employeeApi.employeeSave(params);
  },
  // 获取用户列表
  getEmployeeList(ctx, params) {
    return employeeApi.getEmployeeList(params);
  },
  // 获取创建人
  getEmployeeAll(ctx, params) {
    return employeeApi.getEmployeeAll(params);
  },
  // 获取账号详情
  getEmployeeDetail(ctx, params) {
    return employeeApi.getEmployeeDetail(params);
  },
  // 删除账号
  deleteEmployee(ctx, params) {
    return employeeApi.deleteEmployee(params);
  },
  // 重置密码
  resetPassword(ctx, params) {
    return employeeApi.resetPassword(params);
  },
  // 修改用户登录名和角色
  updateUserNameAndRoles(ctx, params) {
    return employeeApi.updateUserNameAndRoles(params);
  }
};

export default {
  namespaced: true,
  actions
};
