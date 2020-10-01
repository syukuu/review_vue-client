import {reqGoodsList} from '@/api'

const state = {
    goodsList : {}
}
const mutations = {
    RECIVEGOODSLIST(state,goodsList){
        state.goodsList = goodsList
    }
}
const actions = {
  async getGoodsList({commit},searchInfo){
      const result = await reqGoodsList(searchInfo)
      if(result.code === 200){
          commit('RECIVEGOODSLIST',result.data)
      }
  }
}
const getters = {
    goodsInfo(state){
        return state.goodsList || []
    },
    goodsList(state){
        return state.goodsList.goodsList || []
    },
    attrsList(state){
        return state.goodsList.attrsList || []
    },
    trademarkList(state){
        return state.goodsList.trademarkList || []
    }

}
export default{
    state,
    mutations,
    actions,
    getters,
}