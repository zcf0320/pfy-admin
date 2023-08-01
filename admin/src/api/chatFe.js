import request from '@/utils/request';

// 获取聊天窗口信息
export function getChartWindow(params) {
  return request({
    url: 'health-management/chartTool/chartWindow',
    method: 'get',
    params
  });
}
// 获取聊天设置详情
export function getChartSettingDetail(params) {
  return request({
    url: 'health-management/chartTool/chartSettingDetail',
    method: 'get',
    params
  });
}
// 聊天设置
export function updateChartSetting(data) {
  return request({
    url: 'health-management/chartTool/updateChartSetting',
    method: 'post',
    data
  });
}
// 切换医生状态
export function changeState(params) {
  return request({
    url: 'health-management/workOrder/changeState',
    method: 'get',
    params
  });
}
