/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-16 16:59:01
 * @LastEditTime: 2020-08-19 00:46:33
 */ 

 // sequelize
https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/core-concepts/getting-started.md
var bcrypt = require('bcrypt')
var Model = require('../model');
var Auth = require('../utils/auth')

class OtherService {
  // 登录
  static async SQLlogin(user, password) {
    const params = { user }
    const oneUser = await Model.User.findOne({ where: params })
    if (oneUser) {
      if (bcrypt.compareSync(password, oneUser.password)) {
        const token = Auth.createToken(oneUser.id, oneUser.roles)
        throw new global.Success('登陆成功', { token: token, uid: oneUser.id, name: oneUser.nickName, avatar: oneUser.avatar })
      } else {
        throw new global.ParameterException('用户名或密码错误')
      }
    }
    throw new global.ParameterException('用户不存在')
  }
  // 注册
  static async SQLregister(params) {
    try {
      const [user, created] = await Model.User.findOrCreate({
        where: { user: params.user },
        defaults: params
      })
      if (created) {
        const userRoles = params.role
        const role = await Model.Roles.findOne({ where: { id: userRoles } })
        await user.setRole(role)
        return new global.Success('注册成功').returnData()
      }
      return new global.ParameterException('用户已存在').returnData()
    } catch (error) {
      throw new global.ParameterException(error.errors[0].message)
    }
  }
}

module.exports = OtherService