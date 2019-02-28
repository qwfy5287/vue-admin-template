import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
import LayoutBig from '../views/layout/LayoutBig'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index')
      }
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      },
      {
        path: 'DynamicRuleForm',
        name: 'DynamicRuleForm',
        component: () => import('@/views/form/DynamicRuleForm'),
        meta: { title: '动态验证表单', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () =>
                  import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () =>
                  import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Echarts',
  //   meta: { title: 'Echarts', icon: 'example' },
  //   children: [
  //     // {
  //     //   path: 'table',
  //     //   name: 'Table',
  //     //   component: () => import('@/views/table/index'),
  //     //   meta: { title: 'Table', icon: 'table' }
  //     // },
  //     // {
  //     //   path: 'tree',
  //     //   name: 'Tree',
  //     //   component: () => import('@/views/tree/index'),
  //     //   meta: { title: 'Tree', icon: 'tree' }
  //     // }
  //   ]
  // },

  {
    path: '/echarts-big',
    component: Layout,
    redirect: '/echarts-big/bar',
    name: 'EchartsBig',
    meta: { title: 'EchartsBig', icon: 'example' },
    children: [
      {
        path: 'big-main',
        name: 'Main',
        component: () => import('@/views/echarts-big/big-main'),
        meta: { title: 'Main', icon: 'table' }
      },
      {
        path: 'big-bar',
        name: 'Bar',
        component: () => import('@/views/echarts-big/big-bar'),
        meta: { title: 'Bar', icon: 'table' }
      },
      {
        path: 'big-column',
        name: 'Column',
        component: () => import('@/views/echarts-big/big-column'),
        meta: { title: 'Column', icon: 'table' }
      },

      {
        path: 'big-bar-shadow',
        name: 'BarShadow',
        component: () => import('@/views/echarts-big/big-bar-shadow'),
        meta: { title: 'BarShadow', icon: 'table' }
      },
      {
        path: 'big-area-fast',
        name: 'Area',
        component: () => import('@/views/echarts-big/big-area-fast'),
        meta: { title: 'Area', icon: 'table' }
      },
      {
        path: 'pie',
        name: 'Pie',
        component: () => import('@/views/echarts-big/pie'),
        meta: { title: 'Pie', icon: 'table' }
      }
      // {
      //   path: 'tree',
      //   name: 'Tree',
      //   component: () => import('@/views/tree/index'),
      //   meta: { title: 'Tree', icon: 'tree' }
      // }
    ]
  },

  // 马尾政务大屏
  {
    path: '/project-mgb',
    component: LayoutBig,
    redirect: '/project-mgb/economic/economic-main',
    name: 'ProjectMgb',
    meta: { title: 'ProjectMgb', icon: 'example' },
    children: [
      {
        path: '/economic/economic-main',
        name: 'Economic',
        component: () => import('@/views/project-mgb/economic/economic-main'),
        meta: { title: '区域经济', icon: 'table' }
      }
    ]
  },

  // 厦门航空
  {
    path: '/project-xmhk',
    component: Layout,
    redirect: '/project-xmhk/label/label-main',
    name: 'ProjectXmhk',
    meta: { title: 'ProjectXmhk', icon: 'example' },
    children: [
      {
        path: '/label/label-main',
        name: 'Label',
        component: () => import('@/views/project-xmhk/label/label-main'),
        meta: { title: '标签管理', icon: 'table' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
