/*
 * @Description: 分类表
 * @Author: HuGang
 * @Date: 2020-07-25 13:27:16
 * @LastEditTime: 2021-04-07 14:05:27
 */ 
const dayjs = require('dayjs');
const { DataTypes } = require('sequelize');
const sequelize = require('../core/db');

const Sort = sequelize.define('Sort', {
  id: {
    type: DataTypes.INTEGER(11),
    field: 'sort_id',
    primaryKey: true,                   // 主键
    autoIncrement: true,                // 自动递增
  },
  name: {                               // 分类名称
    type: DataTypes.STRING(50),
    field: 'sort_name',
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
  alias: {                               // 分类别名
    type: DataTypes.STRING(15),
    field: 'sort_alias'
  }, 
  desc: {                               // 分类描述
    type: DataTypes.STRING(200),
    field: 'sort_desc',
    defaultValue: ''
  }, 
  parentId: {                           // 父分类ID
    type: DataTypes.INTEGER(11),
    field: 'sort_parent_id'
  },
  createdAt: {                          // 创建时间
    type: DataTypes.DATE,
    field: 'created_at',
    get() {
      const time = this.getDataValue('updatedAt')
      return dayjs(time).format('YYYY-MM-DD HH:mm')
    }
  },
  updatedAt: {
    type: DataTypes.DATE,               // 更新时间
    field: 'updated_at',
    get() {
      const time = this.getDataValue('updatedAt')
      return dayjs(time).format('YYYY-MM-DD HH:mm')
    }
  }
}, {
  tableName: 'sort',
  timestamps: true
})

module.exports = Sort