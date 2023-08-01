import request from '@/utils/request';
// 获取材料模板列表
export function getMaterialLibraryList(data) {
    return request({
        url: 'scm/material/warehouse/list',
        method: 'post',
        data
    });
}
// 新增、编辑材料模板
export function addMaterialLibrary(data) {
    return request({
        url: 'scm/material/warehouse/materialAdd',
        method: 'post',
        data
    });
}
// 材料模板详情
export function detailMaterialLibrary(params) {
    return request({
        url: 'scm/material/warehouse/detail',
        method: 'get',
        params
    });
}
// 删除材料模板
export function deleteMaterialLibrary(params) {
    return request({
        url: `scm/material/warehouse/meterialDelete/${params.id}`,
        method: 'delete'
    });
}
// 切换材料模板状态
export function switchMaterialLibrary(data) {
    return request({
        url: 'scm/material/warehouse/meterialStateUpdate',
        method: 'post',
        data
    });
}
// 查询材料模板日志
export function logMaterialLibrary(params) {
    return request({
        url: 'scm/material/warehouse/meterialLog',
        method: 'get',
        params
    });
}
// 获取全部资料列表
export function findAllMaterial(params) {
    return request({
        url: 'scm/material/warehouse/findAll',
        method: 'get',
        params
    });
}
