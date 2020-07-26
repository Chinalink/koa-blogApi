/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-21 17:08:12
 * @LastEditTime: 2020-07-25 11:09:44
 */ 
const { Sequelize } = require('sequelize');
const DBConfig = require('../config/DBConfig');

const sequelize = new Sequelize('blog', 'blog', 'blogblog', DBConfig)

module.exports = sequelize