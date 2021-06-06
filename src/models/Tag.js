/*
 * @Description: 分类表
 * @Author: HuGang
 * @Date: 2020-07-25 13:27:16
 * @LastEditTime: 2021-04-07 20:56:32
 */
const dayjs = require('dayjs');
const { DataTypes } = require('sequelize');
const sequelize = require('../core/db');

const Tag = sequelize.define('Tag', {
  id: {
    type: DataTypes.INTEGER(11),
    field: 'tag_id',
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
  tableName: 'tag',
  timestamps: true
})

module.exports = Tag