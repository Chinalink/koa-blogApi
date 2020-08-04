/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-16 16:52:29
 * @LastEditTime: 2020-08-04 22:26:08
 */ 
const Router = require('@koa/router')
const controller = require('../controller/userController')

const router = new Router()
router.post('/login', controller.checkLogin)
router.post('/register', controller.registerUser)

module.exports = router