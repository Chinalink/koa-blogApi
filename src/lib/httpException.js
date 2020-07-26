/*
 * @Description: 异常抛出
 * @Author: HuGang
 * @Date: 2020-07-22 11:00:53
 * @LastEditTime: 2020-07-25 14:48:09
 */ 

class HttpException extends Error {
  constructor() {
    super()
  }

  static throwError(msg = '服务器异常', errCode = 10000, code = 200) {
    return {msg, errCode, code}
  }
}

module.exports = HttpException