import request from '@/utils/request';

// 获取日历
export function getWeekdays(yearMonth) {
  return request({
    url: `scm/weekdays/all?yearMonth=${yearMonth}`,
    method: 'get'
  });
}
// 添加工作状态
export function addWeekdays(data) {
  return request({
    url: 'scm/weekdays/add',
    method: 'post',
    data
  });
}
