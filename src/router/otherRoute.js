/*
 * @Description: 其他路由
 * @Author: HuGang
 * @Date: 2020-08-05 22:33:00
 * @LastEditTime: 2020-08-21 01:18:50
 */
const Router = require('@koa/router')
const Authorize = require('../middlewares/authorize');
const OtherController = require('../controller/otherController')

const router = new Router()

router.post('/login', OtherController.login)
router.post('/register', Authorize, OtherController.register)
router.post('/upload', Authorize, OtherController.createUpload)
router.get('/picture', Authorize, OtherController.queryPictureList)

module.exports = router