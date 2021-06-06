/*
 * @Description: 分类表
 * @Author: HuGang
 * @Date: 2020-08-21 00:18:27
 * @LastEditTime: 2021-04-07 20:55:43
 */
const dayjs = require('dayjs');
const { DataTypes } = require('sequelize');
const sequelize = require('../core/db');

const Picture = sequelize.define('Picture', {
  id: {
    type: DataTypes.INTEGER(11),
    field: 'pic_id',
    primaryKey: true,                   // 主键
    autoIncrement: true,                // 自动递增
  },
  name: {
    type: DataTypes.STRING(255),
    field: 'pic_name'
  },
  hash: {                               // 七牛hash
    type: DataTypes.STRING(255),
    field: 'pic_hash'
  },
  type: {                               // 图片类型： 1.头像 2.文章图片
    type: DataTypes.INTEGER(11),
    field: 'pic_type'
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
  tableName: 'picture',
  timestamps: true
})

module.exports = Picture