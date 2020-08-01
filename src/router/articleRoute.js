/*
 * @Description: 文章相关Api
 * @Author: HuGang
 * @Date: 2020-07-25 13:34:43
 * @LastEditTime: 2020-08-01 19:23:32
 */ 

const Router = require('@koa/router')
const ArticleController = require('../controller/ArticleController');

const router = new Router()

// 文章CURD
router.get('post', '/article/post/queryArticleList', ArticleController.queryArticleList) // 所有文章
router.post('post', '/article/post/createPost', ArticleController.createArticle) // 创建文章

// 文章分类CURD
router.get('sort', '/article/sort/querySortList', ArticleController.querySortList) // 所有分类
router.post('sort', '/article/sort/createSort', ArticleController.createSort) // 创建分类
router.put('sort', '/article/sort/updateSort', ArticleController.updateSort) // 更新分类
router.delete('sort', '/article/sort/deleteSort', ArticleController.deleteSort) // 删除分类

module.exports = router