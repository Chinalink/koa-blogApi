/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-16 16:56:11
 * @LastEditTime: 2020-08-09 19:27:49
 */ 
const Validation = require('../utils/validation')
const UserService = require('../service/UserService');

class UserController {
  // 查询用户角色列表
  static async userRolesList(ctx, next) {
    const data = await UserService.SQLqueryRoles()
    return ctx.response.body = data
  }

  // 查询用户列表
  static async userList(ctx, next) {
    const data = await UserService.SQLqueryUsers()
    return ctx.response.body = data
  }
  
  // 查询用户信息 
  static async userInfo(ctx, next) {
    if (!ctx.params.id) {
      throw new global.ParameterException('请求参数错误')
    }
    const params = { id: ctx.params.id }
    const data = await UserService.SQLqueryUserInfo(params)
    return ctx.response.body = data
  }

  // 更新用户信息
  static async userUpdate(ctx, next) {
    console.log(ctx.request.body)
    const uid = ctx.tokenData.uid
    if (!ctx.params.id) {
      throw new global.ParameterException('请求参数错误')
    }
    Validation.isSelf(uid, ctx.params.id)
    const { user, email } = ctx.request.body
    Validation.isEmpty(user, '用户名不能为空')
    Validation.isEmpty(email, '密码不能为空')
    
    const params = ctx.request.body
    delete params.user
    const data = await UserService.SQLqueryUserUpdate(params, ctx.params.id)
    return ctx.response.body = data
  }
}

module.exports = UserController