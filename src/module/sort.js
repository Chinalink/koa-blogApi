/*
 * @Description: 分类表
 * @Author: HuGang
 * @Date: 2020-07-25 13:27:16
 * @LastEditTime: 2020-07-25 16:39:21
 */ 

const { DataTypes } = require('sequelize');
const sequelize = require('../lib/dbConn');

const SortModel = sequelize.define('Sort', {
  id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,            // 主键
    autoIncrement: true,         // 自动递增
  },
  sort_name: DataTypes.STRING(50), // 分类名称
  sort_alias: DataTypes.STRING(15), // 分类别名
  sort_desc: DataTypes.STRING(200), // 分类描述
  sort_num: DataTypes.INTEGER(11), // 当前分类下文章数目
  sort_parentId: DataTypes.INTEGER(11) // 父分类ID
})

module.exports = SortModel