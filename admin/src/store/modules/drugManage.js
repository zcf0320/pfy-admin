import * as drugManageApi from '@/api/drugManage';
import { indexOf } from 'lodash';

const state = {
  goodsListIds: [],
  goodsList: [],
  oldList: [],
  serviceTypeName: '',
  pageState: true,
  diseaseName: '',
  diseaseIds: []
};

const mutations = {
  SET_GOODS: (state, data) => {
    const { goodsListIds, goodsList } = data;
    state.goodsListIds = goodsListIds;
    state.goodsList = goodsList;
  },
  SET_SERVICE_TYPE_NAME: (state, serviceTypeName) => {
    state.serviceTypeName = serviceTypeName;
  },
  SET_PAGE_STATE: (state, params) => {
    state.pageState = params;
  },
  SET_DISEASE_NAME: (state, params) => {
    state.diseaseName = params;
  },
  SET_OLD: (state, data) => {
    const { oldList } = data;
    state.oldList = oldList;
  },
  SET_DISEASE_IDS: (state, data) => {
    state.diseaseIds = data;
  }
};

const actions = {
  // 获取应用设置列表
  getApplicationList(ctx, params) {
    return drugManageApi.getApplicationList(params);
  },
  // 新增应用设置
  createApplication(ctx, params) {
    return drugManageApi.createApplication(params);
  },
  // 更新应用设置
  updateApplication(ctx, params) {
    return drugManageApi.updateApplication(params);
  },
  // 删除应用设置
  deleteApplication(ctx, params) {
    return drugManageApi.deleteApplication(params);
  },
  // 获取应用设置
  getApplicationDetails(ctx, params) {
    return drugManageApi.getApplicationDetails(params);
  },
  // 获取商品二级分类
  getSecondTypes(ctx, params) {
    return drugManageApi.getSecondTypes(params);
  },
  // 更新购买策略
  updateStrategy(ctx, params) {
    return drugManageApi.updateStrategy(params);
  },
  // 查询购买策略
  getStrategy(ctx, params) {
    return drugManageApi.getStrategy(params);
  },
  // 获取订单日志列表
  getLogsList(ctx, params) {
    return drugManageApi.getLogsList(params);
  },
  // 获取结算列表
  getSettleList(ctx, params) {
    return drugManageApi.getSettleList(params);
  },
  // 获取结算列表
  getSettleDetail(ctx, params) {
    return drugManageApi.getSettleDetail(params);
  },
  // 获取所有供应商
  getSuppliersList(ctx, params) {
    return drugManageApi.getSuppliersList(params);
  },
  // 获取结算订单详情
  getSettleOrders(ctx, params) {
    return drugManageApi.getSettleOrders(params);
  },
  // 确认结算
  confirmSettlement(ctx, params) {
    return drugManageApi.confirmSettlement(params);
  },
  // 导出结算明细
  exportExcel(ctx, params) {
    return drugManageApi.exportExcel(params);
  },
  // 改变商品
  changeGoodsList({ commit }, params) {
    const { checked, id } = params;
    if (checked) {
      state.goodsList.push(params);
      state.goodsListIds.push(id);
    } else {
      const index = indexOf(state.goodsListIds, id);
      state.goodsListIds.splice(index, 1);
      state.goodsList.splice(index, 1);
    }
    state.goodsList.forEach(item => {
      if (item.saleState === 1004) {
        item.status = 1;
      } else {
        item.status = 0;
      }
    });
    commit('SET_GOODS', {
      goodsList: state.goodsList,
      goodsListIds: state.goodsListIds
    });
  },
  // 根据类型获取药品
  findMedicineByType(ctx, params) {
    return drugManageApi.findMedicineByType(params);
  },
  // 校验是否重名
  checkName(ctx, params) {
    return drugManageApi.checkName(params);
  },
  // 获取基础药品库列表
  getBasisDrugList(ctx, params) {
    return drugManageApi.getBasisDrugList(params);
  },
  // 药价监控列表
  drugMonitor(ctx, params) {
    return drugManageApi.drugMonitor(params);
  },
  // 药价监控详情
  drugMonitorDetail(ctx, params) {
    return drugManageApi.drugMonitorDetail(params);
  },
  // 获取药品规格
  getDrugFormat(ctx, params) {
    return drugManageApi.getDrugFormat(params);
  },
  // 获取商家列表
  getMerchantList() {
    return drugManageApi.getMerchantList();
  },
  // 获取药品详情
  getDrugDetail(ctx, params) {
    return drugManageApi.getDrugDetail(params);
  },
  // 带入疾病信息
  setDiseaseName({ commit }, params) {
    commit('SET_DISEASE_NAME', params);
  },
  // 获取最新价格
  getNewDrugPrice(ctx, params) {
    return drugManageApi.getNewDrugPrice(params);
  },
  // 疾病图谱
  diseasesChart(ctx, params) {
    return drugManageApi.diseasesChart(params);
  },
  // 结算订单列表导出
  settlementDetails(ctx, params) {
    return drugManageApi.settlementDetails(params);
  },
  // 获取药品相关单位
  getDrugUnits(ctx, params) {
    return drugManageApi.getDrugUnits(params);
  },
  // 更新基础药品
  updateDrugDetails(ctx, params) {
    return drugManageApi.updateDrugDetails(params);
  },
  // 根据药房网药品库ID查询基础药品库药品包含的疾病信息
  getDiseasesByMedicine(ctx, params) {
    return drugManageApi.getDiseasesByMedicine(params);
  },
  // 批量更新药品，查询药品名
  getDiseasesNameList(ctx, params) {
    return drugManageApi.getDiseasesNameList(params);
  },
  // 批量更新，药品详情
  getDiseasesNameDetail(ctx, params) {
    return drugManageApi.getDiseasesNameDetail(params);
  },
  // 批量更新药品
  batchUpdateDrug(ctx, params) {
    return drugManageApi.batchUpdateDrug(params);
  },
  // 药品价格曲线
  viewCharts(ctx, params) {
    return drugManageApi.viewCharts(params);
  },
  // 药品分类
  getMedicineTypes() {
    return drugManageApi.getMedicineTypes();
  },
  // 设置详情
  //   appSettingDetail(ctx) {
  //     return drugManageApi.appSettingDetail();
  //   },
  // 点击上架出现提示药品关联的应用设置
  getMedicineStatus(ctx, params) {
    return drugManageApi.getMedicineStatus(params);
  },
  // 修改药品销售状态
  updateMedicineStatus(ctx, params) {
    return drugManageApi.updateMedicineStatus(params);
  },
  // 通过基础药品库进行搜索
  findDrug(ctx, params) {
    return drugManageApi.findDrug(params);
  },
  // 新增或者修改风险项
  saveOrUpdateRisk(ctx, params) {
    return drugManageApi.saveOrUpdateRisk(params);
  },
  // 查看风险项
  medicineRiskDetail(ctx, params) {
    return drugManageApi.medicineRiskDetail(params);
  },
  setDiseaseIds({ commit }, params) {
    commit('SET_DISEASE_IDS', params);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
