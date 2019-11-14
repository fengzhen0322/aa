import Layout from '@/layout'
const navTest = {
  path: '/nav-test',
  component: Layout,
  name: 'NavTest',
  meta: { title: '系统设置', icon: 'el-icon-setting' },
  redirect: '/nav-test/nav1',
  children: [
    {
      path: 'nav1',
      name: 'Nav1',
      component: () => import('@/views/nav-test/nav1'),
      meta: { title: '版本管理', icon: 'el-icon-coffee' }
    },
    {
      path: 'nav1',
      name: 'Nav1',
      component: () => import('@/views/nav-test/nav1'),
      meta: { title: '角色管理', icon: 'el-icon-cherry' },
      // redirect: '/nav-test/nav2/nav2-1',
      // children: [
      //   {
      //     path: 'nav2-1',
      //     name: 'Nav2-1',
      //     component: () => import('@/views/nav-test/nav2/nav2-1'),
      //     meta: { title: '菜单2-1' }
      //   },
      //   {
      //     path: 'nav2-2',
      //     name: 'Nav2-2',
      //     component: () => import('@/views/nav-test/nav2/nav2-2'),
      //     meta: { title: '菜单2-2' },
      //     redirect: '/nav-test/nav2/nav2-2/nav2-2-1',
      //     children: [
      //       {
      //         path: 'nav2-2-1',
      //         name: 'Nav2-2-1',
      //         component: () => import('@/views/nav-test/nav2/nav2-2/nav2-2-1'),
      //         meta: { title: '菜单2-2-1', icon: 'el-icon-lollipop' }
      //       },
      //       {
      //         path: 'nav2-2-2',
      //         name: 'Nav2-2-2',
      //         component: () => import('@/views/nav-test/nav2/nav2-2/nav2-2-2'),
      //         meta: { title: '菜单2-2-2' }
      //       }
      //     ]
      //   }
      // ]
    },
    {
        path: 'nav1',
        name: 'Nav1',
        component: () => import('@/views/nav-test/nav1'),
        meta: { title: '权限管理', icon: 'el-icon-coffee' }
    }
  ]
}
export default navTest
