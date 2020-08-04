/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-21 17:28:37
 * @LastEditTime: 2020-08-04 23:05:28
 */ 
const moment = require('moment');
const { DataTypes } = require('sequelize');
const sequelize = require('../database/dbConn');

const UserModel = sequelize.define('user', {
  // 在这里定义模型属性
  id: {
    type: DataTypes.INTEGER(11),
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
    }
  },
  niceName: {
    type: DataTypes.STRING(100), // 用户昵称
    field: 'user_nick_name'
  },
  avatar: {
    type: DataTypes.STRING(255), // 用户头像
    field: 'user_avatar'
  },
  phone: {
    type: DataTypes.STRING(11), // 用户手机号
    field: 'user_phone'
  },
  status: {
    type: DataTypes.INTEGER(11), // 用户状态
    field: 'user_status'
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
        msg: "密码不能为空"
      }
    }
  },
  createdAt: { // 创建时间
    type: DataTypes.DATE,
    field: 'created_at',
    get() {
      const time = this.getDataValue('updatedAt')
      return moment(time).format('YYYY-MM-DD HH:mm')
    }
  },
  updatedAt: {
    type: DataTypes.DATE, // 更新时间
    field: 'updated_at',
    get() {
      const time = this.getDataValue('updatedAt')
      return moment(time).format('YYYY-MM-DD HH:mm')
    }
  }
}, {
  tableName: 'user',
  timestamps: true
})

module.exports = UserModel