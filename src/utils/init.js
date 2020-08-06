/*
 * @Description: 中间件加载
 * @Author: HuGang
 * @Date: 2020-08-04 23:47:11
 * @LastEditTime: 2020-08-05 18:27:40
 */
const cors = require('@koa/cors') // 用于开启跨域
const bodyParser = require('koa-bodyparser') // 请求体解析中间件
// const jwt = require('koa-jwt'); // 路由鉴权
const router = require('../router') // 路由
const catchError = require('../middlewares/catcherror'); // 全局错误处理
const errors = require('./httpException');

class InitManager  {
  static initCore(app) {
    InitManager.app = app
    InitManager.loadMiddlewares()
    InitManager.loadRoutes()
    InitManager.loadHttpException()
  }

  static loadMiddlewares() {
    InitManager.app
      .use(catchError)
      .use(cors())
      .use(bodyParser())
  }
  
  static loadRoutes() {
    InitManager.app.use(router.routes())
  }

  static loadHttpException() {
    global.ParameterException = errors.ParameterException
    global.AuthFaild = errors.AuthFaild
    global.NotFound = errors.NotFound
    global.Success = errors.Success
  }

}

module.exports = InitManager