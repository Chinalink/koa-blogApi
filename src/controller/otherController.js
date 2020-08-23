/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-16 16:56:11
 * @LastEditTime: 2020-08-23 17:39:09
 */
const OtherService = require('../service/OtherService');
const UploadService = require('../service/UploadService');
const Validation = require('../utils/validation')
const GlobalConfig = require('../config');

class OtherController {
  static async login(ctx, next) {
    const { user, password } = ctx.request.body
    Validation.isEmpty(user, '用户名不能为空')
    Validation.isEmpty(password, '密码不能为空')
    await OtherService.SQLlogin(user, password)
  }

  static async register(ctx, next) {
    const roles = ctx.tokenData.roles
    Validation.isAdmin(roles)
    
    const data = await OtherService.SQLregister(ctx.request.body)
    return ctx.response.body = data
  }

  static async createUpload(ctx, next) {
    const { file } = ctx.request.files; // 获取上传文件
    const { type } = ctx.request.body 
    const res = await UploadService.uploadFile(file)
    if(res.imgPath) {
      // 上传到七牛
      const qiniu = await UploadService.upToQiniu(res.imgPath, res.imgKey, type)
      if (qiniu.key) {
        UploadService.removeTemImage(res.imgPath)
        const params = {
          hash: qiniu.hash,
          name: qiniu.key,
          type: +type
        }
        const data = await OtherService.SQLCreatePicture(params)
        return ctx.response.body = data
      }
    }
  }

  static async deletePicture(ctx, next) {
    const { id } = ctx.params
    Validation.isEmpty(id, '请求参数错误')

    const picInfo = await OtherService.SQLfindOnePicture(ctx.params)
    let data = { code: 400, msg: '删除失败' }
    if(picInfo.code === 0) {
      const res = await UploadService.deleteToQiniu(picInfo.data.name)
      if (res.status === 200) {
        data = await OtherService.SQLdeletePicture(ctx.params)
      }
    }
    return ctx.response.body = data
  }
  
  static async queryPictureList(ctx, next) {
    const { pageSize = 20, current = 1, type = 2 } = ctx.request.query

    const query = {
      pageSize: +pageSize,
      current: +current,
      type: +type
    }
    const data = await OtherService.SQLQueryPicture(query)
    return ctx.response.body = data
  }
}

module.exports = OtherController