import {addCartOrUpdate,reqShopCartList,reqUpdateIsChecked,reqDeleteCart} from '@/api'

const state = {
  shopCartList : []

}
const mutations = {
  RECEIVESHOPCARTLIST(state,shopCartList){
    state.shopCartList = shopCartList
  },
}

const actions = {
  // 修改或更新购物车数据
  async getAddCartOrUpdate({commit},{skuId,skuNum}){
      const result = await addCartOrUpdate(skuId,skuNum)
      if(result.code === 200){
          return alert('成功')
      }else{
          return Promise.reject()
      }
  },
  // 获取购物车信息的数据
  async getShopCartList({commit}){
    const result = await reqShopCartList()
    if(result.code === 200){
      commit('RECEIVESHOPCARTLIST',result.data)
    }
  },
  // 更新选中状态--单个
  async updateIsChecked({commit},{skuId,isChecked}){
    const result = await reqUpdateIsChecked(skuId,isChecked)
    if(result.code === 200){
      return '成功'
    }else{
      return Promise.reject(new Error('失败'))
    }
  },
  // 更新选中状态--多个
  updateAllIsChecked({commit,dispatch,state},isChecked){
    let promises = []
    // 遍历购物车信息
    state.shopCartList.forEach(item => {
      // 如果是选中状态 就直接返回
      if(item.isChecked === isChecked) return
      // 每个都调用更新选中状态方法，返回promise存入数组
      let promise = dispatch('updateIsChecked',{skuId:item.skuId,isChecked:isChecked})
      promises.push(promise)
    })
    return Promise.all(promises)
  },
  // 删除购物车商品--单个
  async getDeleteCart({commit},skuId){
    const result = await reqDeleteCart(skuId)
    if(result.code === 200){
      return '删除成功'
    }else{
      return Promise.reject(new Error('失败'))
    }
  },
  // 删除购物车商品--多个
  deleteCheckedShopCar({commit,state,dispatch}){
    let promises = []
    state.shopCartList.forEach(item => {
      if(!item.isChecked) return
      let promise = dispatch('getDeleteCart',itemskuId)
      promises.push(promise)
    })
    return Promise.all(promises)
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