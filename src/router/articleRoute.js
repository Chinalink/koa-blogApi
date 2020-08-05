/*
 * @Description: 文章相关Api
 * @Author: HuGang
 * @Date: 2020-07-25 13:34:43
 * @LastEditTime: 2020-08-05 18:17:00
 */ 

const Router = require('@koa/router')
const Authorize = require('../middlewares/authorize');
const ArticleController = require('../controller/ArticleController');

const router = new Router({ prefix: "/article" })


router
  .get('/post', ArticleController.queryArticleList) // 获取文章列表
  .post('/post', ArticleController.createArticle) // 创建文章
  .put('/post:id', ArticleController.updateArticle) // 更新文章
  .get('/sort', ArticleController.querySortList) // 获取分类列表
  .post('/sort', Authorize, ArticleController.createSort) // 创建分类
  .put('/sort:id', ArticleController.updateSort) // 更新分类
  .delete('/sort:id', ArticleController.deleteSort) // 删除分类

module.exports = router