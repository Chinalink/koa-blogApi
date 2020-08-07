/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-16 16:59:01
 * @LastEditTime: 2020-08-07 14:23:28
 */ 

 // sequelize
https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/core-concepts/getting-started.md
var jwt = require('jsonwebtoken');
var model = require('../model');

const SQLuserLogin = async (user, password) => {
  const params = { user, password }
  const oneUser = await model.User.findOne({ where: params })
  if(oneUser.length) {
    return { code: 0, msg: "登陆成功", data: oneUser[0] }
  }
  const error = global.ParameterException('用户名或密码错误')
  throw error
}

const SQLuserRegister = async (user, password) => {
  const params = { user, password }
  try {
    const newUser = await model.User.create(params)
    if(newUser instanceof model.User) {
      return new global.Success().returnData()
    }
  } catch (error) {
    throw new global.ParameterException(error.errors[0].message)
  }
}

module.exports = {
  SQLuserLogin,
  SQLuserRegister
}