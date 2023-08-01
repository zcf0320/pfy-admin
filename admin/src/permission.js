import router from './router';
import store from './store';
import { Message } from 'element-ui';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import { getToken } from '@/utils/auth'; // get token from cookie
import getPageTitle from '@/utils/get-page-title';
import { getNoticeList, getCCCToken } from '@/api/system';
import { findParentNode } from '@/filters';
NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ['/login', '/auth-redirect', '/smart-medical-data-board']; // no redirect whitelist
let pollingST = null;
function polling() {
    pollingST = setTimeout(() => {
        clearTimeout(pollingST);
        polling();
        getNoticeList({
            userName: localStorage.getItem('username')
        }).then(res => {
            const notice = res && res.data.noticeDtoList;
            if (notice.length > 0) {
                if (notice[0].isPull === false) {
                    this.$notify({
                        title: notice[0].title,
                        message: notice[0].introduce,
                        duration: 0,
                        offset: 90,
                        iconClass: 'notice-icon',
                        customClass: 'notice-content'
                    });
                }
            }
        });
    }, 10000);
    localStorage.setItem('polling', pollingST);
}

function injectTCCC(token, sdkAppId, userId, sdkUrl) {
    const scriptDom = document.createElement('script');
    scriptDom.id = 'ccc';
    scriptDom.dataset.token = token;
    scriptDom.dataset.sdkAppId = sdkAppId;
    scriptDom.dataset.userid = userId;
    // 定制是否需要在登录后展示 坐席工作台。默认为true,这里可以通过设为false关闭
    scriptDom.dataset.showWorkBenchAtFirstLogin = false;
    scriptDom.src = sdkUrl;
    document.body.appendChild(scriptDom);
}
router.beforeEach(async(to, from, next) => {
    // start progress bar
    NProgress.start();
    // set page title
    document.title = getPageTitle(to.meta.title);
    // determine whether the user has logged in
    const hasToken = getToken();
    // const hasClient = getClientId();
    const username = localStorage.getItem('username');

    if (hasToken) {
        if (to.path === '/login') {
            // if is logged in, redirect to the home page
            next({ path: '/' });
            NProgress.done(); // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
        } else {
            if (to.meta.keepAlive) {
                store.dispatch('addKeepAlivePage', to.name);
            }
            if (to.path === '/smart-medical-data-board') {
                next();
                NProgress.done();
                return;
            }
            if (!localStorage.getItem('polling')) {
                polling();
            }

            // 更具用户名获取权限仅在刷新页面和登录时获取用户权限
            username &&
                store.getters.menuList &&
                store.getters.menuList.length === 0 &&
                (await store.dispatch('user/getListByUserName', username).then(res => {
                    localStorage.setItem('menu', JSON.stringify(res.obj));
                    store.dispatch('user/setMenuList', res.obj);
                    const hasOnlineServiceRole = findParentNode(
                        res.obj,
                        'CustomerService',
                    );
                    if (hasOnlineServiceRole.length > 0) {
                        store.dispatch('app/setShowInput', true);
                        const script = document.getElementById('ccc');
                        if (!script) {
                            getCCCToken()
                                .then(res => {
                                    if (res && res.data) {
                                        const { token, sdkAppId, seatUserId, sdkURL } = res.data;
                                        injectTCCC(token, sdkAppId, seatUserId, sdkURL);
                                    }
                                })
                                .catch(res => {
                                    console.log(res);
                                });
                        }
                    }
                }));

            const hasRoles = store.getters.roles && store.getters.roles.length > 0;

            const roles = [];
            if (hasRoles) {
                next();
                // 暂时判断 有没有路由 否则导致 路由重合
                if (!store.state.permission.routes.length) {
                    const accessRoutes = await store.dispatch(
                        'permission/generateRoutes',
                        ['admin'],
                    );
                    router.addRoutes(accessRoutes);
                }
            } else {
                try {
                    const accessRoutes = await store.dispatch(
                        'permission/generateRoutes',
                        roles,
                    );
                    router.addRoutes(accessRoutes);
                    next({ ...to, replace: true });
                } catch (error) {
                    await store.dispatch('user/resetToken');
                    Message.error(error || 'Has Error');
                    next(`/login?redirect=${to.path}`);
                    NProgress.done();
                }
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next();
        } else {
            next(`/login?redirect=${to.path}`);
            NProgress.done();
        }
    }
});

router.afterEach((to, from) => {
    NProgress.done();
    if (from.meta.keepAlive) {
        const {
            meta: { keepComponentPages, alwaysKeep }
        } = from;
        if (
            !alwaysKeep &&
            (!keepComponentPages || !keepComponentPages.includes(to.name))
        ) {
            store.dispatch('removeKeepAlive', from.name);
        }
    }
});
