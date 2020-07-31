/*
 * @Description: 文章模型
 * @Author: HuGang
 * @Date: 2020-07-31 14:32:34
 * @LastEditTime: 2020-07-31 16:33:59
 */ 

const { DataTypes } = require('sequelize');
const sequelize = require('../database/dbConn');

const Article = sequelize.define('Article', {
  id: {                                 // 文章ID
    type: DataTypes.INTEGER(11),
    primaryKey: true,                   // 主键
    autoIncrement: true,                // 自动递增
  },
  title: {                              // 标题
    type: DataTypes.STRING(50),
    field: 'article_title'
  }, 
  excerpt: {                            // 文章摘要
    type: DataTypes.STRING(200),
    field: 'article_excerpt'
  },
  content: {                            // 文章内容
    type: DataTypes.TEXT('long'),
    field: 'article_content',
    defaultValue: ''
  },
  author: {                             // 作者ID
    type: DataTypes.INTEGER(11), 
    field: 'article_author'
  },
  status: {                             // 文章状态: 0:草稿、1:发布
    type: DataTypes.INTEGER(1),
    field: 'article_status'
  },
  type: {
    type: DataTypes.STRING(20),         // 文章类型
    field: 'article_type'
  },
  likeCount: {                          // 点赞总数
    type: DataTypes.INTEGER(11),
    field: 'article_like_count',
    defaultValue: 0
  },
  commentCount: {                       // 评论总数
    type: DataTypes.INTEGER(11),
    field: 'article_comment_Count',
    defaultValue: 0
  },
  createdAt: {                          // 创建时间
    type: DataTypes.DATE,
    field: 'created_at'
  },
  updatedAt: {
    type: DataTypes.DATE,               // 更新时间
    field: 'updated_at'
  }
}, {
  tableName: 'article',
  timestamps: true
})

module.exports = Article