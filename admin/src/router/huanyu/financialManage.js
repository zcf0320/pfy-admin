import Layout from '@/layout';
export default {
  path: '/financial-center',
  component: Layout,
  name: 'SettleManage',
  icon: 'el-icon-postcard',
  meta: {
    title: '财务管理',
    noCache: true,
    roles: ['admin']
  },
  children: [
    {
      path: 'service-item-settlement',
      component: () =>
        import('@/views/financialCenter/service-item-settlement/index'),
      name: 'ServiceItemSettlement',
      meta: {
        noCache: true,
        title: '服务项结算',
        keepAlive: true,
        keepComponentPages: ['SettleDetail']
      }
    },
    {
      path: 'service-item-settlement/detail/:id',
      component: () =>
        import('@/views/financialCenter/service-item-settlement/detail'),
      name: 'ServiceItemSettlementDetail',
      meta: {
        title: '服务项结算详情',
        noCache: true
      }
    },
    {
      path: 'service-item-settlement-details',
      component: () =>
        import('@/views/financialCenter/service-item-settlement/details/index'),
      name: 'ServiceItemSettlementDetails',
      meta: {
        noCache: true,
        title: '服务结算明细',
        keepAlive: true,
        keepComponentPages: ['SettleDetails']
      }
    },
    {
      path: 'service-item-settlement-details/detail/:id',
      component: () =>
        import(
          '@/views/financialCenter/service-item-settlement/details/detail'
        ),
      name: 'ServiceItemSettlementDetailsDetail',
      meta: {
        title: '服务结算明细详情',
        noCache: true
      }
    },
    {
      path: 'claim-settlement',
      component: () => import('@/views/financialCenter/claim-settlement/index'),
      name: 'ClaimSettlement',
      meta: {
        noCache: true,
        title: '理赔结算单',
        keepAlive: true,
        keepComponentPages: ['CompanySettlementDetail']
      }
    },
    {
      path: 'claim-settlement/detail/:id',
      component: () =>
        import('@/views/financialCenter/claim-settlement/detail'),
      name: 'ClaimSettlementDetail',
      meta: {
        title: '结算单详情',
        noCache: true
      }
    },
    {
      path: 'claim-settlement-details',
      component: () =>
        import('@/views/financialCenter/claim-settlement/details/index'),
      name: 'ClaimSettlementDetails',
      meta: {
        noCache: true,
        title: '理赔结算明细',
        keepAlive: true,
        keepComponentPages: ['companySettlementAllDetail']
      }
    },
    {
      path: 'claim-settlement-details/detail/:id',
      component: () =>
        import('@/views/financialCenter/claim-settlement/details/detail'),
      name: 'ClaimSettlementDetailsDetail',
      meta: {
        title: '结算明细详情',
        noCache: true
      }
    },
    {
      path: 'policy-settlement',
      component: () =>
        import('@/views/financialCenter/policy-settlement/index'),
      name: 'PolicySettlement',
      meta: {
        noCache: true,
        title: '保单结算单',
        keepAlive: true,
        keepComponentPages: ['PolicySettlementDetail']
      }
    },
    {
      path: 'policy-settlement/detail/:id',
      component: () =>
        import('@/views/financialCenter/policy-settlement/detail'),
      name: 'PolicySettlementDetail',
      meta: {
        title: '结算单详情',
        noCache: true
      }
    },
    {
      path: 'policy-settlement-details',
      component: () =>
        import('@/views/financialCenter/policy-settlement/details/index'),
      name: 'PolicySettlementDetails',
      meta: {
        noCache: true,
        title: '保单结算明细',
        keepAlive: true,
        keepComponentPages: ['PolicySettlementDetailDetail']
      }
    },
    {
      path: 'policy-settlement-details/detail/:id',
      component: () =>
        import('@/views/financialCenter/policy-settlement/details/detail'),
      name: 'PolicySettlementDetailsDetail',
      meta: {
        title: '保单结算明细详情',
        noCache: true
      }
    },
    {
      path: 'drug-dealer-settlement',
      component: () =>
        import('@/views/financialCenter/drug-dealer-settlement/index'),
      name: 'DrugDealerSettlement',
      meta: {
        noCache: true,
        title: '药商结算单',
        keepAlive: true,
        keepComponentPages: ['PolicySettlementDetail']
      }
    },
    {
      path: 'drug-dealer-settlement/detail/:id',
      component: () =>
        import('@/views/financialCenter/drug-dealer-settlement/detail'),
      name: 'DrugDealerSettlementDetail',
      meta: {
        title: '结算单详情',
        noCache: true
      }
    },
    {
      path: 'drug-dealer-settlement-details',
      component: () =>
        import('@/views/financialCenter/drug-dealer-settlement/details/index'),
      name: 'DrugDealerSettlementDetails',
      meta: {
        noCache: true,
        title: '保单结算明细',
        keepAlive: true,
        keepComponentPages: ['PolicySettlementDetailDetail']
      }
    },
    {
      path: 'drug-dealer-settlement-details/detail/:id',
      component: () =>
        import('@/views/financialCenter/drug-dealer-settlement/details/detail'),
      name: 'DrugDealerSettlementDetailsDetail',
      meta: {
        title: '保单结算明细详情',
        noCache: true
      }
    },
    {
      path: 'supplier-sales-settlement',
      component: () =>
        import('@/views/financialCenter/supplier-sales-settlement/index'),
      name: 'SupplierSalesSettlement',
      meta: {
        title: '新增销售结算',
        noCache: true
      }
    },
    {
      path: 'supplier-sales-settlement/detail/:id',
      component: () =>
        import('@/views/financialCenter/supplier-sales-settlement/detail'),
      name: 'SupplierSalesSettlementDetail',
      meta: {
        title: '销售结算详情',
        noCache: true
      }
    },
    {
      path: 'supplier-sales-settlement/create',
      component: () =>
        import('@/views/financialCenter/supplier-sales-settlement/create'),
      name: 'SupplierSalesSettlementCreate',
      meta: {
        title: '新增销售结算',
        noCache: true
      }
    },
    {
      path: 'insurance-company-sales-settlement',
      component: () =>
        import(
          '@/views/financialCenter/insurance-company-sales-settlement/index'
        ),
      name: 'InsuranceCompanySalesSettlement',
      meta: {
        title: '销售结算',
        noCache: true,
        parentTitle: '结算列表'
      }
    },
    {
      path: 'insurance-company-sales-settlement/detail/:id',
      component: () =>
        import(
          '@/views/financialCenter/insurance-company-sales-settlement/detail'
        ),
      name: 'InsuranceCompanySalesSettlementDetail',
      meta: {
        title: '销售结算详情',
        noCache: true,
        parentTitle: '结算列表'
      }
    },
    {
      path: 'insurance-company-sales-settlement/create',
      component: () =>
        import(
          '@/views/financialCenter/insurance-company-sales-settlement/create'
        ),
      name: 'InsuranceCompanySalesSettlementCreate',
      meta: {
        title: '新增销售结算',
        noCache: true,
        parentTitle: '结算列表'
      }
    },
    {
      path: '/settle/statisticalReport',
      component: () => import('@/views/statisticalReport'),
      name: 'StatisticalReport',
      meta: {
        title: '统计报表',
        noCache: true
      },
      hidden: false
    },
    {
      path: '/settle/statisticalReport/policyReport',
      component: () => import('@/views/statisticalReport/policyReport'),
      name: 'PolicyReport',
      meta: {
        title: '保单报表',
        noCache: true,
        parentTitle: '统计报表',
        path: '/settle/statisticalReport'
      },
      hidden: false
    },
    {
      path: '/settle/statisticalReport/companyReport',
      component: () => import('@/views/statisticalReport/companyReport'),
      name: 'CompanyReport',
      meta: {
        title: '保险机构报表',
        noCache: true,
        parentTitle: '统计报表',
        path: '/settle/statisticalReport'
      },
      hidden: false
    },
    {
      path: '/settle/statisticalReport/productReport',
      component: () => import('@/views/statisticalReport/productReport'),
      name: 'ProductReport',
      meta: {
        title: '保险产品报表',
        noCache: true,
        parentTitle: '统计报表',
        path: '/settle/statisticalReport'
      },
      hidden: false
    },
    {
      path: '/settle/statisticalReport/serviceItemReport',
      component: () => import('@/views/statisticalReport/serviceItemReport'),
      name: 'ServiceItemReport',
      meta: {
        title: '服务项报表',
        noCache: true,
        parentTitle: '统计报表',
        path: '/settle/statisticalReport'
      },
      hidden: false
    },
    {
      path: '/settle/statisticalReport/serviceBillReport',
      component: () => import('@/views/statisticalReport/serviceBillReport'),
      name: 'ServiceBillReport',
      meta: {
        title: '服务单报表',
        noCache: true,
        parentTitle: '统计报表',
        path: '/settle/statisticalReport'
      },
      hidden: false
    },
    {
      path: '/settle/statisticalReport/supplierReport',
      component: () => import('@/views/statisticalReport/supplierReport'),
      name: 'SupplierReport',
      meta: {
        title: '供应商报表',
        noCache: true,
        parentTitle: '统计报表',
        path: '/settle/statisticalReport'
      },
      hidden: false
    }
    // {
    //     path: "/settle/approval",
    //     component: () => import("@/views/settle/approval"),
    //     name: "SettleAll",
    //     meta: {
    //         noCache: true,
    //         title: "财务审批"
    //     }
    // }
  ]
};
