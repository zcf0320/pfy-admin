import Layout from '@/layout';
export default {
  path: '/notification',
  component: Layout,
  name: 'Notification',
  icon: 'icon_menu_message',
  meta: {
    title: '消息中心',
    noCache: true
  },
  redirect: '/notification/setting',
  children: [
    {
      path: '/notification/station',
      component: () => import('@/views/notification/station'),
      name: 'notificationStation',
      meta: {
        title: '站内消息',
        noCache: true
      }
    },
    {
      path: '/notification/message',
      component: () => import('@/views/notification/message'),
      name: 'Message',
      meta: {
        title: '短信发送',
        noCache: true
      }
    },
    {
      path: '/notification/msgTemplate',
      component: () => import('@/views/notification/message/msgTemplate'),
      name: 'MsgTemplate',
      meta: {
        title: '短信模板',
        noCache: true
      }
    },
    {
      path: '/notification/personalNews/:id/:configId',
      component: () => import('@/views/notification/personalNews'),
      name: 'PersonalNews',
      meta: {
        title: '消息通知',
        noCache: true,
        hidden: true
      }
    },
    {
      path: '/notification/stationTemplate',
      component: () => import('@/views/notification/station/stationTemplate'),
      name: 'StationTemplate',
      meta: {
        title: '消息模板',
        noCache: true
      }
    }
  ]
};
