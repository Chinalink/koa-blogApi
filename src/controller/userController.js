/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2021-05-24 17:27:16
 * @LastEditTime: 2021-05-24 21:15:36
 */

const UserService = require('../service/UserService');

class UserController {
  // 查询用户角色列表
  static async userRolesList(ctx, next) {
    const data = await UserService.SQLqueryRoles()
    return ctx.response.body = data
  }
}