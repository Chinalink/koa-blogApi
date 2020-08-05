/*
 * @Description: 全局异常捕获
 * @Author: HuGang
 * @Date: 2020-07-22 10:54:12
 * @LastEditTime: 2020-08-05 22:21:48
 */ 
const { HttpException } = require('../utils/httpException');

const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    const isHttpException = error instanceof HttpException
    
    if(isHttpException) {
      ctx.status = error.code
      ctx.body = { msg: error.msg, code: error.errCode, data: error.data || null }
    } else {
      ctx.status = 500
      ctx.body =  {msg: '未知异常', code: 999, data: null }
    }
  }
}

module.exports = catchError