/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-16 16:52:29
 * @LastEditTime: 2020-08-09 18:30:44
 */ 
const Router = require('@koa/router')
const Authorize = require('../middlewares/authorize');
const UserController = require('../controller/userController')

const router = new Router()


router
  .get('/user/roles', Authorize, UserController.userRolesList) // 获取角色列表
  .get('/user/list', UserController.userList)
  .get('/user/:id', UserController.userInfo)
   // .delete('/:id', UserController.userLogin)
  .put('/user/:id', Authorize, UserController.userUpdate)

module.exports = router