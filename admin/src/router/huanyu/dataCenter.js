import Layout from '@/layout';
export default {
  path: '/dataCenter',
  component: Layout,
  name: 'DataCenter',
  icon: 'el-icon-files',
  meta: {
    title: '数据中心',
    noCache: true
  },
  redirect: '/dataCenter/zhonghan',
  children: [
    {
      path: '/dataCenter/zhonghan',
      component: () => import('@/views/productPanel/index'),
      name: 'Zhonghan',
      meta: {
        title: '保险产品数据',
        noCache: true
      }
    },
    {
      path: '/dataCenter/serviceData',
      component: () => import('@/views/dataCenter/serviceData/index'),
      name: 'ServiceData',
      meta: {
        title: '服务数据',
        noCache: true
      }
    },
    {
      path: '/dataCenter/serviceData/AddServiceData',
      component: () => import('@/views//dataCenter/serviceData/addServiceData'),
      name: 'AddServiceData',
      meta: {
        noCache: true,
        title: '上传数据'
      }
    }
  ]
};
