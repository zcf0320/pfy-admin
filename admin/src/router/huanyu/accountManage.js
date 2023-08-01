import Layout from '@/layout';
export default {
  path: '/accountManage',
  component: Layout,
  name: 'AccountManage',
  icon: 'el-icon-s-custom',
  meta: {
    title: '账号管理',
    // icon: 'guide',
    noCache: true,
    roles: ['admin'] // you can set roles in root nav
  },
  redirect: '/accountManage/employee',
  children: [
    {
      path: '/accountManage/employee',
      component: () => import('@/views/accountManage/employee'),
      name: 'User',
      meta: {
        title: '账号列表',
        noCache: true
      }
    },
    {
      path: '/accountManage/role',
      component: () => import('@/views/accountManage/role'),
      name: 'Role',
      meta: {
        noCache: true,
        title: '角色权限'
      }
    },
    {
      path: '/accountManage/addrole',
      component: () => import('@/views/accountManage/addRole'),
      name: 'AddRole',
      meta: {
        noCache: true,
        title: '新增角色'
      }
    },
    {
      path: '/accountManage/roledetail',
      component: () => import('@/views/accountManage/addRole'),
      name: 'RoleDetail',
      meta: {
        noCache: true,
        title: '查看角色'
      }
    },
    {
      path: '/accountManage/editrole',
      component: () => import('@/views/accountManage/addRole'),
      name: 'RoleEdit',
      meta: {
        noCache: true,
        title: '编辑角色'
      }
    }
  ]
};
