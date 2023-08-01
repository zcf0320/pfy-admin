import Layout from '@/layout';
export default {
  path: '/claimManagement',
  component: Layout,
  name: 'ClaimManagement',
  icon: 'el-icon-document-checked',
  meta: {
    title: '理赔管理',
    noCache: true
  },
  redirect: '/claimManagement/auditRecords',
  children: [
    {
      path: '/claimManagement/auditRecords',
      component: () => import('@/views/claimManagement/auditRecords/index'),
      name: 'auditRecords',
      meta: {
        title: '核赔记录',
        noCache: true
      }
    },
    {
      path: '/claimManagement/auditRecordsDetail/:id',
      component: () =>
        import('@/views/claimManagement/auditRecords/auditRecordsDetail'),
      name: 'AuditRecordsDetail',
      meta: {
        noCache: true,
        title: '审核详情'
      }
    },
    {
      path: '/claimManagement/treatmentInfomation/:id',
      component: () =>
        import('@/views/claimManagement/auditRecords/treatmentInformation'),
      name: 'TreatmentInformation',
      meta: {
        noCache: true,
        title: '诊疗资料结构化数据'
      }
    },
    {
      path: '/claimManagement/ocrResult',
      component: () => import('@/views/claimManagement/auditRecords/ocrResult'),
      name: 'OcrResult',
      meta: {
        noCache: true,
        title: 'OCR识别结果'
      }
    },
    {
      path: '/claimManagement/claimStatistics',
      component: () => import('@/views/claimManagement/claimStatistics/index'),
      name: 'claimStatistics',
      meta: {
        title: '核赔预警统计',
        noCache: true
      }
    }
  ]
};
