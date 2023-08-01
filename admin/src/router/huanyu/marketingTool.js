import Layout from '@/layout';
export default {
  path: '/marketingTool',
  component: Layout,
  name: 'MarketingTool',
  meta: {
    title: '营销工具',
    noCache: true
  },
  redirect: '/marketingTool/userRecord',
  children: [
    {
      path: '/marketingTool/userRecord',
      component: () => import('@/views/marketingTool/userRecord/index'),
      name: 'UserRecord',
      meta: {
        title: '用户记录',
        noCache: true
      }
    },
    {
      path: '/marketingTool/userRecord/detail/:id/:source',
      component: () => import('@/views/marketingTool/userRecord/detail'),
      name: 'UserRecordDetail',
      meta: {
        noCache: true,
        title: '使用详情'
      }
    },
    {
      path: '/marketingTool/questionnaireManage',
      component: () =>
        import('@/views/marketingTool/questionnaireManage/index'),
      name: 'QuestionnaireManage',
      meta: {
        title: '问卷管理',
        noCache: true
      }
    },
    {
      path: '/marketingTool/questionnaireManage/detail/:id',
      component: () =>
        import('@/views/marketingTool/questionnaireManage/detail'),
      name: 'QuestionnaireManageDetail',
      meta: {
        noCache: true,
        title: '问卷详情'
      }
    },
    {
      path: '/marketingTool/questionnaireManage/add/:id',
      component: () =>
        import('@/views/marketingTool/questionnaireManage/addQuestionnaire'),
      name: 'AddQuestionnaire',
      meta: {
        noCache: true,
        title: '新增问卷'
      }
    },
    {
      path: '/marketingTool/questionnaireManage/edit/:id',
      component: () =>
        import('@/views/marketingTool/questionnaireManage/editQuestionnaire'),
      name: 'EditQuestionnaire',
      meta: {
        noCache: true,
        title: '问卷详情'
      }
    },
    {
      path: '/marketingTool/interests',
      component: () => import('@/views/marketingTool/interests/index'),
      name: 'Interests',
      meta: {
        title: '权益券',
        noCache: true
      }
    },
    {
      path: '/marketingTool/interests/detail/:id',
      component: () => import('@/views/marketingTool/interests/detail'),
      name: 'InterestsDetail',
      meta: {
        title: '权益券详情',
        noCache: true
      }
    },
    {
      path: '/marketingTool/interestsAdd/detail/:id',
      component: () => import('@/views/marketingTool/interests/detail'),
      name: 'InterestsAdd',
      meta: {
        title: '权益券新增',
        noCache: true
      }
    }
  ]
};
