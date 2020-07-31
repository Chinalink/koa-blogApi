/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-21 17:28:37
 * @LastEditTime: 2020-07-31 16:55:18
 */ 
const { DataTypes } = require('sequelize');
const sequelize = require('../database/dbConn');

const UserModel = sequelize.define('User', {
  // 在这里定义模型属性
  user_id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,            // 主键
    autoIncrement: true,         // 自动递增
  },
  user_name: DataTypes.STRING(100), // 用户名
  user_password: DataTypes.STRING(100), // 密码
  user_niceName: DataTypes.STRING(100), // 用户昵称
  user_avatar: DataTypes.STRING(255), // 用户头像
  user_phone: DataTypes.STRING(11), // 用户手机号
  user_email: DataTypes.STRING(11), // 用户邮箱
  user_registered: DataTypes.BIGINT, // 注册时间
  user_status: DataTypes.INTEGER(11), // 用户状态
})

module.exports = UserModel