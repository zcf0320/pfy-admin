import Layout from '@/layout';
export default {
  path: '/insuranceRecord',
  component: Layout,
  name: 'InsuranceRecord',
  icon: 'el-icon-receiving',
  meta: {
    title: '投保记录',
    // icon: 'guide',
    noCache: true,
    roles: ['admin'] // you can set roles in root nav
  },
  redirect: '/insuranceRecord/personalInsuranceRecord',
  children: [
    {
      path: '/insuranceRecord/personalInsuranceRecord',
      component: () =>
        import('@/views/insuranceRecord/personalInsuranceRecord'),
      name: 'PersonalInsuranceRecord',
      meta: {
        title: '个险投保',
        noCache: true
      }
    },
    {
      path: '/insuranceRecord/personalInsuranceRecord/details/:id',
      component: () =>
        import('@/views/insuranceRecord/personalInsuranceRecordDetails'),
      name: 'PersonalInsuranceRecordDetails',
      meta: {
        noCache: true,
        title: '个险投保详情'
      }
    },
    {
      path: '/insuranceRecord/groupInsuranceRecord',
      component: () => import('@/views/insuranceRecord/groupInsuranceRecord'),
      name: 'GroupInsuranceRecord',
      meta: {
        noCache: true,
        title: '团险投保'
      }
    },
    {
      path: '/insuranceRecord/groupInsuranceRecord/details/:id',
      component: () =>
        import('@/views/insuranceRecord/groupInsuranceRecordDetails'),
      name: 'GroupInsuranceRecordDetails',
      meta: {
        noCache: true,
        title: '团险投保详情'
      }
    }
  ]
};
