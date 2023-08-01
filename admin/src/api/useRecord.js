import request from '@/utils/request';
export default {
  /**
   * 获取使用记录列表
   * @param {*} params
   * @returns
   */
  getPageRecordList(data) {
    return request({
      url: 'questionnaire/management/list',
      method: 'post',
      data
    });
  },
  /**
   * 获取使用记录详情
   * @param {*} data
   * @returns
   */
  getPageRecordDetail(data) {
    return request({
      url: 'questionnaire/management/listDe',
      method: 'post',
      data
    });
  },
  /**
   * 获取项目名称
   * @returns
   */
  getPageCodeList() {
    return request({
      url: '/questionnaire/management/get/service/list',
      method: 'get'
    });
  },
  getPatientList(params) {
    return request({
      url: `dossier/public/service-dossier/getAllDossierList`,
      method: 'get',
      params
    });
  },
  // 获取病人电子病历详情
  getDossierInfo(params) {
    return request({
      url: `dossier/public/service-dossier/get/dossier/info`,
      method: 'get',
      params
    });
  },
  // 操作日志
  getLogListByTypeDocter(params) {
    return request({
      url: `dossier/public/service-dossier/log`,
      method: 'get',
      params
    });
  },
  /**
   * 获取问卷详情
   * @param {*} id
   * @returns
   */
  getQuestionnaireDetail(id) {
    return request({
      url: `questionnaire/management/questionnaire/detail?id=${id}`,
      method: 'get'
    });
  },
  // 获取用户睡眠使用记录列表
  getSleepManageList(params) {
    return request({
      url: `health-management/public/sleepManage/getList`,
      method: 'get',
      params
    });
  },
  // 获取用户睡眠详情
  getSleepManageDetail(params) {
    return request({
      url: `health-management/public/sleepManage/getUserInfo`,
      method: 'get',
      params
    });
  },
  // 按照userId查看问卷结果
  getQuestionResultByUser(params) {
    return request({
      url: `health-management/public/sleepManage/getQuestionResultByUser`,
      method: 'get',
      params
    });
  },
  // 按照userId和日期查看用户睡眠日记
  getSleepRecordByUser(params) {
    return request({
      url: `health-management/public/sleepManage/getSleepRecordByUser`,
      method: 'get',
      params
    });
  },
  // 查找用药计划列表(分页)
  getMedicationPlanList(params) {
    return request({
      url: `health-management/medication/plan/findAllByPage`,
      method: 'get',
      params
    });
  },
  /**
   * 查找用药计划详情
   * @param {*} params
   * @returns
   */
  getMedicationPlanDetail(params) {
    return request({
      url: `health-management/medication/plan/findAllByPageDe`,
      method: 'get',
      params
    });
  },
  // 查找用药详情(年月日查找)
  findMedicationHistory(data) {
    return request({
      url: `health-management/medication/plan/findHistory`,
      method: 'post',
      data
    });
  },
  /**
   * 打卡记录趋势图
   * @param {*} params
   * @returns
   */
  getPunchRecord(params) {
    return request({
      url: 'health-management/public/sleepManage/getTrendByUser',
      method: 'get',
      params
    });
  },
  /**
   * 甲状腺测试问卷使用列表
   * @param {*} params
   * @returns
   */
  getThyroidQuestionnaireRecord(params) {
    return request({
        url: 'health-management/public/questionnaire/getQuestionResultByUser',
        method: 'get',
        params
      });
  }
};

