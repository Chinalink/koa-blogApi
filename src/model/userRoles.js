/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-08-07 13:13:06
 * @LastEditTime: 2020-08-07 13:23:51
 */
const { DataTypes } = require('sequelize');
const sequelize = require('../database/dbConn');

const UserRoles = sequelize.define('userRoles', {
  userId: { // 文章ID
    type: DataTypes.INTEGER,
    field: 'user_id'
  },
  rolesId: { // 文章分类ID
    type: DataTypes.INTEGER(11),
    field: 'roles_id'
  }
},{
  tableName: 'user_roles',
  timestamps: true
})

module.exports = UserRoles