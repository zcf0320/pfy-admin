import request from '@/utils/request';
export default {
    /**
     * 获取用户使用记录列表
     * @param {*} params
     * @returns
     */
    getSkinTestList(params) {
        return request({
            url: 'health-management/skin/manage/getSkinList',
            method: 'get',
            params
        });
    },
    /**
     * 获取详情
     * @param {*} id
     * @returns
     */
    getSkinTestDetail(id) {
        return request({
            url: `health-management/skin/manage/getSkinDetail?id=${id}`,
            method: 'get'
        });
    },
    /**
     * 获取操作日志
     * @param {*} id
     * @param {*} type
     * @returns
     */
    getLogList(id, type) {
        return request({
            url: '/health-management/public/log/log',
            params: {
                id,
                type
            }
        });
    }
};
