import * as inventoryApi from '@/api/inventory';

const state = {
  insuranceTypes: []
};

const mutations = {
  SET_INSURANCE_TYPES: (state, data) => {
    state.insuranceTypes = data;
  }
};

const actions = {
  // 调整服务项库存
  adjustInventory(ctx, params) {
    return inventoryApi.adjustInventory(params);
  },
  // 库存分配列表
  listInventory(ctx, params) {
    return inventoryApi.listInventory(params);
  },
  // 库存预警消列表
  listWarningMessage(ctx, params) {
    return inventoryApi.listWarningMessage(params);
  },
  // 库存预警消列表
  getItemStatistics(ctx, params) {
    return inventoryApi.getItemStatistics(params);
  },
  // 库存获取基础信息
  getBaseData(ctx, params) {
    return inventoryApi.getBaseData(params);
  },
  // 库存预警消列表
  detailInventory(ctx, params) {
    return inventoryApi.detailInventory(params);
  },
  // 新增预警通知人
  addWarningMessage(ctx, params) {
    return inventoryApi.addWarningMessage(params);
  },
  // 编辑预警通知人
  updateWarningMessage(ctx, params) {
    return inventoryApi.updateWarningMessage(params);
  },
  // 详情预警通知人
  detailWarningMessage(ctx, params) {
    return inventoryApi.detailWarningMessage(params);
  },
  // 删除预警通知人
  delWarningMessage(ctx, params) {
    return inventoryApi.delWarningMessage(params);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
