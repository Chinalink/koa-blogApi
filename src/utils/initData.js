/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-08-07 14:27:19
 * @LastEditTime: 2020-08-08 17:01:43
 */
const OtherService = require('../service/OtherService');
const Model = require('../model');
const roles = [
  { name: '超级管理员' },
  { name: '作者' },
  { name: '普通用户' }
]
const admin = { user: 'ddmmadmin', password: 'e10adc3949ba59abbe56e057f20f883e', email: '214911220@qq.com' }


class InitData {

  static async initRoles() {
    const res = await Model.Roles.bulkCreate(roles, { ignoreDuplicates: true })
    if(res.length > 0) {
      console.log('初始化用户角色成功')
    }
  }

  static initUser() {
    OtherService.SQLregister(admin, 1)
  }
}

InitData.initRoles()
InitData.initUser()