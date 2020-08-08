/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-16 16:59:01
 * @LastEditTime: 2020-08-09 00:36:08
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
  // 查询单个用户 
  static async SQLfindUser() {
    
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
}

module.exports = UserService