/*
 * @Description: 中间件配置及加载
 * @Author: HuGang
 * @Date: 2021-05-24 16:27:56
 * @LastEditTime: 2021-05-24 17:11:08
 */
const sequelize = require('./db'); // 数据库ORM
class InitManager {
  // 初始化
  static initCore(app) {
    InitManager.app = app
    InitManager.initLoadSequelize()
  }

  // 数据库连接
  static async initLoadSequelize() {
    try {
      await sequelize.authenticate()
      console.log('数据库连接成功, 功能正常')
    } catch (error) {
      console.error('数据库连接失败', error)
    }
  }
}

module.exports = InitManager