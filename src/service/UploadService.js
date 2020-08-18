/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-08-18 13:10:12
 * @LastEditTime: 2020-08-18 22:12:31
 */
const fs = require('fs')
const path = require('path')
const qiniu = require('qiniu')
const GlobalConfig = require('../config');

const uploadService = {
  // 本地上传
  uploadFile(file) {
    return new Promise((resolve, reject) => {
      // 创建可读流
      const reader = fs.createReadStream(file.path);
      const filePath = path.join(__dirname, '..', 'public/upload/') + `${file.name}`;
      // 创建可写流
      const upStream = fs.createWriteStream(filePath);
      // 可读流通过管道写入可写流
      reader.pipe(upStream);
      upStream.on('finish', () => { resolve({ imgPath: filePath, imgKey: file.name }) });
      upStream.on('error', (err) => { reject(err) });
    })
  },
  // 删除缓存图片
  removeTemImage(path) {
    fs.unlink(path, (err) => {
      if (err) {
        throw err
      }
    })
  },
  // 上传到七牛空间
  upToQiniu(filePath, key) {
    const accessKey = GlobalConfig.qiNiuConfig.accessKey
    const secretKey = GlobalConfig.qiNiuConfig.secretKey
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
    const options = {
      scope: GlobalConfig.qiNiuConfig.scope
    }
    const putPolicy = new qiniu.rs.PutPolicy(options)
    const uploadToken = putPolicy.uploadToken(mac)

    const config = new qiniu.conf.Config()
    config.zone = qiniu.zone.Zone_z2 // 空间对应的机房

    const localFile = filePath
    const formUploader = new qiniu.form_up.FormUploader(config)
    const putExtra = new qiniu.form_up.PutExtra()

    // 文件上传
    return new Promise((resolved, reject) => {
      formUploader.putFile(uploadToken, key, localFile, putExtra, function (respErr, respBody, respInfo) {
        if (respErr) {
          reject(respErr)
        }
        if (respInfo.statusCode == 200) {
          resolved(respBody)
        } else {
          resolved(respBody)
        }
      })
    })
  }
}

module.exports = uploadService