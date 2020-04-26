import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import layout from '@/views/layout/index'
Vue.use(Router)
export const fixedRouter = [
  {
    path: '/',
    component: layout,
    hidden: true,
    redirect: '/dashboard',
    meta: { title: '首页', icon: 'el-icon-s-home' },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/main'),
        name: 'dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/login',
    component: Login,
    name: '',
    hidden: true
  }
]

export const asyncRoutes = [
  /** ------------------物流管理 ------------------------ */
  {
    path: '/logistics',
    meta: { title: '物流管理', functionID: 106, icon: 'el-icon-s-data', type: '' },
    component: layout,
    children: [
      {
        path: 'client',
        component: () => import('@/views/public.vue'),
        meta: { title: '客户管理', functionID: 10601, icon: '', type: '' },
        children: [
          {
            path: 'driverManage',
            name: 'driverManage',
            component: () => import('@/views/logistics/driverManage/main.vue'),
            meta: { title: '物流司机管理', functionID: 1060101, icon: '', type: '' },
          },
          {
            path: 'carManage',
            name: 'carManage',
            component: () => import('@/views/logistics/carManage/index.vue'),
            meta: { title: '车辆管理', functionID: 1060101, icon: '', type: '' }
          },
          {
            path: 'logisticsAccountInfo',
            name: 'logisticsAccountInfo',
            component: () => import('@/views/logistics/logisticsAccountInfo/index.vue'),
            meta: { title: '司机账户数据信息', functionID: 1060102, icon: '', type: '' }
          },
          {
            path: 'driverUserManage',
            name: 'driverUserManage',
            component: () => import('@/views/logistics/driverUserManage/index.vue'),
            meta: { title: '发货用户管理', functionID: 1060103, icon: '', type: '' }
          },
          {
            path: 'userAccountInfo',
            name: 'userAccountInfo',
            component: () => import('@/views/logistics/userAccountInfo/index.vue'),
            meta: { title: '用户账户数据信息', functionID: 1060104, icon: '', type: '' }
          },
        ]
      },
      {
        path: 'business',
        component: () => import('@/views/public.vue'),
        meta: { title: '业务管理', functionID: 10602, icon: '', type: '' },
        children: [
          {
            path: 'logisticsBusinessManage',
            name: 'logisticsBusinessManage',
            component: () => import('@/views/logistics/logisticsBusinessManage/main.vue'),
            meta: { title: '订单业务查询', functionID: 1060201, icon: '', type: '' }
          }
        ]
      },
      {
        path: 'info',
        component: () => import('@/views/public.vue'),
        meta: { title: '消息管理', functionID: 10603, icon: '', type: '' },
        children: [
          {
            path: 'logisticsInfoMessage',
            name: 'logisticsInfoMessage',
            component: () => import('@/views/logistics/info/logisticsInfoMessage/index.vue'),
            meta: { title: '消息管理', functionID: 1060301, icon: '', type: '' }
          },
          // {
          //   path: 'logisticsInfoPush',
          //   name: 'logisticsInfoPush',
          //   component: () => import('@/views/logistics/info/logisticsInfoPush/index.vue'),
          //   meta: { title: '推送管理', functionID: 1060302, icon: '', type: '' }
          // }
        ]
      },
      {
        path: 'systemSettings',
        component: () => import('@/views/public.vue'),
        meta: { title: '系统设置管理', functionID: 10604, icon: '', type: '' },
        children: [
          {
            path: 'systemSettingsParams',
            name: 'systemSettingsParams',
            component: () => import('@/views/logistics/systemSettings/systemSettingsParams/index.vue'),
            meta: { title: '参数设置', functionID: 1060401, icon: '', type: '' }
          },
          {
            path: 'logisticsLoginLog',
            name: 'logisticsLoginLog',
            component: () => import('@/views/logistics/systemSettings/logisticsLoginLog/index.vue'),
            meta: { title: '登录日志查询', functionID: 1060402, icon: '', type: '' }
          },
          {
            path: 'logisticsOpeLog',
            name: 'logisticsOpeLog',
            component: () => import('@/views/logistics/systemSettings/logisticsOpeLog/index.vue'),
            meta: { title: '操作日志查询', functionID: 1060403, icon: '', type: '' }
          }
        ]
      },
    ]
  },
  /** ------------------权限管理 ------------------------ */
  {
    path: '/auth',
    meta: { title: '权限管理', functionID: 102, icon: 'el-icon-s-grid', type: '' },
    component: layout,
    children: [
      {
        path: 'userSetting',
        component: () => import('@/views/public.vue'),
        meta: { title: '用户设置', functionID: 10201, icon: '', type: '' },
        children: [
          {
            path: 'listUser',
            name: 'listUser',
            component: () => import('@/views/user/listUser'),
            meta: { title: '用户分页查询', functionID: 1020101, icon: '', type: '' }
          }
        ]
      },
      {
        path: 'roleSetting',
        component: () => import('@/views/public.vue'),
        name: 'roleSetting',
        meta: { title: '角色设置', functionID: 10202, icon: '', type: '' },
        children: [
          {
            path: 'listUserRole',
            name: 'listUserRole',
            component: () => import('@/views/user/listUserRole'),
            meta: { title: '角色分页查询', functionID: 1020201, icon: '', type: '' }
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/dashboard'
  }
]

const createRouter = () => new Router({
  routes: fixedRouter
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
