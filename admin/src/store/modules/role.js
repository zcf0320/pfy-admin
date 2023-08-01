import * as roleApi from '@/api/role';

// const state = {

// }

// const mutations = {

// }

const actions = {
    // 获取tree
    getTree(ctx, params) {
        return roleApi.getTree(params);
    },
    // 新增编辑角色
    roleSaveOrUpdate(ctx, params) {
        return roleApi.roleSaveOrUpdate(params);
    },
    // 获取角色列表
    getRoleList(ctx, params) {
        return roleApi.getRoleList(params);
    },
    // 获取角色详情
    getRoleDetail(ctx, params) {
        return roleApi.getRoleDetail(params);
    },
    // 删除角色
    deleteRole(ctx, params) {
        return roleApi.deleteRole(params);
    },
    // 获取角色接口权限详情
    getRoleAuthDetail(ctx, params) {
        return roleApi.getRoleAuthDetail(params);
    },
    // 编辑角色接口权限详情
    addRoleAuth(ctx, params) {
        return roleApi.addRoleAuth(params);
    }
};

export default {
  namespaced: true,
  actions
};
