import Layout from '@/layout';
export default {
  path: '/projectManage',
  component: Layout,
  name: 'ProjectManage',
  icon: 'el-icon-postcard',
  meta: {
    title: '项目管理',
    noCache: true,
    roles: ['admin']
  },
  redirect: '/projectManage/customer/supplier',
  children: [
    {
      path: '/projectManage/customer',
      component: () => import('@/views/projectManage/customer/index'),
      name: 'Customer',
      meta: {
        noCache: true,
        title: '企业客户'
      }
    },
    {
      path: '/projectManage/customer/detail/:id/:type',
      component: () => import('@/views/projectManage/customer/supplierDetails'),
      name: 'CustomerDetail',
      meta: {
        noCache: true,
        title: '企业客户详情'
      },
      hidden: true
    },
    {
      path: '/projectManage/customerAdd/:id/:type',
      component: () => import('@/views/projectManage/customer/supplierDetails'),
      name: 'CustomerAdd',
      meta: {
        noCache: true,
        title: '企业客户新增'
      },
      hidden: true
    },
    {
      path: '/projectManage/customerEdit/:id/:type',
      component: () => import('@/views/projectManage/customer/supplierDetails'),
      name: 'CustomerEdit',
      meta: {
        noCache: true,
        title: '企业客户编辑'
      },
      hidden: true
    },
    {
      path: '/projectManage/channelManage',
      component: () => import('@/views/projectManage/channelManage'),
      name: 'ChannelManage',
      meta: {
        noCache: true,
        title: '渠道管理'
      }
    },
    {
      path: '/projectManage/channelDetails',
      component: () => import('@/views/projectManage/channelDetails'),
      name: 'ChannelEdit',
      meta: {
        noCache: true,
        title: '渠道编辑'
      }
    },
    {
      path: '/projectManage/channelAdd',
      component: () => import('@/views/projectManage/channelDetails'),
      name: 'ChannelAdd',
      meta: {
        noCache: true,
        title: '渠道新增'
      }
    },
    {
      path: '/projectManage/activeCodeManage',
      component: () => import('@/views/projectManage/activeCodeManage'),
      name: 'ActiveCodeManage',
      meta: {
        noCache: true,
        title: '券码管理'
      }
    },
    {
      path: '/projectManage/activeCodeManage/details/:id',
      component: () => import('@/views/projectManage/activeCodeDetails'),
      name: 'ActiveCodeDetails',
      meta: {
        noCache: true,
        title: '激活码详情'
      }
    }
  ]
};
