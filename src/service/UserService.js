/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-16 16:59:01
 * @LastEditTime: 2020-08-24 18:09:57
 */ 
var { Op } = require("sequelize");
const sequelize = require('../base/dbConn');
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
  static async SQLqueryUsers(query) {
    try {
      const { count, rows } = await Model.User.findAndCountAll({
        offset: (query.current - 1) * query.pageSize,
        limit: query.pageSize,
        order: [['createdAt', 'desc']],
        attributes: {
          include: [
            [sequelize.col('role.roles_id'), 'roles'],
            [sequelize.col('role.roles_name'), 'roleName'],
            [sequelize.fn('COUNT', sequelize.col('articles.article_id')), 'articleTotal']
          ],
          exclude: ['password']
        }, 
        where: { 
          [Op.and]: [
            { roles: { [Op.substring]: query.roles } },
            { nickName: { [Op.ne]: '超级管理员', [Op.substring]: query.nickName } }, 
            { email: { [Op.substring]: query.email } }
          ]
        },
        include: [
          { model: Model.Article, attributes: [], duplicating: false },
          { model: Model.Roles, attributes: [], duplicating: false }
        ],
        distinct: true,
        group: ['user.user_id']
      })
      const result = { result: rows, total: count.length }
      return new global.Success('查询成功', result).returnData()
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
  
  // 删除用户
  static async SQLqueryUserDelete(uid) {
    try {
      const result = await Model.User.destroy({ where: { id: uid } });
      if (result) {
        return new global.Success('操作成功').returnData()
      }
    } catch (error) {
      throw new global.ParameterException(error.errors[0].message)
    }
  }
}

module.exports = UserService