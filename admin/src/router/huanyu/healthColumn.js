import Layout from '@/layout';
export default {
  path: '/healthColumn',
  component: Layout,
  name: 'HealthColumn',
  icon: 'el-icon-tickets',
  meta: {
    title: '健康专栏',
    // icon: 'guide',
    noCache: true,
    roles: ['admin'] // you can set roles in root nav
  },
  redirect: '/healthColumn/contentList',
  children: [
    {
      path: '/healthColumn/contentList',
      component: () => import('@/views/healthColumn/contentList/index'),
      name: 'ContentList',
      meta: {
        title: '内容列表',
        noCache: true
      }
    },
    {
      path: '/healthColumn/createContent',
      component: () => import('@/views/healthColumn/contentList/createContent'),
      name: 'CreateContent',
      meta: {
        noCache: true,
        title: '新增内容'
      }
    },
    {
      path: '/healthColumn/contentDetails/details/:id/:type/:status',
      component: () =>
        import('@/views/healthColumn/contentList/contentDetails'),
      name: 'HealthContentDetails',
      meta: {
        noCache: true,
        title: '内容详情'
      }
    },
    {
        path: '/healthColumn/content-edit/:id/:type/:status',
        component: () =>
          import('@/views/healthColumn/contentList/contentDetails'),
        name: 'HealthContentEdit',
        meta: {
          noCache: true,
          title: '内容编辑'
        }
      },
    {
      path: '/healthColumn/applicationSetting',
      component: () => import('@/views/healthColumn/applicationSetting/index'),
      name: 'ApplicationSetting',
      meta: {
        title: '应用设置',
        noCache: true
      }
    }
  ]
};
