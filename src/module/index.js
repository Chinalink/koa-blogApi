/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-31 16:14:36
 * @LastEditTime: 2020-07-31 18:03:19
 */ 

let Atricle = require('./Article');
let Sort = require('./Sort.js')
let ArticleSort = require('./ArticleSort');

Atricle.belongsToMany(Sort, { through: ArticleSort, foreignKey: 'articleId', otherKey: 'sortId' })
Sort.belongsToMany(Atricle, { through: ArticleSort, foreignKey: 'sortId', otherKey: 'articleId' })

module.exports = {
  Atricle,
  Sort
}