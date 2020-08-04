/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-16 16:56:11
 * @LastEditTime: 2020-08-05 00:12:02
 */ 
const UserService = require('../service/UserService');

const userLogin = async (ctx, next) => {
  const { user, password } = ctx.request.body
  const data = await UserService.SQLuserLogin(user, password)
  return ctx.response.body = data
} 

const userRegister = async (ctx, next) => {
  const { user, password } = ctx.request.body
  const data = await UserService.SQLuserRegister(user, password)
  return ctx.response.body = data
} 

module.exports = {
  userLogin,
  userRegister
}