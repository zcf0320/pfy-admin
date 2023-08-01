import request from '@/utils/request';
export default {
  /**
   * 查找青少年用户列表
   * @param {*} data
   * @returns
   */
  getStudentList(data) {
    return request({
      url: 'health-management/teenager-manage/findAllByPage',
      data,
      method: 'post'
    });
  },
  /**
   * 查找青少年用户详情
   * @param {*} id
   * @returns
   */
  getStudentInfoById(id) {
    return request({
      url: `health-management/teenager-manage/detail?id=${id}`,
      method: 'get'
    });
  },
  /**
   * 获取学校列表
   * @returns
   */
  getSchoolList() {
    return request({
      url: 'health-management/public/common/school/list',
      method: 'get'
    });
  },
  // 青少年数据统计
  // 获取学校学生年龄段
  getStuAge(params) {
    return request({
      url: `health-management/teenager-manage/getStuAge`,
      method: 'get',
      params
    });
  },
  // 获取学校身高体重
  getStuWeightAndHeight(params) {
    return request({
      url: `health-management/teenager-manage/getStuWeightAndHeight`,
      method: 'get',
      params
    });
  },
  // 获取全校压力平均分
  getStuPressure(params) {
    return request({
      url: `health-management/teenager-manage/getStuPressure`,
      method: 'get',
      params
    });
  },
  // 获取学校营养平均分
  getStuHealthAvg(params) {
    return request({
      url: `health-management/teenager-manage/getStuHealthAvg`,
      method: 'get',
      params
    });
  },
  // 获取学校年龄段学生性别
  getStuSexProportion(params) {
    return request({
      url: `health-management/teenager-manage/getStuSexProportion`,
      method: 'get',
      params
    });
  },
  // 获取学校年龄段学生bmi
  getStuBmi(params) {
    return request({
      url: `health-management/teenager-manage/getStuBmi`,
      method: 'get',
      params
    });
  },
  // 获取学校近视数据
  getStuEye(params) {
    return request({
      url: `health-management/teenager-manage/getStuEye`,
      method: 'get',
      params
    });
  },
  // 获取各年龄段睡眠时长
  getSleepTime(params) {
    return request({
      url: `health-management/teenager-manage/getSleepTime`,
      method: 'get',
      params
    });
  },
  // 获取各年龄段压力平均分
  getPressureAvg(params) {
    return request({
      url: `health-management/teenager-manage/getPressureAvg`,
      method: 'get',
      params
    });
  },
  // 查找糖尿病列表(分页)
  getDiabetesList(params) {
    return request({
      url: `health-management/diabetes-manage/findAllByPage`,
      method: 'get',
      params
    });
  },
  // 糖尿病详情
  getDiabetesDetail(params) {
    return request({
      url: `health-management/diabetes-manage/detail`,
      method: 'get',
      params
    });
  },
  // 查找单日血糖
  getDiabetesBlood(params) {
    return request({
      url: `health-management/diabetes-manage/get/blood/day`,
      method: 'get',
      params
    });
  },
  // 查找单日症状
  getDiabetesSymptom(params) {
    return request({
      url: `health-management/diabetes-manage/get/symptom/day`,
      method: 'get',
      params
    });
  }
};
