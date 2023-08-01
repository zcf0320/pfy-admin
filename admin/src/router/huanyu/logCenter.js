import Layout from '@/layout';
export default {
  path: '/log-center',
  component: Layout,
  name: 'LogCenter',
  icon: 'el-icon-s-custom',
  meta: {
    title: '日志中心',
    // icon: 'guide',
    noCache: true,
    roles: ['admin'] // you can set roles in root nav
  },
  redirect: '/log-center/log-manage/index',
  children: [
    {
      path: '/log-center/log-manage/index',
      component: () => import('@/views/LogCenter/LogManage/index'),
      name: 'LogManage',
      meta: {
        title: '日志中心',
        noCache: true
      }
    }
  ]
};
