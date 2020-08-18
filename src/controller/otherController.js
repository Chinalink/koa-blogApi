/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-16 16:56:11
 * @LastEditTime: 2020-08-18 12:22:13
 */
const OtherService = require('../service/OtherService');
const Validation = require('../utils/validation')

class OtherController {
  static async login(ctx, next) {
    const { user, password } = ctx.request.body
    Validation.isEmpty(user, '用户名不能为空')
    Validation.isEmpty(password, '密码不能为空')
    await OtherService.SQLlogin(user, password)
  }

  static async register(ctx, next) {
    const uid = ctx.tokenData.uid
    Validation.isAdmin(uid)
    
    const data = await OtherService.SQLregister(ctx.request.body)
    return ctx.response.body = data
  }
}

module.exports = OtherController