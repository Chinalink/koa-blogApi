/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-28 11:21:33
 * @LastEditTime: 2021-04-07 14:38:25
 */
const { DataTypes } = require('sequelize');
const sequelize = require('../core/db');

const ArticleTag = sequelize.define('ArticleTag', {
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