/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-16 16:59:01
 * @LastEditTime: 2020-08-07 01:21:31
 */ 

 // sequelize
https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/core-concepts/getting-started.md
var Model = require('../model');
var Auth = require('../utils/auth')

class OtherService {
  
  static async SQLlogin(user, password) {
    try {
      const params = { user, password }
      const oneUser = await Model.User.findOne({ where: params })
      console.log(oneUser.toJSON())
      if (oneUser) {
        const token = Auth.createToken(oneUser.id, oneUser.roles)
        return new global.Success('登陆成功', { token: token }).returnData()
      }
      throw new global.ParameterException('用户名或密码错误')
    } catch (error) {
      throw new global.ParameterException(error.msg)
    }
  }

  static async SQLregister(user, password) {
    const params = { user, password }
    try {
      const newUser = await Model.User.create(params)
      if (newUser instanceof Model.User) {
        return bodyData = new global.Success('注册成功').returnData()
      }
    } catch (error) {
      throw new global.ParameterException(error.errors[0].message)
    }
  }
}

module.exports = OtherService