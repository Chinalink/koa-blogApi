/*
 * @Description: 分类表
 * @Author: HuGang
 * @Date: 2020-08-21 00:18:27
 * @LastEditTime: 2020-08-21 00:41:42
 */
const moment = require('moment');
const { DataTypes } = require('sequelize');
const sequelize = require('../base/dbConn');

const Picture = sequelize.define('picture', {
  name: {
    type: DataTypes.STRING(255),
    field: 'pic_name',
    primaryKey: true                   // 主键
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
  tableName: 'picture',
  timestamps: true
})

module.exports = Picture