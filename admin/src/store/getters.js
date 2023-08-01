const getters = {
    sidebar: state => state.app.sidebar,
    size: state => state.app.size,
    device: state => state.app.device,
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    introduction: state => state.user.introduction,
    roles: state => state.user.roles,
    permission_routes: state => state.permission.routes,
    errorLogs: state => state.errorLog.logs,
    menuList: state => {
        // state.user.menuList.sort((x, y) => {
        //   if (x.seq < y.seq) {
        //     return -1;
        //   }
        //   if (x.seq > y.seq) {
        //       return 1;
        //   }
        //   return 0;
        // })
        return state.user.menuList;
    },
    ytPanelData: state => state.ytPanel.data,
    zhPanelData: state => state.zhPanel.data,
    policyData: state => state.insuranceProducts.policyData,
    productId: state => state.insuranceProducts.productId,
    keepAlivePage: state => state.keepAlive.keepAlivePage,
    smartData: state => state.smartMedical.data
};
export default getters;
