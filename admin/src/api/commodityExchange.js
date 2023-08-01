import request from '@/utils/request';

// 获取虚拟商品兑换列表
export function virtualList(data) {
    return request({
        url: 'scm/commodityExchange/virtualList',
        method: 'post',
        data
    });
}
// 获取实物商品兑换列表
export function physicalList(data) {
    return request({
        url: 'scm/commodityExchange/physicalList',
        method: 'post',
        data
    });
}
// 获取虚拟商品兑换详情
export function virtualDetail(params) {
    return request({
        url: 'scm/commodityExchange/virtualDetail',
        method: 'get',
        params
    });
}
// 获取实物商品兑换详情
export function physicalDetail(params) {
    return request({
        url: 'scm/commodityExchange/physicalDetail',
        method: 'get',
        params
    });
}
// 跟新物流信息
export function updateLogistics(data) {
    return request({
        url: 'scm/commodityExchange/updateLogistics',
        method: 'post',
        data
    });
}
// 获取物流公司名单
export function getCourierCompanyList() {
    return request({
        url: 'scm/courierCompany/getAll',
        method: 'get'
    });
}
// 实物商品列表导出
export function queryAndExportPhysicalCommodityExchange(data) {
    return request({
        url: 'scm/recordExport/queryAndExportPhysicalCommodityExchange',
        method: 'post',
        data
    });
}
// 虚拟商品列表导出
export function queryAndExportVirtualCommodityExchange(data) {
    return request({
        url: 'scm/recordExport/queryAndExportVirtualCommodityExchange',
        method: 'post',
        data
    });
}
