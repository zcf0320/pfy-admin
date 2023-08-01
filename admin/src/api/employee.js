import request from '@/utils/request';

// 获取用户列表
export function getEmployeeList(data) {
    return request({
        url: 'scm/employeeManager/list',
        method: 'post',
        data
    });
}
// 获取创建人
export function getEmployeeAll(params) {
    return request({
        url: 'scm/employeeManager/all',
        method: 'get',
        params
    });
}
// 新增用户
export function employeeSave(data) {
    return request({
        url: 'scm/employeeManager/save',
        method: 'post',
        data
    });
}
// 获取账号详情
export function getEmployeeDetail(id) {
    return request({
        url: `scm/employeeManager/detail/${id}`,
        method: 'get'
    });
}
// 删除账号
export function deleteEmployee(id) {
    return request({
        url: `scm/employeeManager/del/${id}`,
        method: 'get'
    });
}
// 重置密码
export function resetPassword(id) {
    return request({
        url: `scm/employeeManager/resetPassword/${id}`,
        method: 'get'
    });
}
// 修改用户登录名和角色
export function updateUserNameAndRoles(data) {
    return request({
        url: 'scm/employeeManager/updateUserNameAndRoles',
        method: 'post',
        data
    });
}
