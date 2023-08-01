import request from '@/utils/request';

// 获取订单列表
export function getGoodsList(data) {
    return request({
        url: 'scm/medicine/list',
        method: 'post',
        data
    });
}
// 获取订单详情
export function getGoodsDetails(params) {
    return request({
        url: 'scm/medicine/detail',
        method: 'get',
        params
    });
}
// 获取疾病列表
export function getDisease(params) {
    return request({
        url: 'scm/medicine/getDisease',
        method: 'get',
        params
    });
}
// 获取商品分类
export function getMedicineTypes(params) {
    return request({
        url: 'scm/medicine/getMedicineTypes',
        method: 'get',
        params
    });
}
// 保存销售信息
export function saveSaleMsg(data) {
    return request({
        url: 'scm/medicine/updateMsgSale',
        method: 'post',
        data
    });
}
// 更改销售状态
export function changeState(data) {
    return request({
        url: 'scm/medicine/onOrDownShelf',
        method: 'post',
        data
    });
}
// 获取分类数据
export function getTypeCount(params) {
    return request({
        url: 'scm/medicine/countByTypeFilter',
        method: 'post',
        data: params
    });
}
// 模糊搜索疾病列表
export function getDiseaseByName(params) {
    return request({
        url: 'scm/medicine/getDiseaseByName',
        method: 'get',
        params
    });
}
// 修改药品图片信息
export function saveGraphicDetails(data) {
    return request({
        url: 'scm/medicine/saveGraphicDetails',
        method: 'post',
        data
    });
}
// 模糊查询权益疾病（核赔id）
export function getRightDiseaseByName(params) {
    return request({
        url: `scm/treatmentStructured/findDisease/${params.name}/claimId/${
            params.id
        }`,
        method: 'get'
    });
}
// 模糊查询权益药品（核赔id）
export function getRightDrugsByName(params) {
    return request({
        url: `scm/treatmentStructured/findDrugName/${params.name}/claimId/${
            params.id
        }`,
        method: 'get'
    });
}
