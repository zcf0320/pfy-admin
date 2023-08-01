import request from '@/utils/request';

// 发短信
export function sendMessageApi(params) {
  const { id, type } = params;
  return request({
    url: `/insurance/underwriting/single/sendReviewMessage/${id}/${type}`,
    method: 'get'
  });
}
