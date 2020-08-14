/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-16 16:56:11
 * @LastEditTime: 2020-08-14 17:05:20
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
    const { pageSize = 20, current = 1, nickName = '', email = '', roles = '' } = ctx.request.query

    const query = {
      pageSize: +pageSize,
      current: +current,
      nickName,
      email,
      roles
    }

    const data = await UserService.SQLqueryUsers(query)
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

  // 删除用户信息
  static async userDelete(ctx, next) {
    const uid = ctx.tokenData.uid
    if (!ctx.params.id) {
      throw new global.ParameterException('请求参数错误')
    }
    Validation.isAdmin(uid)
    const data = await UserService.SQLqueryUserDelete(ctx.params.id)
    return ctx.response.body = data
  }
}

module.exports = UserController