/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-21 17:43:13
 * @LastEditTime: 2020-07-26 17:25:31
 */ 
const user = require('../module/user');
const sort = require('../module/sort');
const post = require('../module/post')

const allModel = [
  // user,
  // sort
  post
]

allModel.forEach((item) => {
  item.sync({ force: true }) // 强制同步，先删除表，然后新建
})
