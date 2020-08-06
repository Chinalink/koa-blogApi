/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-16 16:52:29
 * @LastEditTime: 2020-08-06 23:50:56
 */ 
const Router = require('@koa/router')
const UserController = require('../controller/userController')

const router = new Router({ prefix: '/user' })

// router.post('/', UserController.userLogin)
// router.delete('/:id', UserController.userLogin)
// router.put('/:id', UserController.userLogin)
// router.get('/', UserController.userLogin)

module.exports = router