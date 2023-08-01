import request from '@/utils/request';

// 增减常用菜单
export function menusUpdate(data) {
    return request({
        url: `scm/user/menus/update`,
        method: 'post',
        data
    });
}
// 菜单
export function menusList(params) {
    return request({
        url: `scm/user/menus/often`,
        method: 'get',
        params
    });
}
// 待处理
export function todoList(params) {
    return request({
        url: `scm/todo/count`,
        method: 'get',
        params
    });
}
