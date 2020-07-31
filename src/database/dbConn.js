/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-21 17:08:12
 * @LastEditTime: 2020-07-31 14:58:10
 */ 
const { Sequelize } = require('sequelize');
const DBConfig = require('./DBConfig');

const sequelize = new Sequelize('blog', 'root', 'rootroot', DBConfig)

module.exports = sequelize