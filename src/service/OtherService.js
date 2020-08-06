/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-16 16:59:01
 * @LastEditTime: 2020-08-07 00:00:37
 */ 

 // sequelize
https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/core-concepts/getting-started.md
// var jwt = require('jsonwebtoken');
var Model = require('../module');

class OtherService {
  
  static async SQLlogin(user, password) {
    try {
      const params = { user, password }
      const oneUser = await Model.User.findOne({ where: params })
      if (oneUser.length) {
        const bodyData = new global.Success('登陆成功', oneUser[0])
        return bodyData.returnData()
      }
      throw new global.ParameterException('用户名或密码错误')
    } catch (error) {
      throw new global.ParameterException(error)
    }
  }

  static async SQLregister(user, password) {
    const params = { user, password }
    try {
      const newUser = await Model.User.create(params)
      if (newUser instanceof Model.User) {
        const bodyData = new global.Success('注册成功')
        return bodyData.returnData()
      }
    } catch (error) {
      throw new global.ParameterException(error.errors[0].message)
    }
  }
}

module.exports = OtherService