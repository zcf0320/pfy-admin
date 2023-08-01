import request from '@/utils/request';

// 亚泰看板
export function getData(params) {
  return request({
    url: 'insurance/dataBig/getData/yatai',
    method: 'get',
    params
  });
}
