/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-16 16:56:11
 * @LastEditTime: 2020-07-21 19:32:54
 */ 
// constroller 用于处理用户输入
const user = require('../service/user');

const checkLogin = async (ctx, next) => {
  const { phone, password } = ctx.request.body
  const data = await user.checkUser(phone, password)
  return ctx.response.body = data
} 

const registerUser = async (ctx, next) => {
  const { phone, password } = ctx.request.body
  const data = await user.createUser(phone, password)
  return ctx.response.body = data
} 

module.exports = {
  checkLogin,
  registerUser
}