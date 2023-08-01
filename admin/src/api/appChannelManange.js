import request from '@/utils/request';

export default {
  /**
   * 获取服务项目列表
   * @returns
   */
  getServiceList() {
    return request({
      url: 'record/channel/management/get/service/list',
      method: 'get'
    });
  },

  /**
   * 获取渠道下拉列表
   * @returns
   */
  getChannelList() {
    return request({
      url: 'record/channel/management/get/channel/list',
      method: 'get'
    });
  },
  /**
   * 获取渠道列表
   * @param {*} data
   * @returns
   */
  getChannelListByParam(data) {
    return request({
      url: 'record/channel/management/list/channel',
      method: 'post',
      data
    });
  },
  /**
   * 保存渠道
   * @param {*} data
   * @returns
   */
  saveChannel(data) {
    return request({
      url: 'record/channel/management/save/channel',
      method: 'post',
      data
    });
  },
  /**
   * 修改渠道状态
   * @param {*} id
   * @param {*} status （0：启用，1停用）
   * @returns
   */
  updateChannelStatus(id, status) {
    return request({
      url: 'record/channel/management/update/channel/status',
      method: 'get',
      params: {
        id,
        status
      }
    });
  },
  /**
   * 获取渠道链接列表
   * @param {*} data
   * @returns
   */
  getChannelLinkListByParam(data) {
    return request({
      url: 'record/channel/management/list',
      method: 'post',
      data
    });
  },
  /**
   * 保存渠道链接
   * @param {*} data
   * @returns
   */
  saveChannelLink(data) {
    return request({
      url: 'record/channel/management/save',
      method: 'post',
      data
    });
  },
  /**
   * 修改渠道链接状态
   * @param {*} id
   * @param {*} status （0：启用，1停用）
   * @returns
   */
  updateChannelLinkStatus(id, status) {
    return request({
      url: 'record/channel/management/update/status',
      method: 'get',
      params: {
        id,
        status
      }
    });
  }
};
