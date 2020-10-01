import axios from 'axios'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const service = axios.create({
  // 基础路径
  baseURL: '/mock',
  // 超时限制
  timeout: 20000
})

// 请求拦截器
service.interceptors.request.use(config => {
    // 进度条开始
    Nprogress.start()
    return config
})
// 响应拦截器
service.interceptors.response.use(
    response => {
        // 进度条结束
        Nprogress.done()
        return response.data
    },
    error => {
        Nprogress.done()
        alert('请求出错' + error.message || '未知错误')
        // 中断请求
        return new Promise(()=>{})
    }
)

export default service