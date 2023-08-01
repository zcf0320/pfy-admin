import Layout from '@/layout';
export default {
  path: '/inquiryManage',
  component: Layout,
  name: 'InquiryManage',
  icon: 'el-icon-s-custom',
  meta: {
    title: '问诊管理',
    noCache: true,
    roles: ['admin'] // you can set roles in root nav
  },
  redirect: '/inquiryManage/inquiryRecord',
  children: [
    {
      path: '/inquiryManage/inquiryRecord',
      component: () => import('@/views/inquiryManage/inquiryRecord/index'),
      name: 'InquiryRecord',
      meta: {
        title: 'AI问诊',
        noCache: true
      }
    },
    {
      path: '/inquiryManage/inquiryRecord/detail/:id',
      component: () =>
        import('@/views/inquiryManage/inquiryRecord/recordDetails'),
      name: 'RecordDetails',
      meta: {
        noCache: true,
        title: 'AI问诊详情'
      }
    },
    {
      path: '/inquiryManage/workOrderManage',
      component: () => import('@/views/inquiryManage/workOrderManage/index'),
      name: 'WorkOrder',
      meta: {
        title: '人工问诊',
        noCache: true
      }
    },
    {
        path: '/inquiryManage/workOrderManage/detail/:id',
        component: () =>
          import('@/views/inquiryManage/workOrderManage/details'),
        name: 'WorkOrderDetail',
        meta: {
          noCache: true,
          title: '人工问诊详情'
        }
      },
    {
      path: '/inquiryManage/telWorkOrderManage',
      component: () => import('@/views/inquiryManage/telWorkOrderManage/index'),
      name: 'TelWorkOrder',
      meta: {
        title: '电话问诊',
        noCache: true
      }
    },

    {
      path: '/inquiryManage/telWorkOrderManage/detail/:id',
      component: () =>
        import('@/views/inquiryManage/telWorkOrderManage/detail'),
      name: 'TelWorkOrderManageDetail',
      meta: {
        noCache: true,
        title: '电话问诊详情'
      }
    },
    {
      path: '/inquiryManage/im',
      component: () => import('@/views/inquiryManage/im/index'),
      name: 'IM',
      meta: {
        title: '聊天工具',
        noCache: true
      }
    }
  ]
};
