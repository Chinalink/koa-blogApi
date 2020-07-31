/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-21 17:43:13
 * @LastEditTime: 2020-07-30 14:49:22
 */ 
// const sequelize = require('./dbConn');
// sequelize.sync({force: true})
const user = require('../module/user');
const sort = require('../module/sort');
const post = require('../module/post');
const set_post_sort = require('../module/set_post_sort')

const allModel = [
  user,
  sort,
  post,
  set_post_sort
]

allModel.forEach((item) => {
  item.sync({ force: true }) // 强制同步，先删除表，然后新建
})