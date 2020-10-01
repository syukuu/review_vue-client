import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/router/routes'

Vue.use(VueRouter)

const rePush = VueRouter.prototype.push
const reReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function (location,onResolved,onRejected) {  
    if(onResolved === undefined && onRejected === undefined){
        return rePush.call(this,location).catch(()=>{})
    }else{
        return rePush.call(this,location,onResolved,onRejected)
    }
}
VueRouter.prototype.replace = function (location,onResolved,onRejected) {  
    if(onResolved === undefined && onRejected === undefined){
        return reReplace.call(this,location).catch(()=>{})
    }else{
        return reReplace.call(this,location,onResolved,onRejected)
    }
}

export default new VueRouter ({
 routes,
 // 滚动事件
 scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})