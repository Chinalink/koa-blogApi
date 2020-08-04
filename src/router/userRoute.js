/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-16 16:52:29
 * @LastEditTime: 2020-08-05 00:11:30
 */ 
const Router = require('@koa/router')
const controller = require('../controller/userController')

const router = new Router()
router.post('/login', controller.userLogin)
router.post('/register', controller.userRegister)

module.exports = router