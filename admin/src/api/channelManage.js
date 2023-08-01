import request from '@/utils/request';

// 新增渠道
export function save(data) {
  return request({
    url: 'scm/chanel/save',
    method: 'post',
    data
  });
}
// 更新渠道
export function update(data) {
  return request({
    url: 'scm/chanel/update',
    method: 'post',
    data
  });
}
// 获取渠道列表
export function getChannelList(data) {
  return request({
    url: 'scm/chanel/list',
    method: 'post',
    data
  });
}
// 获取渠道列表
export function getChannelDetails(params) {
  return request({
    url: 'scm/chanel/detail',
    method: 'get',
    params
  });
}
// 删除渠道
export function deleteChannel(params) {
  return request({
    url: 'scm/chanel/delete',
    method: 'get',
    params
  });
}
// 获取渠道相关的公司
export function getcompanyList(data) {
  return request({
    url: 'scm/chanel/companyList',
    method: 'post',
    data
  });
}
