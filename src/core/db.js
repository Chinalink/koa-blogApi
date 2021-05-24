/*
 * @Description: 数据库配置文件
 * @Author: HuGang
 * @Date: 2021-05-24 16:48:25
 * @LastEditTime: 2021-05-24 16:48:42
 */

const { Sequelize } = require('sequelize'); // 数据库orm
const GlobalConfig = require('./globalConfig');

const sequelize = new Sequelize(
  GlobalConfig.DBConfig.dataBase,
  GlobalConfig.DBConfig.userName,
  GlobalConfig.DBConfig.passWord,
  GlobalConfig.DBConfig.dbConfig
)

module.exports = sequelize