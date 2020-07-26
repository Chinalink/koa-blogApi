/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-16 16:52:29
 * @LastEditTime: 2020-07-21 19:33:12
 */ 
const Router = require('@koa/router')
const controller = require('../controller/userController')

const router = new Router()
router.post('login', '/login', controller.checkLogin)
router.post('login', '/register', controller.registerUser)

module.exports = router