/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-21 17:43:13
 * @LastEditTime: 2020-08-07 01:01:35
 */ 
// const sequelize = require('./dbConn');
// sequelize.sync({force: true})
const user = require('../module/User');
const sort = require('../module/Sort');
const article = require('../module/Article');
const articleSort = require('../module/ArticleSort')

const allModel = [
  user,
  // sort,
  // article,
  // articleSort
]

allModel.forEach((item) => {
  item.sync({ force: true }) // 强制同步，先删除表，然后新建
})