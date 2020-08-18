/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-28 11:21:33
 * @LastEditTime: 2020-08-13 22:46:14
 */
const { DataTypes } = require('sequelize');
const sequelize = require('../base/dbConn');

const ArticleTag = sequelize.define('articleTag', {
  articleId: {                          // 文章ID
    type: DataTypes.INTEGER,
    field: 'article_id'
  },
  tagId: {                             // 文章标签ID
    type: DataTypes.INTEGER(11),
    field: 'tag_id'
  }
}, {
  tableName: 'article_tag',
  timestamps: false
})

module.exports = ArticleTag