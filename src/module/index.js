/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-31 16:14:36
 * @LastEditTime: 2020-07-31 16:56:08
 */ 

let Atricle = require('./Article');
let Sort = require('./Sort.js')
let ArticleSort = require('./ArticleSort');

Atricle.belongsToMany(Sort, { through: ArticleSort })
Sort.belongsToMany(Atricle, { through: ArticleSort })

module.exports = {
  Atricle,
  Sort
}