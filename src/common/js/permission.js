import router from '@/router'
import store from '@/store/index'
import model from '@/api/common'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { asyncRoutes, fixedRouter } from '@/router'
import { getFunctionIdList, integrationRoute } from '@/utils/addRoutes'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login']

function getToken() {
  let user = sessionStorage.getItem('user')
  if (user) {
    return JSON.parse(user).usertoke
  } else {
    return ''
  }
}

router.beforeEach((to, from, next) => {
  let routeLists = store.getters.asyncRoutes
  NProgress.start()
  if (getToken()) {
    if (to.path !== '/login') {
      routeLists.length ? next() : gotoRouter(to, next)
    } else {
      next('/')
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach(()=>{
  NProgress.done()
})


async function gotoRouter(to, next) {
  let routerLists = asyncRoutes
  store.dispatch('permission/generateRoutes', routerLists.concat(fixedRouter)).then(() => {
    router.addRoutes(routerLists)
    next({ ...to, replace: true })
    NProgress.done()
  })
}