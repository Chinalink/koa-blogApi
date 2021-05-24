/*
 * @Description: 主模块
 * @Author: HuGang
 * @Date: 2021-05-24 16:27:05
 * @LastEditTime: 2021-05-24 16:27:31
 */
const Koa = require('koa');
const InitManager = require('./core');

const app = new Koa()
InitManager.initCore(app)

app.listen(3444)
console.log(`服务启动成功`)