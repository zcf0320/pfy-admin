import request from '@/utils/request';

// 查询所有审批节点数据
export function initApprovesOption() {
  return request({
    url: 'scm/approve/queryAllApprovesOption',
    method: 'get'
  });
}

// 查询审批字段
export function getApprovesOption(data) {
  const { type, stateOption } = data;
  return request({
    url: `scm/approve/queryColumnsByTypeAndStateOption/${type}/${stateOption}`,
    method: 'get'
  });
}

// 确认审批流
export function confirmApproveStream(id) {
  return request({
    url: `scm/approve/confirmApproveStream/${id}`,
    method: 'get'
  });
}

// 新建或更新OA审批单
export function saveOrUpdate(data) {
  return request({
    url: `scm/approve/saveOrUpdate`,
    method: 'post',
    data
  });
}

// 更新节点审批单状态,启用状态,false停用，true启用
export function updateApproveState(data) {
  const { id, state } = data;
  return request({
    url: `scm/approve/updateApproveState/${id}/${state}`,
    method: 'get'
  });
}
// 更新节点审批单状态,启用状态,false停用，true启用
export function queryColumnByType(data) {
  const { type } = data;
  return request({
    url: `scm/approve/queryColumnByType/${type}`,
    method: 'get'
  });
}
// 查询审批实例详情
export function queryApproveInstanceDetail(id) {
  return request({
    url: `scm/approve/queryApproveInstanceDetail/${id}`,
    method: 'get'
  });
}
