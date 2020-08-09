/*
 * @Description: 常用异常类封装
 * @Author: HuGang
 * @Date: 2020-07-22 11:00:53
 * @LastEditTime: 2020-08-09 19:02:39
 */ 

class HttpException extends Error {
  constructor(msg = '服务器异常', errCode = 500, code = 400) {
    super()
    this.msg = msg
    this.code = code
    this.errCode = errCode
  }

  returnData() {
    return { msg: this.msg, code: this.errCode, data: this.data }
  }
}

class Success extends HttpException {
  constructor(msg, data, errCode) {
    super()
    this.code = 200
    this.msg = msg || '成功'
    this.errCode = errCode || 0
    this.data = data || null
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
  constructor(msg, errCode) {
    super()
    this.code = 401
    this.msg = msg || '请求认证失败'
    this.errCode = errCode || 1001
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