import Layout from '@/layout';
export default {
  path: '/secondaryTreatment',
  component: Layout,
  name: 'secondaryTreatment',
  icon: 'icon_menu_treatment',
  meta: {
    title: '医师服务',
    noCache: true,
    roles: ['admin'] // you can set roles in root nav
  },
  redirect: '/secondaryTreatment/treatments',
  children: [
    {
      path: '/secondaryTreatment/treatments',
      component: () => import('@/views/secondaryTreatment/treatments'),
      name: 'Treatments',
      meta: {
        title: '审核记录',
        noCache: true
      },
      hidden: false
    },
    {
      path: '/secondaryTreatment/treatments/detail/:id',
      component: () => import('@/views/secondaryTreatment/treatmentsDetail'),
      name: 'TreatmentsDetail',
      meta: {
        noCache: true,
        title: '审核详情'
      },
      hidden: true
    },
    {
        path: '/secondaryTreatment/treatments/edit/:id',
        component: () => import('@/views/secondaryTreatment/treatmentsDetail'),
        name: 'TreatmentsEdit',
        meta: {
          noCache: true,
          title: '审核编辑'
        },
        hidden: true
      },
    {
      path: '/secondaryTreatment/auditMaterials',
      component: () => import('@/views/secondaryTreatment/auditMaterials'),
      name: 'AuditMaterials',
      meta: {
        noCache: true,
        title: '应用设置'
      },
      hidden: false
    },
    {
      path: '/secondaryTreatment/auditMaterials/detail/:id/:type',
      component: () =>
        import('@/views/secondaryTreatment/auditMaterials/detail'),
      name: 'AuditMaterialsDetail',
      meta: {
        noCache: true,
        title: '设置详情'
      },
      hidden: false
    },
    {
        path: '/secondaryTreatment/auditMaterials/add/:id/:type',
        component: () =>
          import('@/views/secondaryTreatment/auditMaterials/detail'),
        name: 'AuditMaterialsAdd',
        meta: {
          noCache: true,
          title: '设置详情'
        },
        hidden: false
      },
      {
        path: '/secondaryTreatment/auditMaterials/edit/:id/:type',
        component: () =>
          import('@/views/secondaryTreatment/auditMaterials/detail'),
        name: 'AuditMaterialsEdit',
        meta: {
          noCache: true,
          title: '设置详情'
        },
        hidden: false
      }
  ]
};
