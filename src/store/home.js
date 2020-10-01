import {reqCategoryList,reqBannerList,reqFloorList} from '@/api'

const state = {
    categoryList:[],
    bannerList:[],
    floorList:[]
}
const mutations = {
    RECIVECATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    RECIVEBANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    RECIVEFLOORLIST(state,floorList){
        state.floorList = floorList
    },
}
const actions = {
    // async getCategoryList({commit}){
    //     const result = await reqCategoryList()
    //     if(result.code === 200){
    //         commit('RECIVECATEGORYLIST',result.data)
    //     }
    // }
    getBannerList({commit}){
        reqCategoryList().then(response => { 
            commit('RECIVECATEGORYLIST',response.data)
        })
    },
    getCategoryList({commit}){
        reqBannerList().then(response => { 
            commit('RECIVEBANNERLIST',response.data)
        })
    },
    getFloorList({commit}){
        reqFloorList().then(response => { 
            commit('RECIVEFLOORLIST',response.data)
        })
    },
   
}
const getters = {
  bannerList(state){
    return state.bannerList
  }
}

export default {
    state,
    mutations,
    actions,
    getters
}
