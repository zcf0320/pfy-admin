import * as serviceItemApi from '@/api/serviceItems';
import { getKeyList } from '@/api/system';

const state = {
  // 数据字段列表
  keyList: {
    0: [],
    1: [],
    2: [],
    3: []
  }
};
const actions = {
  // 获取数据字段
  getKeys() {
    getKeyList().then(res => {
      state.keyList = {
        0: [],
        1: [],
        2: [],
        3: []
      };
      res.obj.forEach(item => {
        switch (item.type) {
          case '0':
            state.keyList[0].push(item);
            break;
          case '1':
            state.keyList[1].push(item);
            break;
          case '2':
            state.keyList[2].push(item);
            break;
          default:
            state.keyList[3].push(item);
            break;
        }
      });
    });
  },
  // 新增服务项
  createServiceItem(ctx, params) {
    return serviceItemApi.createServiceItem(params);
  },
  // 获取服务项列表
  getServiceList(ctx, params) {
    return serviceItemApi.getServiceList(params);
  },
  // 获取服务项详情
  getServiceInfo(ctx, params) {
    return serviceItemApi.getServiceInfo(params);
  },
  // 编辑服务项
  updateServiceItem(ctx, params) {
    return serviceItemApi.updateServiceItem(params);
  },
  // 删除服务项
  deleteServiceItems(ctx, params) {
    return serviceItemApi.deleteServiceItems(params);
  },
  // 获取服务内容列表
  getServiceVos() {
    return serviceItemApi.getServiceVos();
  },
  // 获取券码列表
  getCodeList(ctx, params) {
    return serviceItemApi.getCodeList(params);
  },
  // 券码保存
  codeSave(ctx, params) {
    return serviceItemApi.codeSave(params);
  },
  // 失效券码
  cancelCode(ctx, params) {
    return serviceItemApi.cancelCode(params);
  },
  // 获取服务网点列表
  getServiceSiteList(ctx, params) {
    return serviceItemApi.getServiceSiteList(params);
  },
  // 新增服务网点
  addServiceSite(ctx, params) {
    return serviceItemApi.addServiceSite(params);
  },
  // 修改服务网点
  updateServiceSite(ctx, params) {
    return serviceItemApi.updateServiceSite(params);
  },
  // 删除服务网点
  deleteServiceSite(ctx, params) {
    return serviceItemApi.deleteServiceSite(params);
  },
  // 获取上门城市列表
  getServiceCityList(ctx, params) {
    return serviceItemApi.getServiceCityList(params);
  },
  // 新增上门城市
  addServiceCity(ctx, params) {
    return serviceItemApi.addServiceCity(params);
  },
  // 修改上门城市
  updateServiceCity(ctx, params) {
    return serviceItemApi.updateServiceCity(params);
  },
  // 删除上门城市
  deleteServiceCity(ctx, params) {
    return serviceItemApi.deleteServiceCity(params);
  },
  // 获取供应商列表
  getCreditList(ctx, params) {
    return serviceItemApi.getCreditList(params);
  },
  // 获取体征详情
  getSignServiceDetail(ctx, params) {
    return serviceItemApi.getSignServiceDetail(params);
  },
  // 获取服务项信息及对应的供应商信息
  getServiceListAndProvider(ctx, params) {
    return serviceItemApi.getServiceListAndProvider(params);
  },
  // 获取预约配置字段信息
  getReverseConfigs() {
    return serviceItemApi.getReverseConfigs();
  },
  // 保存预约配置字段信息
  saveReverseConfig(ctx, params) {
    return serviceItemApi.saveReverseConfig(params);
  },
  // 发布
  publishServiceInfo(ctx, params) {
    return serviceItemApi.publishServiceInfo(params);
  },
  // 下架
  downShelfServiceInfo(ctx, params) {
    return serviceItemApi.downShelfServiceInfo(params);
  },
  // 获取所有服务项
  getAllServiceList() {
    return serviceItemApi.getAllServiceList();
  },
  // 获取供应商类型
  getProviderType(ctx, params) {
    return serviceItemApi.getProviderType(params);
  },
  getProviderData(ctx, params) {
    return serviceItemApi.getProviderData(params);
  },
  getServiceStatus(ctx, params) {
    return serviceItemApi.getServiceStatus(params);
  },
  getServiceStatusData(ctx, params) {
    return serviceItemApi.getServiceStatusData(params);
  },
  // 服务项类型使用次数
  findServiceUseCount(ctx, params) {
    return serviceItemApi.findServiceUseCount(params);
  },
  getProviderAreaData(ctx, params) {
    return serviceItemApi.getProviderAreaData(params);
  },
  presbyopicGlasses(ctx, params) {
    return serviceItemApi.presbyopicGlasses(params);
  },
  getSettlementRuleMethod(ctx, params) {
    return serviceItemApi.getSettlementRuleMethod(params);
  },
  saveSettlementRuleMethod(ctx, params) {
    return serviceItemApi.saveSettlementRuleMethod(params);
  },
  getRelaPackages(ctx, params) {
    return serviceItemApi.getRelaPackages(params);
  },
  getServiceinfos(ctx, params) {
    return serviceItemApi.getServiceinfos(params);
  },
  setServiceLable(ctx, params) {
    return serviceItemApi.setServiceLable(params);
  },
  getServiceSetDetail(ctx, params) {
    return serviceItemApi.getServiceSetDetail(params);
  },
  getServiceLstByType(ctx, params) {
    return serviceItemApi.getServiceLstByType(params);
  }
};

export default {
  namespaced: true,
  state,
  actions
};
