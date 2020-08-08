/*
 * @Description: 鉴权管理
 * @Author: HuGang
 * @Date: 2020-08-05 12:32:45
 * @LastEditTime: 2020-08-08 18:21:43
 */
const jwt = require('jsonwebtoken')
const secretKey = 'XdyCxM'
class Auth {

  static createToken(uid, roles) {
    const token = jwt.sign({ uid, roles }, secretKey, { expiresIn: 60 * 60 * 2 })
    return token
  }

  static verifyToken(token) {
    try {
      const data = jwt.verify(token, secretKey)
      if(data) {
        return data
      }
    } catch (error) {
      throw error
    }
  }

  static getToken(ctx) {
    if (!ctx.request.header || !ctx.request.header.authorization) {
      return false
    }
    const parts = ctx.header.authorization.split(' ');

    if (parts.length === 2) {
      const scheme = parts[0];
      const credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        return credentials;
      }
    }
    return false
  }
}

module.exports = Auth