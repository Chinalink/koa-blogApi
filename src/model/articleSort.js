/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-28 11:21:33
 * @LastEditTime: 2020-08-18 22:32:06
 */ 
const { DataTypes } = require('sequelize');
const sequelize = require('../base/dbConn');

const ArticleSort = sequelize.define('articleSort', {
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