/*
 * @Description: 主模块
 * @Author: HuGang
 * @Date: 2019-12-02 13:28:14
 * @LastEditTime: 2020-08-02 14:14:28
 */
// 依赖库
const Koa = require('koa')
const cors = require('@koa/cors') // 用于开启跨域
const bodyParser = require('koa-bodyparser') // 请求体解析中间件
// 配置
const sequelize = require('./database/dbConn'); // 数据库
const catchError = require('./middlewares/catcherror'); // 全局错误处理
const router = require('./router') // 路由

const app = new Koa()

// 注册中间件
app
  .use(catchError)
  .use(cors())
  .use(bodyParser())
  .use(router.routes())

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