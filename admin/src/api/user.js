import request from '@/utils/request';
import qs from 'qs';

// 获取用户权限
export function getListByUserName() {
  return request({
    url: `scm/authGroup/listByUserName`,
    timeout: 100000,
    method: 'get'
  });
}
// 用户鉴权
export function login(data) {
  return request({
    url: `auth/oauth/token?${qs.stringify(data)}`,
    method: 'post'
  });
}
