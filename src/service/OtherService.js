/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-16 16:59:01
 * @LastEditTime: 2020-08-08 16:31:27
 */ 

 // sequelize
https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/core-concepts/getting-started.md
var bcrypt = require('bcrypt')
var Model = require('../model');
var Auth = require('../utils/auth')

class OtherService {
  // 登录
  static async SQLlogin(user, password) {
    try {
      const params = { user }
      const oneUser = await Model.User.findOne({ where: params })
      if (oneUser) {
        if (bcrypt.compareSync(password, oneUser.password)) {
          const token = Auth.createToken(oneUser.id, oneUser.roles)
          return new global.Success('登陆成功', { token: token }).returnData()
        } else {
          return new global.Success('用户名或密码错误').returnData()
        }
      }
      return new global.Success('用户不存在').returnData()
    } catch (error) {
      throw new global.ParameterException(error.msg)
    }
  }
  // 添加用户
  static async SQLregister(params, roles) {
    try {
      const [user, created] = await Model.User.findOrCreate({
        where: { user: params.user },
        defaults: params
      })
      if(created) {
        if (roles) {
          const role = await Model.Roles.findOne({ where: { id: roles } })
          await user.setRole(role)
          return new global.Success('注册成功').returnData()
        }
      }
      return new global.Success('用户已存在').returnData()
    } catch (error) {
      console.log(error)
      throw new global.ParameterException(error.msg)
    }
  }
}

module.exports = OtherService