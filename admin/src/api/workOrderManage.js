import request from '@/utils/request';

// 获取聊天窗口信息
export function getList(data) {
  return request({
    url: 'inquiries/workOrder/orderList',
    method: 'post',
    data
  });
}
// 获取医生的工单数据
export function getDayMgs(params) {
  return request({
    url: `inquiries/workOrder/getDayMgs/${params}`,
    method: 'get'
  });
}
