/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-21 17:43:13
 * @LastEditTime: 2020-08-07 14:27:38
 */ 

const fs = require('fs');
const path = require('path');

let Model = []
const pathName = path.join(__dirname, '..', '/model')

fs.readdirSync(pathName).forEach(file => {
  if (file === 'index.js') return
  console.log(file)
  Model.push(require(`${pathName}/${file}`))
})

Model.forEach((item) => {
  item.sync({ force: true }) // 强制同步，先删除表，然后新建
})