import Layout from '@/layout';
export default {
  path: '/legal-affairs-center',
  component: Layout,
  name: 'LegalAffairsCenter',
  icon: 'el-icon-s-custom',
  meta: {
    title: '法务中心',
    // icon: 'guide',
    noCache: true,
    roles: ['admin'] // you can set roles in root nav
  },
  redirect: '/legal-affairs-center/contract-manage/index',
  children: [
    {
      path: '/legal-affairs-center/contract-manage/index',
      component: () =>
        import('@/views/LegalAffairsCenter/ContractManage/index'),
      name: 'contractManage',
      meta: {
        title: '合同管理',
        noCache: true
      }
    },
    {
      path: '/legal-affairs-center/contract-manage/create',
      component: () => import('@/views/LegalAffairsCenter/ContractManage/edit'),
      name: 'contractCreate',
      meta: {
        title: '新增合同',
        noCache: true
      }
    },
    {
      path: '/legal-affairs-center/contract-manage/detail/:id',
      component: () => import('@/views/LegalAffairsCenter/ContractManage/edit'),
      name: 'contractDetail',
      meta: {
        title: '合同详情',
        noCache: true
      }
    },
    {
      path: '/legal-affairs-center/contract-manage/edit/:id',
      component: () => import('@/views/LegalAffairsCenter/ContractManage/edit'),
      name: 'contractEdit',
      meta: {
        title: '合同编辑',
        noCache: true
      }
    },
    {
      path: '/legal-affairs-center/agreement',
      component: () => import('@/views/LegalAffairsCenter/agreement/index'),
      name: 'Agreement',
      meta: {
        title: '用户协议',
        noCache: true
      }
    },
    {
      path: '/legal-affairs-center/agreement/detail/:id/:type',
      component: () => import('@/views/LegalAffairsCenter/agreement/detail'),
      name: 'AgreementDetail',
      meta: {
        title: '用户协议详情',
        noCache: true
      }
    },
    {
      path: '/legal-affairs-center/agreement/content-edit/:id/:type',
      component: () => import('@/views/LegalAffairsCenter/agreement/detail'),
      name: 'AgreementEdit',
      meta: {
        title: '用户协议编辑',
        noCache: true
      }
    },
    {
      path: '/legal-affairs-center/agreement/history/:type',
      component: () => import('@/views/LegalAffairsCenter/agreement/history'),
      name: 'AgreementHistory',
      meta: {
        title: '历史版本',
        noCache: true
      }
    }
  ]
};
