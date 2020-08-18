/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-08-07 14:27:19
 * @LastEditTime: 2020-08-18 12:32:46
 */
const Model = require('../model');
const OtherService = require('../service/OtherService');
const ArticleService = require('../service/ArticleService');

const roles = [
  { name: '超级管理员', id: 'superAdmin' },
  { name: '作者', id: 'author' },
  { name: '普通用户', id: 'register' }
]

const admin = { user: 'ddmmadmin', nickName: '超级管理员', password: 'e10adc3949ba59abbe56e057f20f883e', email: '214911220@qq.com', role: 'superAdmin' }
const sort = { name: '未分类', alias: 'default', desc: '默认分类'  }

const initData = {
  init() {
    this.initRoles()
    this.initSort()
  },
  // 初始化权限组
  async initRoles() {
    const res = await Model.Roles.bulkCreate(roles, { ignoreDuplicates: true })
    if (res.length > 0) {
      console.log('初始化用户角色成功')
      this.initUser()
    }
  },
  // 初始化用户
  async initUser() {
    const [user, created] = await Model.User.findOrCreate({
      where: { user: admin.user },
      defaults: admin
    })
    if (created) {
      const userRoles = admin.role
      const role = await Model.Roles.findOne({ where: { id: userRoles } })
      await user.setRole(role)
      console.log('初始化超级管理员成功')
    }
  },
  // 初始化分类
  async initSort() {
    const hasSort = await ArticleService.checkTagOrSort(sort, 'Sort', '分类')
    if (!hasSort) {
      const newSort = await Model.Sort.create(sort)
      if (newSort instanceof Model.Sort) {
        console.log('初始化分类成功')
      }
    }
  }
}

initData.init()