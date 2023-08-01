import request from '@/utils/request';

export default {
    /**
     * 获取用户使用记录列表
     * @param {*} data
     * @returns
     */
    getThyroidList(data) {
        return request({
            url: '/health-management/public/thyroidManage/selectUserChannelList',
            params: data,
            method: 'get'
        });
    },
    /**
     * 使用记录详情
     * @param {*} userId
     * @returns
     */
    getThyroidDetail(userId) {
        return request({
            url: '/health-management/public/thyroidManage/selectByUserIdRecord',
            params: { userId },
            method: 'get'
        });
    }

};
