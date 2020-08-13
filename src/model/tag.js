/*
 * @Description: 分类表
 * @Author: HuGang
 * @Date: 2020-07-25 13:27:16
 * @LastEditTime: 2020-08-13 22:43:37
 */
const moment = require('moment');
const { DataTypes } = require('sequelize');
const sequelize = require('../database/dbConn');

const Tag = sequelize.define('tag', {
  id: {
    type: DataTypes.INTEGER(11),
    field: 'tag_Id',
    primaryKey: true,                   // 主键
    autoIncrement: true,                // 自动递增
  },
  name: {                               // 标签名称
    type: DataTypes.STRING(50),
    field: 'tag_name',
    allowNull: false,
    validate: {
      notNull: {
        msg: "参数不合法"
      },
      notEmpty: {
        msg: "分类名称不能为空"
      }
    }
  },
  alias: {                               // 标签别名
    type: DataTypes.STRING(15),
    field: 'tag_alias'
  },
  createdAt: {                          // 创建时间
    type: DataTypes.DATE,
    field: 'created_at',
    get() {
      const time = this.getDataValue('updatedAt')
      return moment(time).format('YYYY-MM-DD HH:mm')
    }
  },
  updatedAt: {
    type: DataTypes.DATE,               // 更新时间
    field: 'updated_at',
    get() {
      const time = this.getDataValue('updatedAt')
      return moment(time).format('YYYY-MM-DD HH:mm')
    }
  }
}, {
  tableName: 'tag',
  timestamps: true
})

module.exports = Tag