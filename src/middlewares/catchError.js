/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2021-05-25 18:02:57
 * @LastEditTime: 2021-05-25 18:26:41
 */

const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    console.log(error)
    if(error.errorCode) {
      ctx.body = {
        msg: error.msg,
        errorCode: error.errorCode
      }
      ctx.status = error.code
    } else {
      ctx.body = {
        msg: error.message,
        errorCode: 10000
      }
      ctx.status = 500
    }
  }
}

module.exports = catchError