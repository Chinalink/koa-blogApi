/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-16 16:59:01
 * @LastEditTime: 2020-08-08 16:29:30
 */ 

 // sequelize
https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/core-concepts/getting-started.md
var { Op } = require("sequelize");
var Model = require('../model');

class UserService {
  static async SQLqueryRoles() {
    try {
      const rolesList = await Model.Roles.findAll({ where: { name: { [Op.ne]: '超级管理员'} }})
      return new global.Success('查询成功', rolesList).returnData()
    } catch (error) {
      throw new global.Success(error)
    }
  }

  static async SQLfindUser() {
    
  }
}

module.exports = UserService