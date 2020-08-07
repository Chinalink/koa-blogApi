/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-31 16:14:36
 * @LastEditTime: 2020-08-07 13:41:40
 */ 
const fs = require('fs');
let Model = {}
fs.readdirSync(__dirname).forEach(file => {
  if (file === 'index.js') return
  const name = file.replace('.js', '')
  const fileName = name.replace(file[0], file[0].toUpperCase())
  Model[fileName] = require(`./${file}`)
})

// 建立关联关系
Model.Article.belongsToMany(Model.Sort, {
  through: Model.ArticleSort,
  foreignKey: 'articleId',
  otherKey: 'sortId' 
})

Model.Sort.belongsToMany(Model.Article, {
  through: Model.ArticleSort,
  foreignKey: 'sortId',
  otherKey: 'articleId'
})

Model.User.belongsToMany(Model.Roles, {
  through: Model.UserRoles,
  foreignKey: 'userId',
  otherKey: 'rolesId'
})

Model.Roles.belongsToMany(Model.User, {
  through: Model.UserRoles,
  foreignKey: 'rolesId',
  otherKey: 'userId'
})

module.exports = Model