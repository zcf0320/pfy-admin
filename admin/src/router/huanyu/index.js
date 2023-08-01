import Layout from '@/layout';
import accountManage from './accountManage';
import approval from './approval';
import claimManage from './claimManage';
import dashboard from './dashboard';
import dataCenter from './dataCenter';
import dataDictionary from './dataDictionary';
import drugManage from './drugManage';
import financialManage from './financialManage';
import healthColumn from './healthColumn';
import independentApp from './independentApp';
import inquiryManage from './inquiryManage';
import insuranceManage from './insuranceManage';
import insuranceRecord from './insuranceRecord';
import legalAffairsCenter from './legalAffairsCenter';
import marketingTool from './marketingTool';
import notification from './notification';
import operationManage from './operationManage';
import physicianService from './physicianService';
import policyManage from './policyManage';
import projectManage from './projectManage';
import serviceCenter from './serviceCenter';
import supplyManage from './supplyManage';
import toolLibrary from './toolLibrary';
import logCenter from './logCenter';
const huanyuRouter = [
  {
    path: '/',
    component: Layout,
    name: 'Home',
    meta: {
      title: '寰宇关爱',
      // icon: 'guide',
      noCache: true,
      roles: ['admin'] // you can set roles in root nav
    },
    redirect: '/workflow',
    children: [
      {
        path: '/workflow',
        component: () => import('@/views/workflow'),
        name: 'Workflow',
        meta: {
          title: '首页',
          noCache: true
        },
        hidden: false
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    name: 'noPermissionMain',
    meta: {
      title: '寰宇关爱',
      // icon: 'guide',
      noCache: true,
      roles: ['admin'] // you can set roles in root nav
    },
    redirect: '/noPermission',
    children: [
      {
        path: '/noPermission',
        component: () => import('@/views/noPermission'),
        name: 'noPermission',
        meta: {
          title: '暂无权限',
          noCache: true
        },
        hidden: false
      }
    ]
  },
  dashboard,
  supplyManage,
  physicianService,
  insuranceManage,
  operationManage,
  financialManage,
  projectManage,
  accountManage,
  insuranceRecord,
  policyManage,
  healthColumn,
  drugManage,
  inquiryManage,
  claimManage,
  toolLibrary,
  serviceCenter,
  dataCenter,
  dataDictionary,
  marketingTool,
  approval,
  notification,
  {
    path: '/ytPanel',
    component: () => import('@/views/ytPanel'),
    name: 'YtPanel',
    icon: 'icon_menu_message',
    meta: {
      title: '亚太保险产品数据看板',
      noCache: true
    }
  },
  {
    path: '/zhPanel',
    component: () => import('@/views/zhPanel'),
    name: 'ZhPanel',
    icon: 'icon_menu_message',
    meta: {
      title: '中韩保险产品数据看板',
      noCache: true
    }
  },
  {
    path: '/calendar',
    component: Layout,
    name: 'calendar',
    icon: 'icon_menu_cala',
    meta: {
      title: '工作日历',
      noCache: true
    },
    redirect: '/calendar/index',
    children: [
      {
        path: '/calendar/index',
        component: () => import('@/views/calendar/index'),
        name: 'Calendar',
        meta: {
          title: '日历',
          noCache: true
        }
      }
    ]
  },
  legalAffairsCenter,
  independentApp,
  logCenter
];
export default huanyuRouter;
