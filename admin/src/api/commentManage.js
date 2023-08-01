import request from '@/utils/request';

// 获取评价列表
export function getCommentList(data) {
  return request({
    url: 'scm/comment/list',
    method: 'post',
    data
  });
}
// 查询评价详情
export function getCommentDetails(params) {
  return request({
    url: 'scm/comment/detail',
    method: 'get',
    params
  });
}
// 跟新运营备注
export function updateRemark(data) {
  return request({
    url: 'scm/comment/update/remark',
    method: 'put',
    data
  });
}
export function exportComment(data) {
  return request({
    url: 'scm/comment/export',
    method: 'post',
    data
  });
}
