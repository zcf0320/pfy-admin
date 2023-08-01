import request from '@/utils/request';

// 获取tree资源
export function getTree() {
  return request({
    url: 'scm/authGroup/list',
    method: 'get'
  });
}
// 新增或编辑角色
export function roleSaveOrUpdate(data) {
  return request({
    url: 'scm/authGroup/role/add',
    method: 'post',
    data
  });
}
// 获取角色列表
export function getRoleList() {
  return request({
    url: `scm/authGroup/role/list`,
    method: 'get'
  });
}
// 获取角色详情
export function getRoleDetail(id) {
  return request({
    url: `scm/authGroup/role/detail/${id}`,
    method: 'get'
  });
}
// 删除角色
export function deleteRole(id) {
  return request({
    url: `scm/authGroup/role/del/${id}`,
    method: 'get'
  });
}
// 获取角色接口权限详情
export function getRoleAuthDetail(id) {
  return request({
    url: `scm/authGroup/role/roleAuthDetail/${id}`,
    method: 'get'
  });
}
// 编辑角色接口权限详情
export function addRoleAuth(data) {
  return request({
    url: 'scm/authGroup/role/addRoleAuth',
    method: 'post',
    data
  });
}
