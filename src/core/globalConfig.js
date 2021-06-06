/*
 * @Description: 配置文件
 * @Author: HuGang
 * @Date: 2021-05-24 17:09:33
 * @LastEditTime: 2021-05-25 14:32:26
 */

const DBConfig = {
  dataBase: 'koa',
  userName: 'root',
  passWord: 'rootroot',
  dbConfig: {
    host: 'localhost', // 数据库的主机
    port: '3306', // 数据库的端口
    protocol: 'tcp', // 连接数据库使用的协议
    dialect: 'mysql', // 使用mysql
    pool: {
      max: 5, //  最大连接数量
      min: 0, //  最小连接数量
      idle: 10000 //  连接空置时间（毫秒），超时后将释放连接
    },
    retry: { //  设置自动查询时的重试标志
      max: 3 //  设置重试次数
    },
    omitNull: false, //  null 是否通过SQL语句查询
    timezone: '+08:00' //  解决时差 - 默认存储时间存在8小时误差
  }
}

const jwtConfig = {
  secretKey: 'HxD&CxM',
  expiresIn: {
    expiresIn: 60 * 60 * 2
  }
}

module.exports = {
  DBConfig,
  jwtConfig
}