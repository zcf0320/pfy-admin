import Layout from '@/layout';

export default {
  path: '/independent-application',
  component: Layout,
  name: 'independentApplication',
  meta: {
    title: '独立应用'
  },
  redirect: '/independent-application/use-records/index',
  children: [
    {
      path: '/independent-application/use-records/index',
      component: () => import('@/views/independentApp/useRecords/index'),
      name: 'useRecords',
      meta: {
        title: '使用记录',
        noCache: true
      }
    },
    {
      path: '/independent-application/use-records/detail/:id',
      component: () => import('@/views/independentApp/useRecords/detail'),
      name: 'useRecordsDetail',
      meta: {
        noCache: true,
        title: '使用详情'
      }
    },
    {
      path: '/independent-application/chineseMedicine/index',
      component: () => import('@/views/independentApp/chineseMedicine/index'),
      name: 'ChineseMedicine',
      meta: {
        title: '中医档案',
        noCache: true
      }
    },
    {
      path: '/independent-application/chineseMedicine/detail/:dossierId',
      component: () => import('@/views/independentApp/chineseMedicine/detail'),
      name: 'DetailMaterial',
      meta: {
        title: '病历详情',
        noCache: true
      }
    },
    {
      path: '/independent-application/inquiryManage/inquiryRecord',
      component: () => import('@/views/independentApp/aiConsultation/index'),
      name: 'InquiryRecordFe',
      meta: {
        title: 'AI问诊',
        noCache: true
      }
    },
    {
      path: '/independent-application/inquiryManage/inquiryRecord/detail/:id',
      component: () =>
        import('@/views/independentApp/aiConsultation/recordDetails'),
      name: 'RecordDetailsFe',
      meta: {
        noCache: true,
        title: 'AI问诊详情'
      }
    },
    {
      path: '/independent-application/skin-test-records/index',
      name: 'SkinTestRecords',
      component: () => import('@/views/independentApp/skin-test/index'),
      meta: {
        noCache: true
      }
    },
    {
      path: '/independent-application/skin-test-records/detail/:id',
      name: 'SkinTestRecordsDetail',
      component: () => import('@/views/independentApp/skin-test/detail')
    },
    {
      path: '/independent-application/app-channel-manage/index',
      name: 'AppChannelManage',
      component: () => import('@/views/independentApp/ChannelManage/index'),
      meta: {
        noCache: true
      }
    },
    {
      path: '/independent-application/manual-consultation',
      component: () =>
        import('@/views/independentApp/ManualConsultation/index'),
      name: 'AppManualConsultation',
      meta: {
        title: '人工问诊',
        noCache: true
      }
    },
    {
      path: '/independent-application/manual-consultation/detail/:id',
      component: () =>
        import('@/views/independentApp/ManualConsultation/detail'),
      name: 'AppManualConsultationDetail',
      meta: {
        title: '人工问诊详情',
        noCache: true
      }
    },
    {
      path: '/independent-application/im',
      component: () =>
        import('@/views/independentApp/ManualConsultation/im/index'),
      name: 'IndependentApplicationIm',
      meta: {
        title: '独立应用聊天工具',
        noCache: true
      }
    },
    {
      path: '/independent-application/telephone-consultation',
      component: () =>
        import('@/views/independentApp/TelephoneConsultation/index'),
      name: 'AppTelephoneConsultation',
      meta: {
        title: '电话问诊',
        noCache: true
      }
    },
    {
      path: '/independent-application/telephone-consultation/detail/:id',
      component: () =>
        import('@/views/independentApp/TelephoneConsultation/detail'),
      name: 'AppTelephoneConsultationDetail',
      meta: {
        noCache: true,
        title: '电话问诊记录详情'
      }
    },
    {
      path: '/independent-application/medication-reminder/index',
      component: () =>
        import('@/views/independentApp/medicationReminder/index'),
      name: 'MedicationReminder',
      meta: {
        noCache: true,
        title: '使用记录'
      }
    },
    {
      path: '/independent-application/medication-reminder/detail/:id',
      component: () =>
        import('@/views/independentApp/medicationReminder/detail'),
      name: 'MedicationReminderDetail',
      meta: {
        noCache: true,
        title: '使用详情'
      }
    },
    {
      path: '/independent-application/sleep-administration/index',
      component: () =>
        import('@/views/independentApp/sleepAdministration/index'),
      name: 'SleepAdministration',
      meta: {
        noCache: true,
        title: 'CBTI睡眠管理'
      }
    },
    {
      path: '/independent-application/sleep-administration/detail/:id',
      component: () =>
        import('@/views/independentApp/sleepAdministration/detail'),
      name: 'SleepDetail',
      meta: {
        noCache: true,
        title: '睡眠管理详情'
      }
    },
    {
      path: '/independent-application/teenagers-data',
      component: () => import('@/views/independentApp/teenagersData/index'),
      name: 'TeenagersData',
      meta: {
        noCache: true,
        title: '青少年健康档案'
      }
    },
    {
      path: '/independent-application/youth-health-record/index',
      component: () => import('@/views/independentApp/YouthHealthRecord/index'),
      name: 'YouthHealthRecord',
      meta: {
        noCache: true,
        title: '青少年健康档案'
      }
    },
    {
      path: '/independent-application/youth-health-record/detail/:id',
      component: () =>
        import('@/views/independentApp/YouthHealthRecord/detail'),
      name: 'YouthHealthRecordDetail',
      meta: {
        noCache: true,
        title: '学生详情'
      }
    },
    {
      path: '/independent-application/diabetes/index',
      component: () => import('@/views/independentApp/diabetes/index'),
      name: 'DiabetesList',
      meta: {
        noCache: true,
        title: '糖尿病管理平台'
      }
    },
    {
      path: '/independent-application/diabetes/detail/:id',
      component: () => import('@/views/independentApp/diabetes/detail'),
      name: 'DiabetesDetail',
      meta: {
        noCache: true,
        title: '糖尿病管理平台'
      }
    },
    {
        path: '/independent-application/thyroid/index',
        component: () => import('@/views/independentApp/thyroidManage/index'),
        name: 'ThyroidManage'
      },
      {
        path: '/independent-application/thyroid/detail/:id',
        component: () => import('@/views/independentApp/thyroidManage/detail'),
        name: 'ThyroidDetail'
      }
  ]
};
