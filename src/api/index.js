//封装发送请求的函数
import Ajax from '@/ajax/Ajax'
import mockAjax from '../ajax/mockAjax'

// export const getBaseCategoryList = Ajax.get('/api/product/getBaseCategoryList')
export const reqCategoryList = () => Ajax({
    url: 'product/getBaseCategoryList',
    method: 'GET'
})

// 使用接口发送请求
export const reqBannerList = () => mockAjax.get('/banner')
export const reqFloorList = () => mockAjax.get('/floor')

// 搜索商品
export const reqGoodsList = (searchInfo) => Ajax.post('/list',searchInfo)
// 商品详情
export const reqGoodsDetailInfo = (skuId) => Ajax.get(`/item/${ skuId }`)
// 添加或更新购物车数据
export const addCartOrUpdate = (skuId,skuNum) => Ajax.post(`/cart/addToCart/${ skuId }/${ skuNum }`)
// 获取购物车列表
export const reqShopCartList = () => Ajax.get('/cart/cartList')
// 修改购物车选中状态
export const reqUpdateIsChecked = (skuID,isChecked) => Ajax.get(`/cart/checkCart/${skuID}/${isChecked}`)
// 删除购物车商品
export const reqDeleteCart = (skuId) => Ajax.delete(`/cart/deleteCart/${skuId}`)
// 请求注册
export const reqRegister = (userInfo) => Ajax.post('/user/passport/register',userInfo)
// 请求登录
export const reqLogin = (userInfo) => Ajax.post('/user/passport/login',userInfo)
// 请求退出
export const reqLoginOut = () => Ajax.get('/user/passport/logout')
// 获取订单交易页信息
export const reqTradeInfo = () => Ajax.get('/order/auth/trade')
// 提交订单
export const reqSubmitOrder = (tradeNo,tradeInfo) => Ajax.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`,tradeInfo)
// 获取商品信息
export const reqOrderInfo = (orderId) => Ajax.get(`/payment/weixin/createNative/${orderId}`)
// 查看订单支付状态
export const reqOrderStatus = (orderId) => Ajax.get(`/payment/weixin/queryPayStatus/${orderId}`)
// 获取我的订单
export const getMyOrder = (page,limit) => Ajax.get(`/order/auth/${page}/${limit}`)