/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-16 16:46:02
 * @LastEditTime: 2020-07-25 13:37:58
 */ 
const Router = require('@koa/router')
const user = require('./userRoute')
const article = require('./articleRoute')

const router = new Router({prefix: "/apis" })

router
  .use(user.routes())
  .use(article.routes())

module.exports = router