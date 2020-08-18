/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-08-01 16:47:45
 * @LastEditTime: 2020-08-18 12:35:38
 */ 

class Validation {
  // 是否为空
  static isEmpty(value, msg) {
    if (!value || value === '') {
      throw new global.ParameterException(msg)
    }
  }

  static isSelf(uid, targetId) {
    if (uid !== 'superAdmin' && uid != targetId) {
      throw new global.AuthFaild('权限不足', 1003)
    }
  }

  static isAdmin(uid) {
    if (uid !== 'superAdmin') {
      throw new global.AuthFaild('权限不足', 1003)
    }
  }
}

module.exports = Validation