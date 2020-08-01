/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-08-01 16:47:45
 * @LastEditTime: 2020-08-01 16:50:36
 */ 
const HttpException = require('../utils/httpException');

class Validation {
  static empty(value, msg) {
    if (!value || value === '') {
      throw HttpException.throwError(msg, 4001)
    }
  }
}

module.exports = Validation