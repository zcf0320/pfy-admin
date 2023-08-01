import Layout from '@/layout';
export default {
  path: '/dashboard',
  component: Layout,
  name: 'Dashboard',
  icon: 'el-icon-setting',
  meta: {
    title: '数据看板',
    // icon: 'guide',
    noCache: true,
    roles: ['admin'] // you can set roles in root nav
  },
  redirect: '/dashboard/supplyChainDashboard',
  children: [
    {
      path: '/dashboard/supplyChainDashboard',
      component: () => import('@/views/supplyChainData/dashboard/index'),
      name: 'SupplyChainDashboard',
      meta: {
        title: '总体概览',
        noCache: true
      },
      hidden: false
    },
    {
      path: '/dashboard/insuranceDashboard',
      component: () => import('@/views/insuranceManage/dashboard/index'),
      name: 'InsuranceDashboard',
      meta: {
        title: '总体概览',
        noCache: true
      },
      hidden: false
    },
    {
      path: '/dashboard/operateDashboard',
      component: () => import('@/views/operateManage/dashboard/index'),
      name: 'OperateDashboard',
      meta: {
        title: '总体概览',
        noCache: true
      },
      hidden: false
    },
    {
      path: '/dashboard/insuranceProduct/statistics',
      component: () =>
        import('@/views/insuranceManage/dashboard/insuranceProductStatistics'),
      name: 'insuranceProductStatistics',
      meta: {
        title: '保险产品',
        noCache: true
      },
      hidden: false
    },
    {
      path: '/dashboard/insuranceProduct/claim/statistics',
      component: () =>
        import('@/views/insuranceManage/dashboard/claimStatisticsDetail'),
      name: 'insuranceProductStatisticsDetail',
      meta: {
        title: '理赔数据统计',
        noCache: true
      },
      hidden: false
    },
    {
      path: '/dashboard/insuranceProduct/claim/medicine',
      component: () =>
        import('@/views/insuranceManage/dashboard/claimMedicineDetail'),
      name: 'claimMedicineDetail',
      meta: {
        title: '赔付详情',
        noCache: true
      },
      hidden: false
    }
  ]
};
