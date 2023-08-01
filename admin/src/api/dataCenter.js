import request from '@/utils/request';

// 查询本月是否存在数据
export function hasServiceData(time) {
  return request({
    url: `scm/useCount/find/time/${time}`,
    method: 'get'
  });
}
// 获取产品列表
export function getProductList() {
  return request({
    url: 'scm/useCount/insurance/product/list',
    method: 'get'
  });
}
// 选择产品
export function selectProduct(params) {
  return request({
    url: `scm/useCount/add/productId/${params.productId}/planId/${params.planId}`,
    method: 'get'
  });
}
// 删除产品
export function deleteProduct(productId) {
  return request({
    url: `scm/useCount/delete/product/${productId}`,
    method: 'get'
  });
}
// 保存产品数据
export function saveProductData(data) {
  return request({
    url: 'scm/useCount/save/upload/Data',
    method: 'post',
    data
  });
}
