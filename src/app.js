/*
 * @Description: 主模块
 * @Author: HuGang
 * @Date: 2019-12-02 13:28:14
 * @LastEditTime: 2020-08-04 23:54:17
 */
// 依赖库
const Koa = require('koa')
const InitManager = require('./utils/init');
// 配置
const sequelize = require('./database/dbConn'); // 数据库



const app = new Koa()
InitManager.initCore(app)

// 响应用户请求
app.use((ctx) => {
  console.log("404 Not Found")
});

// 数据库建连
sequelize.authenticate().then(() => {
  console.log('*****数据库连接成功，─=≡Σ(((つ•̀ω•́)つ*****');
}).catch(err => {
  console.error('Failed', err);
});

// 监听端口启动http服务
app.listen(3444)
console.log(`*****项目启动成功，m(=∩王∩=)m*****`)