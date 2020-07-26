/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2019-12-02 13:28:14
 * @LastEditTime: 2020-07-25 13:36:06
 */
const Koa = require('koa')
const catchError = require('./middlewares/catcherror');
const sequelize = require('./lib/dbConn');
const router = require('./router/router')
const cors = require('@koa/cors') // 用于开启跨域
const bodyParser = require('koa-bodyparser') // 请求体解析中间件

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

sequelize.authenticate().then(() => {
  console.log('Success.');
}).catch(err => {
  console.error('Failed', err);
});

app.listen(3444)

console.log(`listening on port 3444`)