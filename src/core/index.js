/*
 * @Description: 中间件配置及加载
 * @Author: HuGang
 * @Date: 2021-05-24 16:27:56
 * @LastEditTime: 2021-05-24 16:29:07
 */

class InitManager {
  // 初始化
  static initCore(app) {
    InitManager.app = app
  }
}

module.exports = InitManager