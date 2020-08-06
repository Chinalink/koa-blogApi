/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-16 16:59:01
 * @LastEditTime: 2020-08-05 23:37:56
 */ 

 // sequelize
https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/core-concepts/getting-started.md
// var jwt = require('jsonwebtoken');
var Model = require('../module');

const SQLlogin = async (user, password) => {
  try {
    const params = { user, password }
    const oneUser = await Model.User.findOne({ where: params })
    if (oneUser.length) {
      return { code: 0, msg: "登陆成功", data: oneUser[0] }
    }
    throw global.ParameterException('用户名或密码错误')
  } catch (error) {
    throw global.ParameterException(error)
  }
}

const SQLregister = async (user, password) => {
  const params = { user, password }
  try {
    const newUser = await Model.User.create(params)
    if (newUser instanceof Model.User) {
      throw new global.Success('注册成功')
    }
  } catch (error) {
    throw new global.ParameterException(error.errors[0].message)
  }
}

module.exports = {
  SQLlogin,
  SQLregister
}