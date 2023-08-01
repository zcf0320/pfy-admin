import Layout from '@/layout';
export default {
  path: '/drugManage',
  component: Layout,
  name: 'DrugManage',
  icon: 'el-icon-sold-out',
  meta: {
    title: '购药管理',
    // icon: 'guide',
    noCache: true,
    roles: ['admin'] // you can set roles in root nav
  },
  redirect: '/drugManage/goodsList',
  children: [
    {
      path: '/drugManage/goodsList',
      component: () => import('@/views/drugManage/goodsManage/index'),
      name: 'GoodsList',
      meta: {
        title: '商品列表',
        noCache: true,
        keepAlive: true,
        keepComponentPages: ['GoodsDetails']
      }
    },
    {
      path: '/drugManage/goods-details/:id/:isView',
      component: () => import('@/views/drugManage/goodsManage/goodsDetails'),
      name: 'GoodsDetails',
      meta: {
        noCache: false,
        title: '商品详情',
        parentTitle: '商品列表',
        path: '/drugManage/goodsList'
      }
    },
    {
        path: '/drugManage/goods-edit/:id/:isView',
        component: () => import('@/views/drugManage/goodsManage/goodsDetails'),
        name: 'GoodsEdit',
        meta: {
          noCache: false,
          title: '商品编辑',
          parentTitle: '商品列表',
          path: '/drugManage/goodsList'
        }
      },
    {
      path: '/drugManage/orderList',
      component: () => import('@/views/drugManage/orderManage/index'),
      name: 'OrderList',
      meta: {
        title: '订单列表',
        noCache: true,
        keepAlive: true,
        keepComponentPages: ['OrderDetails']
      }
    },
    {
      path: '/drugManage/orderDetails/:id',
      component: () => import('@/views/drugManage/orderManage/orderTabs'),
      name: 'OrderDetails',
      meta: {
        noCache: true,
        title: '订单详情',
        parentTitle: '订单列表',
        path: '/drugManage/orderList'
      }
    },
    {
      path: '/drugManage/strategyManage',
      component: () => import('@/views/drugManage/strategyManage/index'),
      name: 'StrategyManage',
      meta: {
        title: '购买策略',
        noCache: true
      }
    },
    {
      path: '/drugManage/applicationSettings',
      component: () => import('@/views/drugManage/applicationSettings/index'),
      name: 'ApplicationSettings',
      meta: {
        title: '应用设置',
        noCache: true
      }
    },
    {
      path: '/drugManage/applicationSettings/create/:id/:type/:combine',
      component: () =>
        import('@/views/drugManage/applicationSettings/createServiceType'),
      name: 'CreateServiceType',
      meta: {
        noCache: false,
        keepAlive: true,
        title: '服务类型',
        parentTitle: '应用设置',
        path: '/drugManage/applicationSettings'
      }
    },
    {
      path: '/drugManage/applicationSettings/addDrug',
      component: () => import('@/views/drugManage/applicationSettings/addDrug'),
      name: 'AddDrug',
      meta: {
        noCache: true,
        title: '添加药品',
        parentTitle: '服务类型',
        path: '/drugManage/applicationSettings'
      }
    },
    {
      path: '/drugManage/riskItem',
      component: () => import('@/views/drugManage/riskItem/index'),
      name: 'RiskItem',
      meta: {
        title: '风险项',
        noCache: true
      }
    }
  ]
};
