/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-31 16:14:36
 * @LastEditTime: 2020-08-05 23:10:14
 */ 

let Atricle = require('./article');
let User = require('./user')
let Sort = require('./sort.js')
let ArticleSort = require('./articleSort');

Atricle.belongsToMany(Sort, { through: ArticleSort, foreignKey: 'articleId', otherKey: 'sortId' })
Sort.belongsToMany(Atricle, { through: ArticleSort, foreignKey: 'sortId', otherKey: 'articleId' })

module.exports = {
  User,
  Atricle,
  Sort
}