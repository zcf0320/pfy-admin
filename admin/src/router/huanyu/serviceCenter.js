import Layout from '@/layout';
export default {
  path: '/serviceCenter',
  component: Layout,
  name: 'ServiceCenter',
  icon: 'el-icon-files',
  meta: {
    title: '服务中心',
    noCache: true
  },
  redirect: '/serviceCenter/serviceList',
  children: [
    {
      path: '/serviceCenter/serviceList',
      component: () => import('@/views/toolLibrary/examineReason/index'),
      name: 'ServiceList',
      meta: {
        title: '服务列表',
        noCache: true
      }
    }
  ]
};
