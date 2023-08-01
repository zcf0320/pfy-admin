import request from '@/utils/request';
/**
 * 根据状态获取类目列表数据
 * @param { data } data
 */
export function getCatelist(data) {
    return request({
      url: 'scm/category/infomation/list',
      method: 'post',
      data
    });
}

/**
 * 类目修改/新增保存
 * @param { data } data
 */
export function saveFormData(data) {
    return request({
      url: 'scm/category/infomation/save',
      method: 'post',
      data
    });
}

/**
 * 类目状态跟新
 * @param { data } data
 */
export function updateCateStatus(data) {
    return request({
      url: 'scm/category/infomation/status/update',
      method: 'post',
      data
    });
}

/**
 * 类目数据获取
 * @param { params } params
 */
export function getFormData(params) {
    return request({
      url: 'scm/category/infomation/getFormData',
      method: 'get',
      params
    });
}

/**
 * 类目原因列表
 * @param { data } data
 */
export function getReasonList(data) {
    return request({
      url: 'scm/category/reason/list',
      method: 'post',
      data
    });
}

/**
 * 类目原因保存
 * @param { data } data
 */
export function saveReason(data) {
    return request({
      url: 'scm/category/reason/save',
      method: 'post',
      data
    });
}

/**
 * 类目原因状态跟新
 * @param { data } data
 */
export function updateReasonCateStatus(data) {
    return request({
      url: 'scm/category/reason/status/update',
      method: 'post',
      data
    });
}

/**
 * 类目原因数据获取
 * @param { params } params
 */
export function getReasonFormData(params) {
    return request({
      url: 'scm/category/reason/getFormData',
      method: 'get',
      params
    });
}
