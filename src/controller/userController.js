/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-16 16:56:11
 * @LastEditTime: 2020-08-08 23:49:16
 */ 
const UserService = require('../service/UserService');

class UserController {
  static async userRolesList(ctx, next) {
    const data = await UserService.SQLqueryRoles()
    return ctx.response.body = data
  }

  static async userList(ctx, next) {
    const data = await UserService.SQLqueryUsers()
    return ctx.response.body = data
  }
}

module.exports = UserController