/*
 * @Description: 配置文件
 * @Author: HuGang
 * @Date: 2020-08-18 16:07:32
 * @LastEditTime: 2020-08-18 22:52:32
 */

const DBConfig = {
  host: 'localhost', //  接数据库的主机
  port: '3306', //  接数据库的端口
  protocol: 'tcp', //  连接数据库使用的协议
  dialect: 'mysql', //  使用mysql
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

const jwtConfig = {
  secretKey: 'XdyCxM',
  expiresIn: {
    expiresIn: 60 * 60 * 2
  }
}

const qiNiuConfig = {
  accessKey: '--R3OUe2Q_WZoVzWCSB_8UVj8JGIpodOs5Pep70C',
  secretKey: 'wokCxw-0nc87QsJPNMI7LSyb-9-F5SxMXz9eYhYt',
  scope: 'ddmmblog',
  imgDomain: 'http://qf8zthosn.hn-bkt.clouddn.com/'
}

module.exports = {
  DBConfig,
  jwtConfig,
  qiNiuConfig
}