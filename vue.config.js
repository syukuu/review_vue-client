module.exports = {
    // 关闭eslint语法检查
    lintOnSave: false,
    devServer:{
        proxy:{
            "/api": {
              target: "http://182.92.128.115",
              changeOrigin:true
            }
          }
    }
}
