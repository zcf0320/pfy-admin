import Layout from '@/layout';
export default {
  path: '/dataDictionary',
  component: Layout,
  name: 'DataDictionary',
  meta: {
    title: '数据字典',
    noCache: true,
    roles: ['admin'] // you can set roles in root nav
  },
  redirect: '/dataDictionary/diseaseDatabase',
  children: [
    {
      path: '/dataDictionary/diseaseDatabase',
      component: () => import('@/views/dataDictionary/diseaseDatabase/index'),
      name: 'DiseaseDatabase',
      meta: {
        title: '疾病库',
        noCache: true,
        keepAlive: true,
        keepComponentPages: ['DiseaseDatabaseDetail']
      }
    },
    {
      path: '/dataDictionary/diseaseDatabase/detail',
      component: () => import('@/views/dataDictionary/diseaseDatabase/detail'),
      name: 'DiseaseDatabaseDetail',
      meta: {
        noCache: true,
        title: '疾病详情',
        parentTitle: '疾病库',
        path: '/dataDictionary/diseaseDatabase'
      }
    },
    {
      path: '/dataDictionary/diseaseDatabase/diseaseAtlas',
      component: () =>
        import('@/views/dataDictionary/diseaseDatabase/diseaseAtlas'),
      name: 'DiseaseAtlas',
      meta: {
        noCache: true,
        title: '疾病图谱',
        parentTitle: '疾病库',
        path: '/dataDictionary/diseaseDatabase'
      }
    },
    {
      path: '/dataDictionary/symptomDatabase',
      component: () => import('@/views/dataDictionary/symptomDatabase/index'),
      name: 'SymptomDatabase',
      meta: {
        title: '症状库',
        noCache: true
      }
    },
    {
      path: '/dataDictionary/basisDrugs',
      component: () => import('@/views/dataDictionary/basisDrugs/index'),
      name: 'BasisDrugs',
      meta: {
        title: '基础药品库',
        noCache: true,
        keepAlive: true,
        keepComponentPages: ['BasisDrugsDetail']
      }
    },
    {
      path: '/dataDictionary/drugMonitor',
      component: () => import('@/views/dataDictionary/drugMonitor/index'),
      name: 'DrugMonitor',
      meta: {
        title: '药价监控',
        noCache: true
      }
    },
    {
      path: '/dataDictionary/drugMonitor/drugMonitorDetail',
      component: () =>
        import('@/views/dataDictionary/drugMonitor/drugMonitorDetail/index'),
      name: 'DrugMonitorDetail',
      meta: {
        noCache: true,
        title: '详情',
        parentTitle: '药价监控',
        path: '/dataDictionary/drugMonitor'
      }
    },
    {
      path: '/dataDictionary/basisDrugs/basisDrugsDetail/:id',
      component: () =>
        import('@/views/dataDictionary/basisDrugs/basisDrugsDetail/index'),
      name: 'BasisDrugsDetail',
      meta: {
        noCache: true,
        title: '详情',
        parentTitle: '基础药品库',
        path: '/dataDictionary/basisDrugs'
      }
    },
    {
      path: '/dataDictionary/basisDrugs/batchUpdate',
      component: () => import('@/views/dataDictionary/basisDrugs/batchUpdate'),
      name: 'BatchUpdateMedicine',
      meta: {
        noCache: true,
        title: '批量更新药品',
        parentTitle: '基础药品库',
        path: '/dataDictionary/basisDrugs'
      }
    },
    {
      path: '/dataDictionary/hospitalLibrary',
      component: () => import('@/views/dataDictionary/hospitalLibrary/index'),
      name: 'HospitalLibrary',
      meta: {
        title: '医院库',
        noCache: true
      }
    },
    {
      path: '/dataDictionary/hospitalLibrary/detail/:id',
      component: () => import('@/views/dataDictionary/hospitalLibrary/detail'),
      name: 'hospitalDetail',
      meta: {
        noCache: true,
        title: '医院详情',
        parentTitle: '医院库',
        path: '/dataDictionary/hospitalLibrary'
      }
    },
    {
      path: '/dataDictionary/departmentLibrary',
      component: () => import('@/views/dataDictionary/departmentLibrary/index'),
      name: 'DepartmentLibrary',
      meta: {
        title: '科室库',
        noCache: true
      }
    },
    {
      path: '/dataDictionary/inspectionLibrary',
      component: () => import('@/views/dataDictionary/inspectionLibrary/index'),
      name: 'InspectionLibrary',
      meta: {
        title: '检验检查库',
        noCache: true
      }
    },
    {
      path: '/dataDictionary/inspectionLibrary/detail/:id',
      component: () =>
        import('@/views/dataDictionary/inspectionLibrary/detail'),
      name: 'InspectionDetail',
      meta: {
        parentTitle: '检验检查库',
        path: '/dataDictionary/inspectionLibrary',
        title: '详情',
        noCache: true
      }
    },
    {
      path: '/dataDictionary/surgicalLibrary',
      component: () => import('@/views/dataDictionary/surgicalLibrary/index'),
      name: 'SurgicalLibrary',
      meta: {
        title: '手术库',
        noCache: true
      }
    },
    {
      path: '/dataDictionary/insuranceDrug',
      component: () => import('@/views/dataDictionary/insuranceDrug/index'),
      name: 'InsuranceDrug',
      meta: {
        title: '医保药品目录',
        noCache: true
      }
    },
    {
      path: '/dataDictionary/insuranceDrug/detail',
      component: () => import('@/views/dataDictionary/insuranceDrug/detail'),
      name: 'InsuranceDrugDetail',
      meta: {
        parentTitle: '医保药品目录',
        path: '/dataDictionary/insuranceDrug',
        title: '详情',
        noCache: true
      }
    },
    {
      path: '/dataDictionary/foodLibrary',
      component: () => import('@/views/dataDictionary/foodLibrary/index'),
      name: 'FoodLibrary',
      meta: {
        title: '食物库',
        noCache: true
      }
    },
    {
      path: '/dataDictionary/sportLibrary',
      component: () => import('@/views/dataDictionary/sportLibrary/index'),
      name: 'SportLibrary',
      meta: {
        title: '运动库',
        noCache: true
      }
    },
    {
      path: '/dataDictionary/insurance-product-library',
      component: () => import('@/views/dataDictionary/insuranceLibrary/index'),
      name: 'InsuranceProductLibrary',
      meta: {
        title: '保险库'
      }
    },
    {
      path: '/dataDictionary/insurance-product-library/content-edit/:id',
      component: () => import('@/views/dataDictionary/insuranceLibrary/detail'),
      name: 'InsuranceProductLibraryEdit',
      meta: {
        title: '保险库编辑'
      }
    },
    {
      path: '/dataDictionary/insurance-product-library/atlas/:id',
      component: () => import('@/views/dataDictionary/insuranceLibrary/atlas'),
      name: 'InsuranceProductLibraryAtlas',
      meta: {
        title: '保险库图谱'
      }
    }
  ]
};
