/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-28 11:21:33
 * @LastEditTime: 2020-07-31 16:55:48
 */ 
const { DataTypes } = require('sequelize');
const sequelize = require('../database/dbConn');

const ArticleSort = sequelize.define('ArticleSort', {
  articleId: {                          // 文章ID
    type: DataTypes.INTEGER,
    field: 'article_id'
  },
  sortId: {                             // 文章分类ID
    type: DataTypes.INTEGER(11),
    field: 'sort_id'
  },
  createdAt: {                          // 创建时间
    type: DataTypes.DATE,
    field: 'created_at'
  },
  updatedAt: {
    type: DataTypes.DATE,               // 更新时间
    field: 'updated_at'
  }
},{
  tableName: 'article_sort',
  timestamps: true
})

module.exports = ArticleSort