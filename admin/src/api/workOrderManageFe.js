import request from '@/utils/request';

// 获取聊天窗口信息
export function getList(params) {
  return request({
    url: 'health-management/workOrder/orderList',
    method: 'get',
    params
  });
}
// 获取医生的工单数据
export function getDayMgs(params) {
  return request({
    url: `health-management/workOrder/getDayMgs/${params}`,
    method: 'get'
  });
}
