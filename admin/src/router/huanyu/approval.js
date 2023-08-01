import Layout from '@/layout';
export default {
  path: '/approval',
  component: Layout,
  name: 'Approval',
  meta: {
    title: 'OA审批',
    noCache: true
  },
  redirect: '/approval/setting',
  children: [
    {
      path: '/approval/setting',
      component: () => import('@/views/approval/setting/index'),
      name: 'ApprovalSetting',
      meta: {
        title: '审批设置',
        noCache: true
      }
    },
    {
      path: '/approval/setting/detail',
      component: () => import('@/views/approval/setting/detail'),
      name: 'Detail',
      meta: {
        path: '/approval/setting',
        title: '使用说明',
        noCache: true
      }
    }
  ]
};
