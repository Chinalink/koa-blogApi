/*
 * @Description: 主模块
 * @Author: HuGang
 * @Date: 2019-12-02 13:28:14
 * @LastEditTime: 2020-08-07 14:17:51
 */
// 依赖库
const Koa = require('koa')
const InitManager = require('./utils/init');

const app = new Koa()
InitManager.initCore(app)
InitManager.loadSequelize()

// 响应用户请求
app.use((ctx) => {
  throw new global.NotFound()
});

// 监听端口启动http服务
app.listen(3444)
console.log(`*****项目启动成功，m(=∩王∩=)m*****`)