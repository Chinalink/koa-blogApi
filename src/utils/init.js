/*
 * @Description: 中间件加载
 * @Author: HuGang
 * @Date: 2020-08-04 23:47:11
 * @LastEditTime: 2020-08-18 18:11:26
 */
const cors = require('@koa/cors') // 用于开启跨域
const koaBody = require('koa-body') // 上传图片中间件
const router = require('../router') // 路由
const catchError = require('../middlewares/catcherror'); // 全局错误处理
const errors = require('./httpException');  // 常用错误类
const sequelize = require('../database/dbConn'); // 数据库

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
      .use(koaBody({
        multipart: true,
        formidable: {
          maxFileSize: 200 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
          keepExtensions: true // 保存图片的扩展名
        }
      }))
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

  static loadSequelize() {
    // 数据库建连
    sequelize.authenticate().then(() => {
      console.log('*****数据库连接成功，─=≡Σ(((つ•̀ω•́)つ*****');
    }).catch(err => {
      console.error('Failed', err);
    });
  }
  
}

module.exports = InitManager