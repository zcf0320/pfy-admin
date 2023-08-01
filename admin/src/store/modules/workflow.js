import * as workflowApi from '@/api/workflow';

const actions = {
  // 增减常用菜单
  menusUpdate(ctx, params) {
    return workflowApi.menusUpdate(params);
  },
  // 菜单
  menusList(ctx, params) {
    return workflowApi.menusList(params);
  },
  // 待处理
  todoList(ctx, params) {
    return workflowApi.todoList(params);
  }
};

export default {
  namespaced: true,
  actions
};
