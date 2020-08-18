/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-21 17:08:12
 * @LastEditTime: 2020-08-18 16:10:56
 */ 
const { Sequelize } = require('sequelize');
const GlobalConfig = require('../config');

const sequelize = new Sequelize('blog', 'root', 'rootroot', GlobalConfig.DBConfig)

module.exports = sequelize