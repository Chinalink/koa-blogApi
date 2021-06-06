/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2021-04-07 11:02:49
 * @LastEditTime: 2021-05-24 21:30:15
 */
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt') // 加密算法工具
const sequelize = require('../core/db');
const utils = require('../utils/utils');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER(11),
    field: 'user_id',
    primaryKey: true,            // 主键
    autoIncrement: true,         // 自动递增
  },
  user: {
    type: DataTypes.STRING(100), // 用户名
    field: 'user_name',
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        msg: "参数不合法"
      },
      notEmpty: {
        msg: "用户名不能为空"
      }
    }
  },
  password: {
    type: DataTypes.STRING(100), // 密码
    field: 'user_password',
    allowNull: false,
    validate: {
      notNull: {
        msg: "参数不合法"
      },
      notEmpty: {
        msg: "密码不能为空"
      }
    },
    set(value) {
      this.setDataValue('password', bcrypt.hashSync(value, 10));
    }
  },
  nickName: {
    type: DataTypes.STRING(100), // 用户昵称
    field: 'user_nick_name',
    defaultValue: `用户${utils.randomString()}`
  },
  avatar: {
    type: DataTypes.STRING(255), // 用户头像
    field: 'user_avatar'
  },
  qq: {
    type: DataTypes.STRING(255), // qq
    field: 'user_qq'
  },
  wechat: {
    type: DataTypes.STRING(255), // 微信
    field: 'user_wechat'
  },
  github: {
    type: DataTypes.STRING(255), // github
    field: 'user_github'
  },
  email: {
    type: DataTypes.STRING(255), // 用户邮箱
    field: 'user_email',
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "Email格式不正确"
      },
      notNull: {
        msg: "参数不合法"
      },
      notEmpty: {
        msg: "Email不能为空"
      }
    }
  },
  introduce: {
    type: DataTypes.STRING(255), // 个人说明
    field: 'user_introduce',
    defaultValue: ''
  },
  roles: {
    type: DataTypes.STRING(50),
    field: 'user_role',
  },
  createdAt: { // 创建时间
    type: DataTypes.DATE,
    field: 'created_at',
    get() {
      const time = this.getDataValue('createdAt')
      return dayjs(time).format('YYYY-MM-DD HH:mm')
    }
  },
  updatedAt: {
    type: DataTypes.DATE, // 更新时间
    field: 'updated_at',
    get() {
      const time = this.getDataValue('updatedAt')
      return dayjs(time).format('YYYY-MM-DD HH:mm')
    }
  }
}, {
  tableName: 'user',
  timestamps: true
})

module.exports = User