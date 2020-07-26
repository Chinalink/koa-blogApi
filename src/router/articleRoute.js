/*
 * @Description: 文章相关Api
 * @Author: HuGang
 * @Date: 2020-07-25 13:34:43
 * @LastEditTime: 2020-07-26 17:28:22
 */ 

const Router = require('@koa/router')
const postController = require('../controller/article/postController.js')
const sortController = require('../controller/article/sortController.js')

const router = new Router()

router.post('post', '/artice/post/createPost', postController.createPost)

// 文章分类
router.get('sort', '/artice/sort/querySortList', sortController.queryAllSort)
router.post('sort', '/article/sort/createSort', sortController.createSort)

module.exports = router