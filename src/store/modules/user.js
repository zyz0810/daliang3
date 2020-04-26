import model from '@/api/common'
const state = {
  token: '', // 用户token
  userName: ''
}

const mutations = {
  SET_TOKEN (state, token) {
    state.token = token
  },
  SET_USERNAME(state, name) {
    state.token = name
  }
}

const actions = {
  login ({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      model.login(userInfo).then(res => {
        if (res.statusCode === 200) {
          commit('SET_TOKEN', res.message.UserToken)
          commit('SET_USERNAME', res.message.UserName)
          let user = {
            usertoke: res.message.UserToken,
            userName: res.message.UserName
          }
          sessionStorage.setItem('user', JSON.stringify(user))
          resolve()
        } else {
          this.$message.error('登录失败，请重试')
          reject()
        }
      }).catch(()=>{reject()})
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
