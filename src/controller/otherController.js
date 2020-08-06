/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-16 16:56:11
 * @LastEditTime: 2020-08-07 01:26:46
 */
const OtherService = require('../service/OtherService');
const Validation = require('../utils/validation')

class OtherController {
  static async login(ctx, next) {
    const { user, password } = ctx.request.body
    Validation.isEmpty(user, '用户名不能为空')
    Validation.isEmpty(password, '密码不能为空')
    const data = await OtherService.SQLlogin(user, password)
    return ctx.response.body = data
  }

  static async register(ctx, next) {
    const { user, password } = ctx.request.body
    Validation.isEmpty(user, '用户名不能为空')
    Validation.isEmpty(password, '密码不能为空')
    const data = await OtherService.SQLregister(user, password)
    return ctx.response.body = data
  }
}

module.exports = OtherController