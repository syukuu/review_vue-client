// 模拟接口

// 引入准备的数据
import Mock from 'mockjs'
import banner from './banner.json'
import floor from './floor.json'

// 设置模拟的接口
Mock.mock('/mock/banner',{code:200,data:banner})
Mock.mock('/mock/floor',{code:200,data:floor})

// 入口文件引入