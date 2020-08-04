/*
 * @Description: 常用异常类封装
 * @Author: HuGang
 * @Date: 2020-07-22 11:00:53
 * @LastEditTime: 2020-08-04 23:35:20
 */ 

class HttpException extends Error {
  constructor(msg = '服务器异常', errCode = 500, code = 400) {
    super()
    this.msg = msg
    this.code = code
    this.errCode = errCode
  }
}

class Success extends HttpException {
  constructor(msg, errCode) {
    super()
    this.code = 200
    this.msg = msg || '成功'
    this.errCode = errCode || 200
  }
}

class ParameterException extends HttpException {
  constructor(msg, errCode) {
    super()
    this.code = 400
    this.msg = msg || '参数不合法'
    this.errCode = errCode || 400
  }
}

class AuthFaild extends HttpException {
  constructor(msg) {
    super()
    this.code = 401
    this.msg = msg || '认证失败'
    this.errCode = errCode || 1004
  }
}

class NotFound extends HttpException {
  constructor(msg, errCode) {
    super()
    this.code = 404
    this.msg = msg || '资源未找到'
    this.errCode = errCode || 404
  }
}

module.exports = {
  HttpException,
  Success,
  ParameterException,
  AuthFaild,
  NotFound
}