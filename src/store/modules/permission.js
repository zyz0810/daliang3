const state = {
  isGetRoutes: false, // 是否获取过路由
  asyncRoutes: [],  // 动态路由
  idLists: [], // id列表
  tabLists: [], // 面包屑，
  cachedViews: [] // 缓存页面
}

const mutations = {
  SET_ROUTE(state, isOpen) {
    state.isGetRoutes = isOpen
  },
  SET_ADDROUTES(state, routesLists) {
    state.asyncRoutes = routesLists
  },
  SET_TAB(state, tabs) {
    if (state.tabLists.some(item => item.name === tabs.name)) return
    state.tabLists.push(tabs)
  },
  DEL_ALL_TABS(state) {
    state.tabLists = []
  },
  DEL_TAB(state, tabName) {
    for (const [i, v] of state.tabLists.entries()) {
      if (v.name === tabName) {
        state.tabLists.splice(i, 1)
        break
      }
    }
  },
  ADD_ID_LIST(state, id) {
    state.idLists.push(id)
  },
  DEL_ID_LIST(state) {
    state.idLists = []
  },
  // 添加缓存页面
  ADD_CACHED_VIEW (state, view) {
    if (state.cachedViews.includes(view.name)) return
    if (!view.meta.noCache) {
      state.cachedViews.push(view.name)
    }
  },
  // 删除缓存页面
  DEL_CACHE(state, name) {
    if (!name) return
    for(let i of state.cachedViews) {
      if (i == name) {
        let index = state.cachedViews.indexOf(i)
        state.cachedViews.splice(index, 1)
        break
      }
    }
  },
  DEL_OTHERS_VISITED_VIEWS(state, view) {
    state.cachedViews = state.cachedViews.filter(v => {
      return v == "dashboard" || v === view.name
    })
    state.tabLists = state.tabLists.filter(v=>{
      return  v.meta.affix || v.name === view.name
    })
  }
}

const actions = {
  generateRoutes({ commit }, routesLists) {
    return new Promise((resolve, reject) => {
      commit('SET_ADDROUTES', routesLists)
      resolve()
    })
  },
  isGetRouteLists({ commit }, isOpen) {
    commit('SET_ROUTE', isOpen)
  },
  // 添加tabs 添加缓存页面
  setTavLists({ commit }, tabs) {
    commit('SET_TAB', tabs)
    commit('ADD_CACHED_VIEW', tabs)
  },
  // 删除tabs
  deletTabLists({ commit }, tabName) {
    return new Promise(resolve => {
      commit('DEL_TAB', tabName)
      commit('DEL_CACHE', tabName)
      resolve()
    })
  },
  // 清除所有tabs
  delAllTabs({ commit }) {
    commit('DEL_ALL_TABS')
  },
  // 添加functionId
  addFunctionId({ commit }, functionId) {
    commit('ADD_ID_LIST', functionId)
  },
  // 删除functionId
  delFunctionId({ commit }) {
    commit('DEL_ID_LIST')
  },
  // 清除其他的标签
  delOthersViews({commit}, view) {
    commit('DEL_OTHERS_VISITED_VIEWS', view)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
