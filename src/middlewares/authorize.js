/*
 * @Description: 鉴权校验中间件
 * @Author: HuGang
 * @Date: 2020-08-05 18:02:37
 * @LastEditTime: 2020-08-12 22:55:41
 */
const Auth = require('../utils/auth');

const authorize = async (ctx, next) => {
  const token = Auth.getToken(ctx)
  let tokenData = null

  if(!token) {
    throw new global.AuthFaild()
  }

  try {
    tokenData = Auth.verifyToken(token)
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new global.AuthFaild('签名已过期，请重新登录', 1002)
    }
  }
  
  ctx.tokenData = tokenData
  await next()
}

module.exports = authorize