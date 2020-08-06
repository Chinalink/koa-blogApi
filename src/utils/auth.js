/*
 * @Description: 鉴权管理
 * @Author: HuGang
 * @Date: 2020-08-05 12:32:45
 * @LastEditTime: 2020-08-05 18:24:48
 */
const jwt = require('jsonwebtoken')

class Auth {
  constructor(level) {

  }

  static verifyToken(token) {
    try {
      jwt.verify(token, secretKey)
      return true
    } catch (error) {
      return false
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