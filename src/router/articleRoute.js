/*
 * @Description: 文章相关Api
 * @Author: HuGang
 * @Date: 2020-07-25 13:34:43
 * @LastEditTime: 2020-08-23 20:08:30
 */ 

const Router = require('@koa/router')
const Authorize = require('../middlewares/authorize');
const ArticleController = require('../controller/articleController');

const router = new Router()

router
  .post('/article/post', Authorize, ArticleController.createArticle) // 创建文章
  .delete('/article/post/:id', Authorize, ArticleController.deleteArticle) // 删除文章
  .put('/article/post/:id', Authorize, ArticleController.updateArticle) // 更新文章
  .get('/article/post/detail', Authorize, ArticleController.queryArticle) // 获取文章详情
  .get('/article/post', Authorize, ArticleController.queryArticleList) // 获取文章列表
  .post('/article/sort', Authorize, ArticleController.createSort) // 创建分类
  .delete('/article/sort/:id', Authorize, ArticleController.deleteSort) // 删除分类
  .put('/article/sort/:id', Authorize, ArticleController.updateSort) // 更新分类
  .get('/article/sort', Authorize, ArticleController.querySortList) // 获取分类列表
  .post('/article/tag', Authorize, ArticleController.createTag) // 创建分类
  .delete('/article/tag/:id', Authorize, ArticleController.deleteTag) // 删除分类
  .put('/article/tag/:id', Authorize, ArticleController.updateTag) // 更新分类
  .get('/article/tag', Authorize, ArticleController.queryTagList) // 获取分类列表

module.exports = router