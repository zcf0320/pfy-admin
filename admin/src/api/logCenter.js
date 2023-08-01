import request from '@/utils/request';
/**
 * 查询日志列表
 * @param {*} params
 * @returns
 */
export function getLogList(params) {
  return request({
    url: '/scm/service-log/page',
    params,
    method: 'get'
  });
}

/**
 * 查询操作列表
 * @returns
 */
export function getOperationList() {
  return request({
    url: '/scm/service-log/listoperation',
    method: 'get'
  });
}

/**
 * 查询项目列表
 * @returns
 */
export function getTypeSelect() {
  return request({
    url: '/scm/service-log/listType',
    method: 'get'
  });
}
/**
 * 获取登录排行
 * @returns
 */
export function getLoginRanking() {
  return request({
    url: '/scm/service-log/selectLogin',
    method: 'get'
  });
}
