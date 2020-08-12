/*
 * @Description: 其他路由
 * @Author: HuGang
 * @Date: 2020-08-05 22:33:00
 * @LastEditTime: 2020-08-12 22:55:54
 */
const Router = require('@koa/router')
const Authorize = require('../middlewares/authorize');
const OtherController = require('../controller/otherController')

const router = new Router()

router.post('/login', OtherController.login)
router.post('/register', Authorize, OtherController.register)

module.exports = router