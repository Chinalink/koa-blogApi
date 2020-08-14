/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-31 16:14:36
 * @LastEditTime: 2020-08-14 15:26:00
 */ 
const fs = require('fs');
let Model = {}
fs.readdirSync(__dirname).forEach(file => {
  if (file === 'index.js') return
  const name = file.replace('.js', '')
  const fileName = name.replace(file[0], file[0].toUpperCase())
  Model[fileName] = require(`./${file}`)
})

// 文章 & 分类 多对多关联
Model.Article.belongsToMany(Model.Sort, { through: Model.ArticleSort, foreignKey: 'articleId', otherKey: 'sortId' })
Model.Sort.belongsToMany(Model.Article, { through: Model.ArticleSort, foreignKey: 'sortId', otherKey: 'articleId' })

// 文章 & 标签 多对多关联
Model.Article.belongsToMany(Model.Tag, { through: Model.ArticleTag, foreignKey: 'articleId', otherKey: 'tagId' })
Model.Tag.belongsToMany(Model.Article, {  through: Model.ArticleTag, foreignKey: 'tagId', otherKey: 'articleId' })

// 用户 & 权限一对多关联
Model.Roles.hasMany(Model.User, { foreignKey: 'roles' })
Model.User.belongsTo(Model.Roles, { foreignKey: 'roles' })

// 用户 & 文章一对多关联
Model.User.hasMany(Model.Article, { foreignKey: 'author' })
Model.Article.belongsTo(Model.User, { foreignKey: 'author' })


module.exports = Model