/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-16 16:52:29
 * @LastEditTime: 2020-08-08 23:46:49
 */ 
const Router = require('@koa/router')
const Authorize = require('../middlewares/authorize');
const UserController = require('../controller/userController')

const router = new Router()


router
  .get('/user/roles', Authorize, UserController.userRolesList) // 获取角色列表
  // .delete('/:id', UserController.userLogin)
  // .put('/:id', UserController.userLogin)
  .get('/user/list', UserController.userList)

module.exports = router