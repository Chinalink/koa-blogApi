/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-08-07 13:13:06
 * @LastEditTime: 2021-04-07 20:56:24
 */
const dayjs = require('dayjs');
const { DataTypes } = require('sequelize');
const sequelize = require('../core/db');

const Roles = sequelize.define('Roles', {
  id: {
    type: DataTypes.STRING(50),
    primaryKey: true, // 主键
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
      return dayjs(time).format('YYYY-MM-DD HH:mm')
    }
  },
  updatedAt: {
    type: DataTypes.DATE, // 更新时间
    field: 'updated_at',
    get() {
      const time = this.getDataValue('updatedAt')
      return dayjs(time).format('YYYY-MM-DD HH:mm')
    }
  }
},{
  tableName: 'roles',
  timestamps: true
})

module.exports = Roles