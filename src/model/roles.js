/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-08-07 13:13:06
 * @LastEditTime: 2020-08-07 15:18:42
 */
const moment = require('moment');
const { DataTypes } = require('sequelize');
const sequelize = require('../database/dbConn');

const Roles = sequelize.define('roles', {
  id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true, // 主键
    autoIncrement: true,
    field: 'roles_id'
  },
  name: {
    type: DataTypes.STRING(50),
    field: 'roles_name'
  },
  createdAt: { // 创建时间
    type: DataTypes.DATE,
    field: 'created_at',
    get() {
      const time = this.getDataValue('updatedAt')
      return moment(time).format('YYYY-MM-DD HH:mm')
    }
  },
  updatedAt: {
    type: DataTypes.DATE, // 更新时间
    field: 'updated_at',
    get() {
      const time = this.getDataValue('updatedAt')
      return moment(time).format('YYYY-MM-DD HH:mm')
    }
  }
},{
  tableName: 'roles',
  timestamps: true
})

module.exports = Roles