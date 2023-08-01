import Layout from '@/layout';
export default {
  path: '/policyManage',
  component: Layout,
  name: 'PolicyManage',
  icon: 'el-icon-tickets',
  meta: {
    title: '保单管理',
    // icon: 'guide',
    noCache: true,
    roles: ['admin'] // you can set roles in root nav
  },
  redirect: '/policyManage/personalPolicy',
  children: [
    {
      path: '/policyManage/personalPolicy',
      component: () => import('@/views/policyManage/personalPolicy'),
      name: 'PersonalPolicy',
      meta: {
        title: '个险保单',
        noCache: false
      }
    },
    {
      path: '/policyManage/personalPolicy/details/:id',
      component: () => import('@/views/policyManage/personalPolicyDetails'),
      name: 'PersonalPolicyDetails',
      meta: {
        noCache: true,
        title: '个险保单详情'
      }
    },
    {
      path: '/policyManage/groupPolicy',
      component: () => import('@/views/policyManage/groupPolicy'),
      name: 'GroupPolicy',
      meta: {
        noCache: true,
        title: '团险保单'
      }
    },
    {
      path: '/policyManage/groupPolicy/create',
      component: () => import('@/views/policyManage/groupPolicyCreate'),
      name: 'GroupPolicyAdd',
      meta: {
        noCache: true,
        title: '团险保单创建'
      }
    },
    {
      path: '/policyManage/groupPolicy/details/:id',
      component: () => import('@/views/policyManage/groupPolicyDetails'),
      name: 'GroupPolicyDetails',
      meta: {
        noCache: true,
        title: '团险投保详情'
      }
    }
  ]
};
