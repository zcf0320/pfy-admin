import request from '@/utils/request';

// 医保药物列表
export function getMedicineList(data) {
    return request({
        url: 'claim/insurance/medicine/all',
        method: 'post',
        data
    });
}
// 目录列表
export function getCatalogs(params) {
    return request({
        url: `claim/insurance-medicine-catalog/catalogs?isCountry=${
            params.isCountry
        }&area=${params.area}&time=${params.time}`,
        method: 'get'
    });
}
// 添加目录
export function addCatalog(data) {
    return request({
        url: `claim/insurance-medicine-catalog/add?isCountry=${
            data.isCountry
        }&area=${data.area}&year=${data.year}`,
        method: 'post'
    });
}
