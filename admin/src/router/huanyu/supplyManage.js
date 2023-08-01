import Layout from '@/layout';
export default {
  path: '/supplyChainManage',
  component: Layout,
  name: 'SupplyChainManage',
  icon: 'el-icon-setting',
  meta: {
    title: '供应链管理',
    // icon: 'guide',
    noCache: true,
    roles: ['admin'] // you can set roles in root nav
  },
  redirect: '/supplyChainManage/servicePackage',
  children: [
    {
      path: '/supplyChainManage/servicePackage',
      component: () => import('@/views/supplyChainManage/servicePackage'),
      name: 'ServicePackage',
      meta: {
        title: '服务包',
        noCache: true,
        keepAlive: true,
        keepComponentPages: ['ServicePackageDetails']
      },
      hidden: false
    },
    {
      path: '/supplyChainManage/servicePackage/details/:id/:type',
      component: () =>
        import('@/views/supplyChainManage/servicePackageDetails'),
      name: 'ServicePackageDetails',
      meta: {
        noCache: true,
        title: '服务包详情',
        parentTitle: '服务包',
        path: '/supplyChainManage/servicePackage'
      },
      hidden: true
    },
    {
        path: '/supplyChainManage/servicePackage/add/:id/:type',
        component: () =>
          import('@/views/supplyChainManage/servicePackageDetails'),
        name: 'ServicePackageAdd',
        meta: {
          noCache: true,
          title: '服务包详情',
          parentTitle: '服务包',
          path: '/supplyChainManage/servicePackage'
        },
        hidden: true
      },
      {
        path: '/supplyChainManage/servicePackage/edit/:id/:type',
        component: () =>
          import('@/views/supplyChainManage/servicePackageDetails'),
        name: 'ServicePackageEdit',
        meta: {
          noCache: true,
          title: '服务包详情',
          parentTitle: '服务包',
          path: '/supplyChainManage/servicePackage'
        },
        hidden: true
      },
    {
      path: '/supplyChainManage/serviceItems',
      component: () => import('@/views/supplyChainManage/serviceItems'),
      name: 'ServiceItems',
      meta: {
        noCache: true,
        title: '服务项',
        keepAlive: true,
        keepComponentPages: ['ServiceItemsDetails']
      },
      hidden: false
    },
    {
      path: '/supplyChainManage/serviceItems/details/:id/:type',
      component: () => import('@/views/supplyChainManage/serviceItemsDetails'),
      name: 'ServiceItemsDetails',
      meta: {
        noCache: true,
        title: '服务项详情',
        parentTitle: '服务项',
        path: '/supplyChainManage/serviceItems'
      },
      hidden: true
    },
    {
        path: '/supplyChainManage/serviceItems/add-details/:id/:type',
        component: () => import('@/views/supplyChainManage/serviceItemsDetails'),
        name: 'ServiceItemsDetailsAdd',
        meta: {
          noCache: true,
          title: '服务项详情',
          parentTitle: '服务项',
          path: '/supplyChainManage/serviceItems'
        },
        hidden: true
      },
      {
        path: '/supplyChainManage/serviceItems/edit-details/:id/:type',
        component: () => import('@/views/supplyChainManage/serviceItemsDetails'),
        name: 'ServiceItemsDetailsEdit',
        meta: {
          noCache: true,
          title: '服务项详情',
          parentTitle: '服务项',
          path: '/supplyChainManage/serviceItems'
        },
        hidden: true
      },
    {
      path: '/supplyChainManage/serviceItems/details/:id/:type/:tabIndex',
      component: () => import('@/views/supplyChainManage/serviceItemsDetails'),
      name: 'ServiceItemsDetailsTab',
      meta: {
        noCache: true,
        title: '服务项详情',
        parentTitle: '服务项',
        path: '/supplyChainManage/serviceItems'
      },
      hidden: true
    },
    {
      path: '/supplyChainManage/supplier',
      component: () => import('@/views/supplyChainManage/supplier'),
      name: 'Supplier',
      meta: {
        noCache: true,
        title: '供应商'
      },
      hidden: false
    },
    {
      path: '/supplyChainManage/supplier/details/:id/:type',
      component: () => import('@/views/supplyChainManage/supplierDetails'),
      name: 'SupplierDetails',
      meta: {
        noCache: true,
        title: '供应商详情',
        parentTitle: '供应商',
        path: '/supplyChainManage/supplier'
      },
      hidden: true
    },
    {
        path: '/supplyChainManage/supplier/add/:id/:type',
        component: () => import('@/views/supplyChainManage/supplierDetails'),
        name: 'SupplierAdd',
        meta: {
          noCache: true,
          title: '供应商详情',
          parentTitle: '供应商',
          path: '/supplyChainManage/supplier'
        },
        hidden: true
      },
      {
        path: '/supplyChainManage/supplier/edit/:id/:type',
        component: () => import('@/views/supplyChainManage/supplierDetails'),
        name: 'SupplierEdit',
        meta: {
          noCache: true,
          title: '供应商详情',
          parentTitle: '供应商',
          path: '/supplyChainManage/supplier'
        },
        hidden: true
      },
    {
      path: '/supplyChainManage/tagLibrary',
      component: () => import('@/views/supplyChainManage/tagLibrary/index'),
      name: 'TagLibrary',
      meta: {
        noCache: true,
        title: '标签库'
      },
      hidden: false
    },
    {
      path: '/supplyChainManage/serviceType',
      component: () =>
        import('@/views/supplyChainManage/serviceTypeConfig/index'),
      name: 'ServiceType',
      meta: {
        noCache: true,
        title: '分类设置'
      },
      hidden: false
    },
    {
      path: '/supplyChainManage/inventoryMessage',
      component: () =>
        import('@/views/supplyChainManage/inventoryMessage/index'),
      name: 'InventoryMessage',
      meta: {
        noCache: true,
        title: '杠杆消息配置'
      },
      hidden: false
    }
  ]
};
