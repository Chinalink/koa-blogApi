/*
 * @Description: 鉴权校验中间件
 * @Author: HuGang
 * @Date: 2020-08-05 18:02:37
 * @LastEditTime: 2020-08-05 18:28:15
 */
const Auth = require('../utils/auth');

const authorize = async (ctx, next) => {
  const token = Auth.getToken(ctx)
  let tokenData = null

  if(!token) {
    throw new global.AuthFaild('请求签名校验失败')
  }

  try {
    tokenData = jwt.verify(token, secretKey)
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new global.AuthFaild('签名已过期，请重新登录')
    }
    console.log(error)
  }

  // 权限判断
  if (tokenData.scope < this.level) {
    throw new global.AuthFaild('权限不足')
  }

  await next()
}

module.exports = authorize