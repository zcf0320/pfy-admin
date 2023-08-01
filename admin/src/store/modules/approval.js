import * as approvalApi from '@/api/approval';

const actions = {
  // 查询所有审批节点数据
  initApprovesOption(ctx, params) {
    return approvalApi.initApprovesOption(params);
  },
  // 查询审批字段
  getApprovesOption(ctx, params) {
    return approvalApi.getApprovesOption(params);
  },
  // 确认审批流
  confirmApproveStream(ctx, params) {
    return approvalApi.confirmApproveStream(params);
  },
  // 新建或更新OA审批单
  saveOrUpdate(ctx, params) {
    return approvalApi.saveOrUpdate(params);
  },
  // 更新节点审批单状态,启用状态,false停用，true启用
  updateApproveState(ctx, params) {
    return approvalApi.updateApproveState(params);
  },
  // 根据分类查询审批字段
  queryColumnByType(ctx, params) {
    return approvalApi.queryColumnByType(params);
  },
  // 查询审批实例详情
  queryApproveInstanceDetail(ctx, params) {
    return approvalApi.queryApproveInstanceDetail(params);
  }
};

export default {
  namespaced: true,
  actions
};
