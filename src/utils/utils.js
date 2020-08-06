/*
 * @Description: 工具类
 * @Author: HuGang
 * @Date: 2020-08-05 22:58:19
 * @LastEditTime: 2020-08-05 23:34:49
 */
class Utils {
  constructor() {}

  static randomString(e) {
    e = e || 32
    const t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
    const len = t.length
    let result = ''
    for (let i = 0; i < e; i++) {
      result += t.charAt(Math.floor(Math.random() * len))
    }
    return result
  }

}

module.exports = Utils