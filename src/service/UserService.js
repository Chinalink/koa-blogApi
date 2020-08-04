/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-16 16:59:01
 * @LastEditTime: 2020-08-05 00:06:31
 */ 

 // sequelize
https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/core-concepts/getting-started.md

var model = require('../module');

const SQLuserLogin = async (user, password) => {
  const searchOptions = { user, password }
  const oneUser = await UserModel.findAll({ where: searchOptions })
  if(oneUser.length) {
    return { code: 0, msg: "登陆成功", data: oneUser[0] }
  }
  const error = HttpException.throwError('您登录的用户不存在', 2001, 401)
  throw error
}

const SQLuserRegister = async (user, password) => {
  const params = { user, password }
  try {
    const newUser = await model.User.create(params)
    if(newUser instanceof model.User) {
      throw new global.HttpErr.Success()
    }
  } catch (error) {
    throw new global.HttpErr.ParameterException(error.errors[0].message)
  }
}

module.exports = {
  SQLuserLogin,
  SQLuserRegister
}