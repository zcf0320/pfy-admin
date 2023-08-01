import axios from 'axios';

// 是否取消重复的请求
const cancelDuplicated = true;
// 存储每个请求的标识和取消的函数
const pendingAjax = new Map();
// 生成重复标识的方式
let duplicatedKeyFn = null;
duplicatedKeyFn =
  typeof duplicatedKeyFn === 'function'
    ? duplicatedKeyFn
    : config =>
        config.data
          ? `${config.method}-${config.url}-${JSON.stringify(config.data)}`
          : `${config.method}-${config.url}-${JSON.stringify(config.params)}`;

/**
 * 将请求添加到pendingAjax
 * @param {Object} config
 */
export const addPendingAjax = config => {
  // 是否需要取消重复的请求
  if (!cancelDuplicated) return;

  const duplicatedKey = JSON.stringify({
    duplicatedKey: duplicatedKeyFn(config),
    type: 'REQUEST_TYPE.DUPLICATED_REQUEST'
  });

  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken(cancel => {
      // 如果pendingAjax中不存在当前请求，添加进去
      if (duplicatedKey && !pendingAjax.has(duplicatedKey)) {
        pendingAjax.set(duplicatedKey, cancel);
      }
    });
};

/**
 * 从pendingAjax中删除请求
 * @param {Object} config
 */
export const removePendingAjax = config => {
  // 是否需要取消重复的请求
  if (!cancelDuplicated) return;

  const duplicatedKey = JSON.stringify({
    duplicatedKey: duplicatedKeyFn(config),
    type: 'REQUEST_TYPE.DUPLICATED_REQUEST'
  });

  // 如果pendingAjax中存在当前请求, 取消当前请求并将其删除
  if (duplicatedKey && pendingAjax.has(duplicatedKey)) {
    const cancel = pendingAjax.get(duplicatedKey);
    cancel(duplicatedKey);
    pendingAjax.delete(duplicatedKey);
  }
};
