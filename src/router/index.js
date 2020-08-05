/*
 * @Description: 路由配置
 * @Author: HuGang
 * @Date: 2020-07-16 16:46:02
 * @LastEditTime: 2020-08-05 22:41:38
 */
const fs = require('fs');
const Router = require('@koa/router')
const router = new Router({ prefix: '/apis/v1/' }) // 路由实例

// 引入所有路由
fs.readdirSync(__dirname).forEach(file => {
  if (file === 'index.js') return
  const route = require(`./${file}`)
  router.use(route.routes())
})

module.exports = router