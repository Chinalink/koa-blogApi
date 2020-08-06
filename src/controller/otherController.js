/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-16 16:56:11
 * @LastEditTime: 2020-08-05 23:29:34
 */
const OtherService = require('../service/OtherService');
const Validation = require('../utils/validation')

const login = async (ctx, next) => {
  const { user, password } = ctx.request.body
  Validation.isEmpty(user, '用户名不能为空')
  Validation.isEmpty(password, '密码不能为空')
  const data = await OtherService.SQLlogin(user, password)
  return ctx.response.body = data
}

const register = async (ctx, next) => {
  const { user, password } = ctx.request.body
  Validation.isEmpty(user, '用户名不能为空')
  Validation.isEmpty(password, '密码不能为空')
  const data = await OtherService.SQLregister(user, password)
  return ctx.response.body = data
}

module.exports = {
  login,
  register
}