import Layout from '@/layout';
export default {
  path: '/operateManage',
  component: Layout,
  name: 'OperateManage',
  icon: 'el-icon-office-building',
  meta: {
    title: '运营管理',
    // icon: 'guide',
    noCache: true,
    roles: ['admin'] // you can set roles in root nav
  },
  redirect: '/operateManage/appointmentService',
  children: [
    {
      path: '/operateManage/appointmentService',
      component: () => import('@/views/operateManage/appointmentService'),
      name: 'AppointmentService',
      meta: {
        title: '预约服务',
        noCache: true
      }
    },
    {
      path: '/operateManage/appointmentService/details/:id/:type',
      component: () =>
        import('@/views/operateManage/appointmentServiceDetails'),
      name: 'AppointmentServiceDetails',
      meta: {
        title: '预约详情',
        noCache: true
      }
    },
    {
      path: '/operateManage/onlineService',
      component: () => import('@/views/operateManage/onlineService'),
      name: 'OnlineService',
      meta: {
        noCache: true,
        title: '在线服务'
      }
    },
    {
      path: '/operateManage/onlineService/details/:id',
      component: () => import('@/views/operateManage/onlineServiceDetails'),
      name: 'OnlineServiceDetails',
      meta: {
        noCache: true,
        title: '在线服务详情'
      }
    },
    {
      path: '/operateManage/userManage',
      component: () => import('@/views/operateManage/userManage'),
      name: 'UserManage',
      meta: {
        noCache: true,
        title: '用户管理'
      }
    },
    {
      path: '/operateManage/userManage/details/:id',
      component: () => import('@/views/operateManage/userDetails'),
      name: 'UserDetails',
      meta: {
        noCache: true,
        title: '用户详情'
      }
    },
    {
      path: '/operateManage/userManage/details/:id/:index',
      component: () => import('@/views/operateManage/userDetails'),
      name: 'UserDetailsIndex',
      meta: {
        noCache: true,
        title: '用户详情'
      }
    },
    {
      path: '/operateManage/commentManage',
      component: () => import('@/views/operateManage/commentManage'),
      name: 'CommentManage',
      meta: {
        noCache: true,
        title: '评价投诉'
      }
    },
    {
      path: '/operateManage/commentManage/details/:id',
      component: () => import('@/views/operateManage/commentDetails'),
      name: 'CommentDetails',
      meta: {
        noCache: true,
        title: '评价详情'
      }
    },
    {
      path: '/operateManage/contentManage',
      component: () => import('@/views/operateManage/contentManage'),
      name: 'ContentManage',
      meta: {
        noCache: true,
        title: '内容管理'
      }
    },
    {
      path: '/operateManage/contentManage/addContent',
      component: () => import('@/views/operateManage/addContent'),
      name: 'AddContent',
      meta: {
        noCache: true
      }
    },
    {
      path: '/operateManage/contentManage/details/:id/:type/:postStatus',
      component: () => import('@/views/operateManage/contentDetails'),
      name: 'ContentDetails',
      meta: {
        noCache: true,
        title: '内容详情'
      }
    },
    {
      path: '/operateManage/contentManage/content-edit/:id/:type/:postStatus',
      component: () => import('@/views/operateManage/contentDetails'),
      name: 'EditContent',
      meta: {
        noCache: true,
        title: '内容编辑'
      }
    },
    {
      path: '/operateManage/commodityExchange',
      component: () => import('@/views/operateManage/commodityExchange'),
      name: 'CommodityExchange',
      meta: {
        noCache: true,
        title: '商品兑换'
      }
    },
    // {
    //   path: '/operateManage/glassesExport',
    //   component: () => import('@/views/operateManage/glassesExport'),
    //   name: 'glassesExport',
    //   meta: {
    //     noCache: true,
    //     title: '商品兑换'
    //   }
    // },
    {
      path: '/operateManage/commodityExchange/details/:id/:types',
      component: () => import('@/views/operateManage/commodityExchangeDetails'),
      name: 'CommodityExchangeDetails',
      meta: {
        noCache: true,
        title: '商品兑换详情'
      }
    },
    {
      path: '/operateManage/pointsMall',
      component: () => import('@/views/operateManage/pointsMall'),
      name: 'PointsMall',
      meta: {
        noCache: true,
        title: '星矿'
      }
    },
    {
      path: '/operateManage/pointsMall/addPointsCommodity',
      component: () => import('@/views/operateManage/addPointsCommodity'),
      name: 'PointsMallAdd',
      meta: {
        noCache: true,
        title: '商品新增'
      }
    },
    {
      path: '/operateManage/pointsMall/details/:id',
      component: () => import('@/views/operateManage/pointsCommodityDetails'),
      name: 'PointsCommodityDetails',
      meta: {
        noCache: true,
        title: '商品详情'
      }
    },

    {
      path: '/purchasingManagement/list',
      component: () => import('@/views/operateManage/purchasingManagement/index'),
      name: 'PurchasingManagement',
      meta: {
        title: '采购需求',
        noCache: true
      }
    },
    {
      path: '/purchasingManagement/details/:id',
      component: () => import('@/views/operateManage/purchasingManagement/details'),
      name: 'Details',
      meta: {
        title: '采购详情',
        noCache: true
      }
    },
    {
      path: '/operateManage/userManage/drugPlan/:id',
      component: () => import('@/views/operateManage/component/classTable'),
      name: 'UserDetailsDrugPlan',
      meta: {
        noCache: true,
        title: '用药计划'
      }
    },
    {
      path: '/operateManage/userManage/peopleClaimsDetial/:id',
      component: () =>
        import('@/views/operateManage/component/peopleClaimsDetial'),
      name: 'UserDetailsClaimDetail',
      meta: {
        noCache: true,
        title: '理赔详情'
      }
    },
    {
      path: '/leavingMessage/list',
      component: () => import('@/views/operateManage/leavingMessage'),
      name: 'LeavingMessage',
      meta: {
        title: '用户留言',
        noCache: true
      }
    },
    {
      path: '/leavingMessage/details/:id',
      component: () => import('@/views/operateManage/leavingMessageDetail'),
      name: 'LeavingMessageDetail',
      meta: {
        noCache: true,
        title: '留言详情'
      }
    },
    {
      path: '/operateManage/onlineService/questionnaire-detail/:id',
      component: () =>
        import('@/views/operateManage/AlzheimerQuestionnaireDetail'),
      name: 'OnlineServiceQuestionnaireDetail',
      meta: {
        noCache: true,
        title: '在线服务'
      }
    },
    {
      path: '/operateManage/store-manage',
      component: () => import('@/views/operateManage/StoreManage'),
      name: 'StoreManage'
    },
    {
      path: '/operateManage/store-account-manage',
      component: () => import('@/views/operateManage/store-account'),
      name: 'StoreAccountManage'
    },
    {
        path: '/operateManage/personalPolicy/details/:id',
        component: () => import('@/views/operateManage/personalPolicyDetails'),
        name: 'AppointmentPersonalPolicyDetails',
        meta: {
          noCache: true,
          title: '个险保单详情'
        }
      }
  ]
};
