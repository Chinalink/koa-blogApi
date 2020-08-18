/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-16 16:56:11
 * @LastEditTime: 2020-08-19 00:36:22
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

  static async upload(ctx, next) {
    const { file } = ctx.request.files; // 获取上传文件
    const { type } = ctx.request.body 
    const res = await UploadService.uploadFile(file)
    if(res.imgPath) {
      // 上传到七牛
      const qiniu = await UploadService.upToQiniu(res.imgPath, res.imgKey, type)
      if (qiniu.key) {
        UploadService.removeTemImage(res.imgPath)
        const imgDomain = GlobalConfig.qiNiuConfig.imgDomain
        const result = {
          imgHash: qiniu.hash,
          imgUrl: `${imgDomain}${qiniu.key}`
        }
        return ctx.response.body = {code: 0, data: result, msg: '上传成功'}
      }
    }
  }
}

module.exports = OtherController