import request from '@/utils/request';

// 调整服务项库存
export function adjustInventory(data) {
  const { serviceInfoId, value } = data;
  return request({
    url: `scm/serviceInfo/adjustInventory/${serviceInfoId}/${value}`,
    method: 'get'
  });
}
// 库存分配列表
export function listInventory(data) {
  return request({
    url: 'scm/serviceInfo/storage/list',
    method: 'post',
    data
  });
}
// 库存分配列表
export function detailInventory(serviceInfoId) {
  return request({
    url: `scm/serviceInfo/storage/detail/${serviceInfoId}`,
    method: 'get'
  });
}
// 获取趋势
export function getItemStatistics(data) {
  return request({
    url: 'dataReport/getServiceItemStatistics',
    method: 'post',
    data
  });
}
// 获取趋势
export function getBaseData(data) {
  return request({
    url: 'scm/serviceInfo/storage/getServiceItemBaseData',
    method: 'post',
    data
  });
}
// 预警消息配置
// 库存预警消列表
export function listWarningMessage() {
  return request({
    url: 'scm/warning/warningMessage/list',
    method: 'get'
  });
}
// 新增预警通知人
export function addWarningMessage(data) {
  const { type } = data;
  return request({
    url: `scm/warning/warningMessage/add/${type}`,
    method: 'post',
    data
  });
}
// 编辑预警通知人
export function updateWarningMessage(data) {
  const { type, id } = data;
  return request({
    url: `scm/warning/warningMessage/update/${type}/${id}`,
    method: 'put',
    data
  });
}
// 详情预警通知人
export function detailWarningMessage(data) {
  const { type, id } = data;
  return request({
    url: `scm/warning/warningMessage/detail/${type}/${id}`,
    method: 'get'
  });
}
// 删除预警通知人
export function delWarningMessage(data) {
  const { id } = data;
  return request({
    url: `scm/warning/warningMessage/delete/${id}`,
    method: 'delete'
  });
}
