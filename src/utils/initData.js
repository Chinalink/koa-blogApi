/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-08-07 14:27:19
 * @LastEditTime: 2020-08-07 18:23:30
 */
const Model = require('../model');
const roles = [
    { name: '超级管理员' },
    { name: '普通用户' }
]
const users = [
  { name: 'xiaodai', password: 'e10adc3949ba59abbe56e057f20f883e', email: '416681736@qq.com' },
  { name: 'xiaomeng', password: 'e10adc3949ba59abbe56e057f20f883e', email: '963691340@qq.com' },
]


class InitData {

  static async initRoles() {
    const res = await Model.Roles.bulkCreate(roles, { ignoreDuplicates: true })
    if(res.length > 0) {
      console.log('初始化用户角色成功')
    }
  }

  static async initUser() {
    const res = await Model.User.bulkCreate(users, { ignoreDuplicates: true })
    if (res.length > 0) {
      console.log('初始化用户成功')
    }
  }
}

// InitData.initRoles()
InitData.initUser()