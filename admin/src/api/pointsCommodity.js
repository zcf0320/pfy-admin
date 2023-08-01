import request from '@/utils/request';

// 新增积分商品
export function addPointsCommodity(data) {
    return request({
        url: 'scm/score/mall/save',
        method: 'post',
        data
    });
}
// 获取积分商品列表
export function getPointsCommodityList(data) {
    return request({
        url: 'scm/score/mall/list',
        method: 'post',
        data
    });
}
// 获取积分商品信息
export function getPointsCommodityDetails(params) {
    return request({
        url: 'scm/score/mall/detail',
        method: 'get',
        params
    });
}
// 更新积分商品信息
export function updatePointsCommodity(data) {
    return request({
        url: 'scm/score/mall/update',
        method: 'post',
        data
    });
}
// 获取积分兑换记录
export function getPointsExchangeList(data) {
    return request({
        url: 'scm/score/mall/exchange/list',
        method: 'post',
        data
    });
}
// 更新商品发布状态
export function changePointsState(params) {
    return request({
        url: `scm/score/mall/${params.id}/${params.saleStatus}`,
        method: 'get'
    });
}
