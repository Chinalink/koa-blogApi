/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-31 16:14:36
 * @LastEditTime: 2020-08-07 23:57:05
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

Model.Roles.hasMany(Model.User, { foreignKey: 'roles' })
Model.User.belongsTo(Model.Roles, { foreignKey: 'roles' });


module.exports = Model