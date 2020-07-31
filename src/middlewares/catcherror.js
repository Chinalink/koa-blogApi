/*
 * @Description: 全局异常捕获
 * @Author: HuGang
 * @Date: 2020-07-22 10:54:12
 * @LastEditTime: 2020-07-31 16:53:45
 */ 
var HttpException = require('../utils/httpException');

const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    console.log(error)
    if(error.code === 200) {
      return ctx.body = { msg: error.msg, code: error.errCode }
    } else {
      ctx.body = { msg: error.msg, code: error.errCode }
      return ctx.status = error.code
    }
  }
}

module.exports = catchError