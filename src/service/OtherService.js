/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-16 16:59:01
 * @LastEditTime: 2021-05-25 18:26:09
 */ 

const bcrypt = require('bcrypt')
const Auth = require('../utils/auth')
const utils = require('../utils/utils');
const { Exceptions: { ParameterException, Success} } = global
const Model = require('../core/models');
const { User } = Model

class OtherService {
  // 登录
  static async SQLlogin(user, password) {
    const params = { user }
    const oneUser = await User.findOne({ where: params })
    if (oneUser) {
      if (bcrypt.compareSync(password, oneUser.password)) {
        const token = Auth.createToken(oneUser.id, oneUser.roles)
        return new Success('登陆成功', { token: token, uid: oneUser.id, name: oneUser.nickName, avatar: oneUser.avatar })
      } else {
        throw new ParameterException('用户名或密码错误')
      }
    }
    throw new ParameterException('用户不存在')
  }
  // 注册
  // static async SQLregister(params) {
  //   try {
  //     const [user, created] = await Model.User.findOrCreate({
  //       where: { user: params.user },
  //       defaults: params
  //     })
  //     if (created) {
  //       const userRoles = params.role
  //       const role = await Model.Roles.findOne({ where: { id: userRoles } })
  //       await user.setRole(role)
  //       return new global.Success('注册成功').returnData()
  //     }
  //     return new global.ParameterException('用户已存在').returnData()
  //   } catch (error) {
  //     throw new global.ParameterException(error.errors[0].message)
  //   }
  // }
  // 保存图片信息
  // static async SQLCreatePicture(params) {
  //   try {
  //     const newPic = await Model.Picture.create(params)
  //     if (newPic instanceof Model.Picture) {
  //       return new global.Success('上传成功', newPic).returnData()
  //     }
  //   } catch (error) {
  //     throw new global.ParameterException(error.errors[0].message)
  //   }
  // }
  // 删除图片
  // static async SQLdeletePicture(params) {
  //   if (params.id) {
  //     const result = await Model.Picture.destroy({ where: { id: params.id } })
  //     if (result === 1) {
  //       return new global.Success('操作成功').returnData()
  //     } else {
  //       return new global.ParameterException('操作失败').returnData()
  //     }
  //   }
  // }
  // 查找单张图片
  // static async SQLfindOnePicture(params) {
  //   const pic = await Model.Picture.findOne({ where: { id: params.id } })
  //   if(pic) {
  //     return { code: 0, data: pic }
  //   } else {
  //     return { code: 4004 }
  //   }
  // }

  // 查询图片列表
  // static async SQLQueryPicture(query) {
  //   try {
  //     const { count, rows } = await Model.Picture.findAndCountAll({
  //       offset: (query.current - 1) * query.pageSize,
  //       limit: query.pageSize,
  //       order: [['createdAt', 'desc']],
  //       where: { type: query.type }
  //     })
  //     const rowsData = utils.pathToTreeList(rows)
  //     const result = { result: rowsData, total: count }
  //     return new global.Success('查询成功', result).returnData()
  //   } catch (error) {
  //     throw new global.Success(error)
  //   }
  // }
}

module.exports = OtherService