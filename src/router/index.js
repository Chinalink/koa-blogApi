/*
 * @Description: 路由配置
 * @Author: HuGang
 * @Date: 2020-07-16 16:46:02
 * @LastEditTime: 2020-07-31 15:17:23
 */

const Router = require('@koa/router')
// 路由模块化
const user = require('./UserRoute') //用户相关接口
const article = require('./ArticleRoute') //文章相关接口

const router = new Router({prefix: "/apis" }) // 路由实例

router
  .use(user.routes())
  .use(article.routes())

module.exports = router