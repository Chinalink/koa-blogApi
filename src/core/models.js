/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2021-05-24 19:55:39
 * @LastEditTime: 2021-05-24 21:27:08
 */
const fs = require('fs');
const Model = {}

// fs.readdirSync(`${process.cwd()}/src/models`).forEach(file => {
//   const name = file.replace('.js', '')
//   Model[name] = require(`./${file}`)
// })

Model.User = require(`${process.cwd()}/src/models/User`);

module.exports = Model