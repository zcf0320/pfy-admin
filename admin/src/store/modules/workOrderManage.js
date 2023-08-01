import * as workOrderManageApi from '@/api/workOrderManage';

const actions = {
  // 获取工单
  getList(ctx, params) {
    return workOrderManageApi.getList(params);
  },
  // 获取医生的工单数据
  getDayMgs(ctx, params) {
    return workOrderManageApi.getDayMgs(params);
  }
};

export default {
  namespaced: true,
  actions
};
