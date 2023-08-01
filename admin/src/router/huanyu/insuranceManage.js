import Layout from '@/layout';
export default {
  path: '/insuranceManage',
  component: Layout,
  name: 'InsuranceManage',
  icon: 'el-icon-suitcase',
  meta: {
    title: '保险管理',
    // icon: 'guide',
    noCache: true,
    roles: ['admin'] // you can set roles in root nav
  },
  redirect: '/insuranceManage/insuranceCompany',
  children: [
    {
      path: '/insuranceManage/insuranceCompany',
      component: () => import('@/views/insuranceManage/insuranceCompany'),
      name: 'InsuranceCompany',
      meta: {
        noCache: true,
        title: '保险机构'
      },
      hidden: false
    },
    {
      path: '/insuranceManage/insuranceCompany/details/:id/:type',
      component: () =>
        import('@/views/insuranceManage/insuranceCompanyDetails'),
      name: 'InsuranceCompanyDetails',
      meta: {
        noCache: true,
        title: '保险机构详情',
        parentTitle: '保险机构',
        path: '/insuranceManage/insuranceCompany'
      },
      hidden: true
    },
    {
      path: '/insuranceManage/insuranceCompanyAdd/:id/:type',
      component: () =>
        import('@/views/insuranceManage/insuranceCompanyDetails'),
      name: 'InsuranceCompanyAdd',
      meta: {
        noCache: true,
        title: '新增保险机构',
        parentTitle: '保险机构',
        path: '/insuranceManage/insuranceCompany'
      },
      hidden: true
    },
    {
      path: '/insuranceManage/insuranceCompany/content-edit/:id/:type',
      component: () =>
        import('@/views/insuranceManage/insuranceCompanyDetails'),
      name: 'InsuranceCompanyEdit',
      meta: {
        noCache: true,
        title: '保险机构编辑',
        parentTitle: '保险机构',
        path: '/insuranceManage/insuranceCompany'
      },
      hidden: true
    },
    {
      path: '/insuranceManage/insuranceProducts',
      component: () => import('@/views/insuranceManage/product/index'),
      name: 'InsuranceProducts',
      meta: {
        noCache: true,
        title: '保险产品',

        keepComponentPages: ['CreateProduct', 'ProductDetails']
      },
      hidden: false
    },
    {
      path: '/insuranceManage/insuranceProducts/create/:id',
      component: () => import('@/views/insuranceManage/product/createProduct'),
      name: 'CreateProduct',
      meta: {
        noCache: true,
        title: '新增保险产品',
        parentTitle: '保险产品',
        path: '/insuranceManage/insuranceProducts'
      },
      hidden: true
    },
    {
      path: '/insuranceManage/insuranceProducts/details/:id/:type',
      component: () => import('@/views/insuranceManage/product/productDetails'),
      name: 'ProductDetails',
      meta: {
        noCache: true,
        title: '保险产品详情',
        parentTitle: '保险产品',
        path: '/insuranceManage/insuranceProducts'
      },
      hidden: true
    },
    {
      path: '/insuranceManage/insuranceProducts/content-edit/:id/:type',
      component: () => import('@/views/insuranceManage/product/productDetails'),
      name: 'ProductEdit',
      meta: {
        noCache: true,
        title: '保险产品编辑',
        parentTitle: '保险产品',
        path: '/insuranceManage/insuranceProducts'
      },
      hidden: true
    },
    {
      path: '/insuranceManage/insuranceProducts/details/:id/:type/:tabIndex',
      component: () => import('@/views/insuranceManage/product/productDetails'),
      name: 'ProductDetailsTab',
      meta: {
        noCache: true,
        title: '保险产品详情',
        parentTitle: '保险产品',
        path: '/insuranceManage/insuranceProducts'
      },
      hidden: true
    },
    {
      path: '/insuranceManage/insuranceCredit',
      component: () => import('@/views/insuranceManage/insuranceCredit'),
      name: 'InsuranceCredit',
      meta: {
        noCache: true,
        title: '保险信用'
      },
      hidden: false
    },
    // {
    //   path: '/insuranceManage/customerClaims',
    //   component: () => import('@/views/insuranceManage/customerClaims'),
    //   name: 'CustomerClaims',
    //   meta: {
    //     noCache: true,
    //     title: '客户理赔'
    //   },
    //   hidden: false
    // },
    // {
    //   path: '/insuranceManage/customerClaims/details/:id',
    //   component: () => import('@/views/insuranceManage/claimsDetails'),
    //   name: 'ClaimsDetails',
    //   meta: {
    //     noCache: true,
    //     title: '理赔详情',
    //     parentTitle: '客户理赔',
    //     path: '/insuranceManage/customerClaims'
    //   },
    //   hidden: true
    // },
    // {
    //   path: '/insuranceManage/underwrite',
    //   component: () => import('@/views/insuranceManage/underwrite'),
    //   name: 'Underwrite',
    //   meta: {
    //     noCache: true,
    //     title: '保险核保'
    //   },
    //   hidden: false
    // },
    // {
    //   path: '/insuranceManage/underwrite/details/:id',
    //   component: () => import('@/views/insuranceManage/underwriteDetails'),
    //   name: 'UnderwriteDetails',
    //   meta: {
    //     noCache: true,
    //     title: '核保详情',
    //     parentTitle: '保险核保',
    //     path: '/insuranceManage/underwrite',
    //   },
    //   hidden: true
    // },
    {
      path: '/insuranceManage/guaranteePower',
      component: () => import('@/views/insuranceManage/guaranteePower'),
      name: 'GuaranteePower',
      meta: {
        noCache: true,
        title: '保障责任'
      },
      hidden: false
    },
    {
      path: '/insuranceManage/guaranteePower/create',
      component: () =>
        import('@/views/insuranceManage/guaranteePower/createGuaranteePower'),
      name: 'CreateGuaranteePower',
      meta: {
        noCache: true,
        title: '新增保障责任',
        parentTitle: '保障责任',
        path: '/insuranceManage/guaranteePower'
      },
      hidden: true
    },
    {
      path: '/insuranceManage/guaranteePower/guaranteePowerDetails/:id',
      component: () =>
        import('@/views/insuranceManage/guaranteePower/guaranteePowerDetails'),
      name: 'GuaranteePowerDetails',
      meta: {
        noCache: true,
        title: '保障责任详情',
        parentTitle: '保障责任',
        path: '/insuranceManage/guaranteePower'
      },
      hidden: true
    },
    {
      path: '/insuranceManage/guaranteePower/content-edit/:id',
      component: () =>
        import('@/views/insuranceManage/guaranteePower/guaranteePowerDetails'),
      name: 'GuaranteePowerEdit',
      meta: {
        noCache: true,
        title: '保障责任编辑',
        parentTitle: '保障责任',
        path: '/insuranceManage/guaranteePower'
      },
      hidden: true
    },
    {
      path: '/insuranceRecord/questionnaire',
      component: () => import('@/views/insuranceRecord/questionnaire'),
      name: 'Questionnaire',
      meta: {
        noCache: true,
        title: '健康问卷'
      }
    },
    {
      path: '/insuranceRecord/questionnaire/questAdd',
      component: () => import('@/views/insuranceRecord/component/questEdit'),
      name: 'QuestAdd',
      meta: {
        noCache: true,
        title: '新增健康问卷',
        parentTitle: '健康问卷',
        path: '/insuranceRecord/questionnaire'
      }
    },
    {
      path: '/insuranceRecord/questionnaire/questEdit',
      component: () => import('@/views/insuranceRecord/component/questEdit'),
      name: 'QuestEdit',
      meta: {
        noCache: true,
        title: '健康问卷编辑',
        parentTitle: '健康问卷',
        path: '/insuranceRecord/questionnaire'
      }
    },
    {
      path: '/insuranceRecord/questionnaire/questView',
      component: () => import('@/views/insuranceRecord/component/questEdit'),
      name: 'QuestEditDetail',
      meta: {
        noCache: true,
        title: '查看健康问卷',
        parentTitle: '健康问卷',
        path: '/insuranceRecord/questionnaire'
      }
    }
  ]
};
