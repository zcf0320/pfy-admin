import * as calendarManageApi from '@/api/calendar';

const actions = {
  // 获取日历
  getWeekdays(ctx, params) {
    return calendarManageApi.getWeekdays(params);
  },
  // 添加工作状态
  addWeekdays(ctx, params) {
    return calendarManageApi.addWeekdays(params);
  }
};

export default {
  namespaced: true,
  actions
};
