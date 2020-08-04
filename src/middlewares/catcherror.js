/*
 * @Description: 全局异常捕获
 * @Author: HuGang
 * @Date: 2020-07-22 10:54:12
 * @LastEditTime: 2020-08-04 23:56:19
 */ 
const { HttpException } = require('../utils/httpException');

const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    const isHttpException = error instanceof HttpException
    
    if(isHttpException) {
      ctx.status = error.code
      ctx.body = { msg: error, code: error.errCode, data: null }
    } else {
      ctx.status = 500
      ctx.body =  {msg: '未知异常', code: 999, data: null }
    }
  }
}

module.exports = catchError