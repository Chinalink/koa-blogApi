/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-16 16:59:01
 * @LastEditTime: 2020-07-22 13:06:37
 */ 

 // sequelize
https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/core-concepts/getting-started.md

// 查询
var HttpException = require('../lib/httpException');
var UserModel = require('../module/user');

const checkUser = async (phone, password) => {
  const searchOptions = { phone }
  const oneUser = await UserModel.findAll({ where: searchOptions })
  if(oneUser.length) {
    return { code: 0, msg: "登陆成功", data: oneUser[0] }
  }
  const error = HttpException.throwError('您登录的用户不存在', 2001, 401)
  throw error
}

const createUser = async (phone, password) => {
  const searchOptions = { phone }
  const oneUser = await UserModel.findAll({ where: searchOptions })
  if (oneUser.length) {
    return { code: 2001, msg: "您注册的用户已存在", data: oneUser[0] }
  }
  const newUser = await UserModel.create({ phone, password })
  if (newUser instanceof UserModel) {
    return { code: 0, msg: "注册成功" }
  }
  return { code: 500, msg: "内部错误" }
}

module.exports = {
  checkUser,
  createUser
}