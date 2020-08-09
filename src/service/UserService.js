/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-16 16:59:01
 * @LastEditTime: 2020-08-09 19:45:04
 */ 

 // sequelize
https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/core-concepts/getting-started.md
var { Op } = require("sequelize");
var Model = require('../model');

class UserService {
  // 查询角色列表
  static async SQLqueryRoles() {
    try {
      const rolesList = await Model.Roles.findAll({ where: { name: { [Op.ne]: '超级管理员'} }})
      return new global.Success('查询成功', rolesList).returnData()
    } catch (error) {
      throw new global.Success(error)
    }
  }

  // 查询用户列表
  static async SQLqueryUsers() {
    try {
      const userList = await Model.User.findAll({
        where: { nickName: { [Op.ne]: '超级管理员' } },
        attributes: { exclude: ['password', 'roles'] },
        include: [
          {
            model: Model.Roles,
            attributes: [['roles_id', 'roles'], ['roles_name', 'roleName']]
          }
        ]
        
      })
      return new global.Success('查询成功', userList).returnData()
    } catch (error) {
      throw new global.Success(error)
    }
  }

  // 查询用户信息 
  static async SQLqueryUserInfo(params) {
    if (params.id === 1) {
      throw new global.Success('用户不存在', null)
    }
    const result = await Model.User.findOne({ 
      where: params,
      attributes: { exclude: ['password'] },
    })
    if(result) {
      return new global.Success('查询成功', result).returnData()
    }
    return new global.Success('用户不存在', null).returnData()
  }

  // 更新用户信息
  static async SQLqueryUserUpdate(params, uid) {
    try {
      const result = await Model.User.update(params, {
        where: { id: uid }
      });
      if (result) {
        return new global.Success('操作成功').returnData()
      }
    } catch (error) {
      throw new global.ParameterException(error.errors[0].message)
    }
  }
}

module.exports = UserService