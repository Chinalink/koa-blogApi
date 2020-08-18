/*
 * @Description: 鉴权管理
 * @Author: HuGang
 * @Date: 2020-08-05 12:32:45
 * @LastEditTime: 2020-08-18 18:08:44
 */
const GlobalConfig = require('../config');
const jwt = require('jsonwebtoken')
class Auth {

  static createToken(uid, roles) {
    const token = jwt.sign(
      { uid, roles },
      GlobalConfig.jwtConfig.secretKey,
      GlobalConfig.jwtConfig.expiresIn
    )
    return token
  }

  static verifyToken(token) {
    try {
      const data = jwt.verify(token, GlobalConfig.jwtConfig.secretKey)
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