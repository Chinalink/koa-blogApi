/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2021-04-07 15:25:06
 * @LastEditTime: 2021-05-25 18:25:20
 */
class HttpException extends Error {
  constructor(msg = '服务器异常', errorCode = 10000, code = 400) {
    super()
    this.error_code = errorCode
    this.code = code
    this.msg = msg
  }
}

class ParameterException extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.code = 400
    this.msg = msg || '参数错误'
    this.errorCode = errorCode || 10000
  }
}

class NotFound extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.msg = msg || '资源未找到';
    this.errorCode = errorCode || 10001;
    this.code = 404;
  }
}

class AuthFailed extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.msg = msg || '授权失败';
    this.errorCode = errorCode || 10002;
    this.code = 401;
  }
}

class Forbidden extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.msg = msg || '禁止访问';
    this.errorCode = errorCode || 10003;
    this.code = 404;
  }
}

class Success extends HttpException {
  constructor(msg, data) {
    super();
    this.msg = msg || '成功';
    this.code = 200;
    this.data = data
  }
}

module.exports = {
  HttpException,
  Success,
  ParameterException,
  NotFound,
  AuthFailed,
  Forbidden
}