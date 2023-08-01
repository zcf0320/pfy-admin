import request from '@/utils/request';

// 获取问诊记录列表
export function getContentList(data) {
  return request({
    url: 'health-management/diagnose/list',
    method: 'post',
    data
  });
}
// 获取问诊详情
export function getDetails(params) {
  return request({
    url: 'health-management/diagnose/detail',
    method: 'get',
    params
  });
}
// 获取问诊过程
export function getProcess(params) {
  return request({
    url: 'health-management/diagnose/getProcess',
    method: 'get',
    params
  });
}
// 获取独立问诊过程
export function getProcessFe(params) {
  return request({
    url: 'health-management/diagnose/getProcess',
    method: 'get',
    params
  });
}
// 获取症状库列表
export function getSymptomList(data) {
  return request({
    url: 'health-management/diseaseInfo/symptom/list',
    method: 'post',
    data
  });
}

// 获取疾病列表
export function getDiseaseList(data) {
  return request({
    url: 'claim/diseases/all',
    method: 'post',
    data
  });
}

// 获取疾病标签
export function getDiseaseLabel() {
  return request({
    url: 'claim/diseases/labels',
    method: 'get'
  });
}
// 获取疾病详情
export function getDiseaseInfo(data) {
  return request({
    url: 'claim/diseases/detail',
    method: 'post',
    data
  });
}
// 编辑疾病详情
export function setDiseaseInfo(data) {
  return request({
    url: 'claim/diseases/departments/relation',
    method: 'post',
    data
  });
}
// 获取疾病图谱
export function getDiseaseAtlas(diseaseName) {
  return request({
    url: 'claim/diseases/atlas',
    method: 'post',
    data: { diseaseName }
  });
}
// 获取慢性病列表
export function getChronic(params) {
  return request({
    url: 'claim/diseases/labels/chronic',
    method: 'get',
    params
  });
}
// 获取常见病列表
export function getCommonDiseases(params) {
  return request({
    url: 'claim/diseases/labels/common',
    method: 'get',
    params
  });
}
// 获取全部科室多级
export function getAllDepartment(params) {
  return request({
    url: 'claim/departments/all',
    method: 'get',
    params
  });
}
// 获取全部二级科室
export function getSubsDepartment() {
  return request({
    url: 'claim/departments/subs',
    method: 'get'
  });
}

// 添加常用语
export function saveCommonWord(data) {
  return request({
    url: 'health-management/diagnoseCommonWord/saveWord',
    method: 'post',
    data
  });
}

// 修改常用语
export function updateCommonWord(data) {
  return request({
    url: 'health-management/diagnoseCommonWord/updateWord',
    method: 'post',
    data
  });
}

// 删除常用语
export function deleteCommonWord(params) {
  return request({
    url: `health-management/diagnoseCommonWord/deleteWord/${params.id}`,
    method: 'get'
  });
}

// 查询常用语
export function queryCommonWord(data) {
  const { type } = data;
  return request({
    url: type
      ? 'health-management/diagnoseCommonWord/findAllByTime'
      : 'health-management/diagnoseCommonWord/findAllByUseCount',
    method: 'get',
    data
  });
}

// 使用次数增加
export function addCountCommonWord(params) {
  return request({
    url: `health-management/diagnoseCommonWord/addUseCount/${params.id}`,
    method: 'get'
  });
}
// 独立应用获取ai问诊列表
export function getFeContentList(params) {
  return request({
    url: 'health-management/diagnose/listSl',
    method: 'get',
    params
  });
}

// 独立应用获取获取问诊详情
export function getFeDetails(params) {
  return request({
    url: 'health-management/diagnose/detail',
    method: 'get',
    params
  });
}
