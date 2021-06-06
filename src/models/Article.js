/*
 * @Description: 文章模型
 * @Author: HuGang
 * @Date: 2020-07-31 14:32:34
 * @LastEditTime: 2021-04-07 20:55:27
 */ 
const dayjs = require('dayjs');
const { DataTypes } = require('sequelize');
const sequelize = require('../core/db');

const Article = sequelize.define('Article', {
  id: {                                 // 文章ID
    type: DataTypes.INTEGER(11),
    field: 'article_id',
    primaryKey: true,                   // 主键
    autoIncrement: true,                // 自动递增
  },
  title: {                              // 标题
    type: DataTypes.STRING(50),
    field: 'article_title',
    allowNull: false,
    validate: {
      notNull: {
        msg: "参数不合法"
      },
      notEmpty: {
        msg: "标题不能为空"
      }
    }
  }, 
  excerpt: {                            // 文章摘要
    type: DataTypes.STRING(200),
    field: 'article_excerpt',
    defaultValue: ''
  },
  content: {                            // 文章内容
    type: DataTypes.TEXT,
    field: 'article_content',
    allowNull: false,
    validate: {
      notNull: {
        msg: "参数不合法"
      }
    }
  },
  author: {                             // 作者ID
    type: DataTypes.INTEGER(11), 
    field: 'article_author'
  },
  timer: {                              // 定时发布时间
    type: DataTypes.DATE,
    field: 'article_timer'
  },
  status: {                             // 文章状态: 0:草稿、1:发布
    type: DataTypes.INTEGER(1),
    field: 'article_status',
    defaultValue: 0
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
  tableName: 'article',
  timestamps: true
})

module.exports = Article