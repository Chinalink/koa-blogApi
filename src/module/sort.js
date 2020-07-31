/*
 * @Description: 分类表
 * @Author: HuGang
 * @Date: 2020-07-25 13:27:16
 * @LastEditTime: 2020-07-31 16:39:06
 */ 

const { DataTypes } = require('sequelize');
const sequelize = require('../database/dbConn');

const Sort = sequelize.define('Sort', {
  id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,                   // 主键
    autoIncrement: true,                // 自动递增
  },
  name: {                               // 分类名称
    type: DataTypes.STRING(50),
    field: 'sort_name',
  },
  alias: {                               // 分类别名
    type: DataTypes.STRING(15),
    field: 'sort_alias'
  }, 
  desc: {                               // 分类描述
    type: DataTypes.STRING(200),
    field: 'sort_desc',
    defaultValue: ''
  }, 
  num: {                                // 当前分类下文章数目
    type: DataTypes.INTEGER(11),
    field: 'sort_num',
    defaultValue: 0
  }, 
  parentId: {                           // 父分类ID
    type: DataTypes.INTEGER(11),
    field: 'sort_parent_id'
  },
  createdAt: {                          // 创建时间
    type: DataTypes.DATE,
    field: 'created_at'
  },
  updatedAt: {
    type: DataTypes.DATE,               // 更新时间
    field: 'updated_at'
  }
}, {
  tableName: 'sort',
  timestamps: true
})

module.exports = Sort