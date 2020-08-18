/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-08-01 16:47:45
 * @LastEditTime: 2020-08-18 23:40:57
 */ 

class Validation {
  // 是否为空
  static isEmpty(value, msg) {
    if (!value || value === '') {
      throw new global.ParameterException(msg)
    }
  }

  static isSelf(token, targetId) {
    if (token.roles !== 'superAdmin' && token.uid != targetId) {
      throw new global.AuthFaild('权限不足', 1003)
    }
  }

  static isAdmin(roles) {
    if (roles !== 'superAdmin') {
      throw new global.AuthFaild('权限不足', 1003)
    }
  }
}

module.exports = Validation