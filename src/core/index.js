/*
 * @Description: 中间件配置及加载
 * @Author: HuGang
 * @Date: 2021-05-24 16:27:56
 * @LastEditTime: 2021-05-25 18:20:46
 */
const sequelize = require('./db'); // 数据库ORM

const Router = require('@koa/router') // 路由中间件
const requireDirectory = require('require-directory'); // 路由自动注册

const cors = require('@koa/cors'); // 用于开启跨域
const koaBody = require('koa-body') // body解析、图片上传中间件

// https://joi.dev/api/?v=17.4.0#example
const Joi = require('joi'); // 表单校验
const catchError = require('../middlewares/catchError'); // 异常处理
const Exceptions = require('../middlewares/httpException')

class InitManager {
  // 初始化
  static initCore(app) {
    InitManager.app = app
    InitManager.loadMiddlewares()
    InitManager.loadPlugins()
    InitManager.initLoadSequelize()
    InitManager.initLoadRouters()
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

  static loadPlugins() {
    global.Joi = Joi
    global.Exceptions = Exceptions
  }

  // 数据库连接
  static async initLoadSequelize() {
    try {
      await sequelize.authenticate()
      console.log('数据库连接成功, 功能正常')
    } catch (error) {
      console.error('数据库连接失败', error)
    }
  }

  // 初始化路由
  static initLoadRouters() {
    const router = new Router({ prefix: '/apis/v1' }) // 路由实例
    const apiDirectory = `${process.cwd()}/src/routes` // process.cwd() 获取程序根目录

    requireDirectory(module, apiDirectory, {
      visit: r => {
        if (r instanceof Router) {
          router.use(r.routes())
        }
      }
    })
    InitManager.app.use(router.routes())
  }

}

module.exports = InitManager