/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-08-01 16:47:45
 * @LastEditTime: 2020-08-05 23:28:12
 */ 

class Validation {
  static isEmpty(value, msg) {
    if (!value || value === '') {
      throw global.ParameterException(msg)
    }
  }
}

module.exports = Validation