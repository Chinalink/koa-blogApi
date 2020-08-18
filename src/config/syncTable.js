/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-21 17:43:13
 * @LastEditTime: 2020-08-18 18:12:48
 */ 

const fs = require('fs');
const path = require('path');

let Model = []
const pathName = path.join(__dirname, '..', '/model')

fs.readdirSync(pathName).forEach(file => {
  if (file === 'index.js') return
  console.log(`加载${file}模块中...`)
  Model.push(require(`${pathName}/${file}`))
})
// alter: false
Model.forEach((item) => {
  item.sync({ force: true }) // 强制同步，先删除表，然后新建
})