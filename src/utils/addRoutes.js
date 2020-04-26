let idLists = [] // 生成路由Id列表
import store from '@/store/index'

/**
 * 将后台路由和前端路由进行数据整合
 * @param {*} routeIdLists 后台传入的路由functionID列表
 * @param {*} asyncRoutes 前端路由列表
 */
export function integrationRoute(asyncRoutes) {
  asyncRoutes.forEach(item => {
    if (store.state.permission.idLists.includes(item.meta.functionID)){
      item.hidden = false
    } else {
      item.hidden = true
    }
    if (item.children && item.children.length) {
      integrationRoute(item.children)
    }
  })
  return asyncRoutes
}

/**
 * 获取后台路由Id值列表
 * @param {*} routesLists 后台传入的路由列表
 */
export function getFunctionIdList(routesLists) {
  routesLists.forEach(item => {
    idLists.push(item.functionID)
    store.dispatch('permission/addFunctionId', item.functionID)
    if (item.menuList && item.menuList.length) {
      getFunctionIdList(item.menuList)
    }
  })
  return idLists
}




