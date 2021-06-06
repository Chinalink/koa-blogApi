/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-28 11:21:33
 * @LastEditTime: 2021-04-07 14:02:40
 */ 
const { DataTypes } = require('sequelize');
const sequelize = require('../core/db');

const ArticleSort = sequelize.define('ArticleSort', {
  articleId: {                          // 文章ID
    type: DataTypes.INTEGER,
    field: 'article_id'
  },
  sortId: {                             // 文章分类ID
    type: DataTypes.INTEGER(11),
    field: 'sort_id'
  }
},{
  tableName: 'article_sort',
  timestamps: false
})

module.exports = ArticleSort