import {getUserTempId} from '@/utils/userabout'
import {reqRegister,reqLogin,reqLoginOut} from '@/api';

const state = {
  userTempId: getUserTempId(),
  userInfo: JSON.parse(localStorage.getItem('USERINFO_KEY')) || {}
}
const mutations = {
  // 用户登录信息
  RECEIVELOGIN(state,userInfo){
    state.userInfo = userInfo
  },
  // 重置用户信息
  RESETUSERINFO(){
    state.userInfo = {}
  }
}

const actions = {
  // 注册
  async getRegister({commit},userInfo){
    const result = await reqRegister(userInfo)
    if(result.code === 200){
      return '成功'
    }else{
      return Promise.reject(new Error('失败'))
    }
  },
  // 登录
  async getLogin({commit},userInfo){
    const result = await reqLogin(userInfo)
    if(result.code === 200){
      localStorage.setItem('USERINFO_KEY',JSON.stringify(result.data))
      commit('RECEIVELOGIN',result.data)
    }else{
      return Promise.reject(new Error('失败'))
    }
  },
  // 退出
  async loginOut({commit}){
    const result = await reqLoginOut()
    if(result.code === 200){
      try {
        localStorage.removeItem('USERINFO_KEY')
        commit('RESETUSERINFO')
      } catch (error) {
        alert(error.message)
      }
    }
  }
  
}

const getters = {
  
}

export default {
  state,
  mutations,
  actions,
  getters
}