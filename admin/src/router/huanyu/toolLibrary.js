import Layout from '@/layout';
export default {
  path: '/toolLibrary',
  component: Layout,
  name: 'toolLibrary',
  icon: 'el-icon-help',
  meta: {
    title: '工具库',
    noCache: true
  },
  redirect: '/toolLibrary/examineReason',
  children: [
    {
      path: '/toolLibrary/examineReason',
      component: () => import('@/views/toolLibrary/examineReason/index'),
      name: 'examineReason',
      meta: {
        title: '审核原因设置',
        noCache: true
      }
    },
    {
      path: '/toolLibrary/materialManage',
      component: () => import('@/views/toolLibrary/materialManage/index'),
      name: 'MaterialManage',
      meta: {
        title: '材料管理',
        noCache: true
      }
    },
    {
      path: '/toolLibrary/materialManage/content-edit/:id/:type',
      component: () =>
        import('@/views/toolLibrary/materialManage/createMaterial'),
      name: 'CreateMaterialEdit',
      meta: {
        title: '材料编辑',
        noCache: true
      }
    },
    {
      path: '/toolLibrary/materialManage/createAdd/:id/:type',
      component: () =>
        import('@/views/toolLibrary/materialManage/createMaterial'),
      name: 'CreateMaterialAdd',
      meta: {
        title: '新增材料',
        noCache: true
      }
    },
    {
      path: '/toolLibrary/materialManage/detail/:id',
      component: () =>
        import('@/views/toolLibrary/materialManage/detailMaterial'),
      name: 'CreateMaterialDetail',
      meta: {
        title: '查看材料',
        noCache: true
      }
    }
  ]
};
