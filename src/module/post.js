/*
 * @Description: 文章模型
 * @Author: HuGang
 * @Date: 2020-07-22 14:37:07
 * @LastEditTime: 2020-07-26 13:34:37
 */ 

const { DataTypes } = require('sequelize');
const sequelize = require('../lib/dbConn');

const PostModel = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,            // 主键
    autoIncrement: true,         // 自动递增
  },
  post_title: DataTypes.STRING(50), // 标题
  post_excerpt: DataTypes.STRING(200), // 摘要
  post_content: DataTypes.TEXT('long'), // 正文
  post_author: DataTypes.INTEGER(11), // 对应作者 ID
  post_status: DataTypes.STRING(20), // 文章状态
  post_type: DataTypes.STRING(20), // 文章类型
  post_likeCount: DataTypes.INTEGER(11), // 点赞总数
  post_commentCount: DataTypes.INTEGER(11) // 评论总数
})

module.exports = PostModel