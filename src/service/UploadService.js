/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-08-18 13:10:12
 * @LastEditTime: 2020-08-23 17:07:07
 */
const fs = require('fs')
const path = require('path')
const qiniu = require('qiniu')
const moment = require('moment')
const GlobalConfig = require('../config');
const utils = require('../utils/utils');

const uploadService = {
  // 本地上传
  uploadFile(file) {
    console.log(file.name)
    const fileName = this.reName(file.name)
    return new Promise((resolve, reject) => {
      // 创建可读流
      const reader = fs.createReadStream(file.path);
      const filePath = path.join(__dirname, '..', '..', `public/upload/`) + `${fileName}`;
    //   // 创建可写流
      const upStream = fs.createWriteStream(filePath);
    //   // 可读流通过管道写入可写流
      reader.pipe(upStream);
      upStream.on('finish', () => { resolve({ imgPath: filePath, imgKey: fileName }) });
      upStream.on('error', (err) => { reject(err) });
    })
  },
  // 图片重命名
  reName(fileName) {
    const suffix = fileName.split('.').pop()
    const prefix = moment(new Date()).format('YYYYMMDD')
    return `${prefix}_${utils.randomString(16)}.${suffix}`
  },
  // 设置存储目录
  setFilePath(type) {
    if(type == 1) {
      return 'avator'
    }
    const yearPath = moment(new Date()).format('YYYY')
    const monthPath = moment(new Date()).format('MM')
    return `${yearPath}/${monthPath}`
    
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
  upToQiniu(filePath, key, type) {
    const { mac, config } = this.getQiNiuConfig()
    const options = {
      scope: GlobalConfig.qiNiuConfig.scope
    }
    const putPolicy = new qiniu.rs.PutPolicy(options)
    const uploadToken = putPolicy.uploadToken(mac)

    const localFile = filePath
    const fileSavePath = `${this.setFilePath(type)}/${key}`
    const formUploader = new qiniu.form_up.FormUploader(config)
    const putExtra = new qiniu.form_up.PutExtra()
    // 文件上传
    return new Promise((resolved, reject) => {
      formUploader.putFile(uploadToken, fileSavePath, localFile, putExtra, function (respErr, respBody, respInfo) {
        if (respErr) { reject(respErr) }
        
        if (respInfo.statusCode == 200) {
          resolved(respBody)
        } else {
          resolved(respBody)
        }
      })
    })
  },
  // 删除七牛图片
  deleteToQiniu(key) {
    const { mac, config } = this.getQiNiuConfig()
    const bucketManager = new qiniu.rs.BucketManager(mac, config)
    const bucket = GlobalConfig.qiNiuConfig.scope;
    
    bucketManager.delete(bucket, key, function (respErr, respBody, respInfo) {
      if (respErr) { 
        reject(respErr)
      } else {
        resolved({ status: respInfo.statusCode, data: respBody })
      }
    });
  },
  // 获取上传资源列表
  queryUploadList(marker) {
    const { mac, config } = this.getQiNiuConfig()
    const bucketManager = new qiniu.rs.BucketManager(mac, config)
    const bucket = GlobalConfig.qiNiuConfig.scope;
    const options = {
      limit: 1000
    }
    if (marker) {
      options.marker = marker
    }
    return new Promise((resolved, reject) => {
      bucketManager.listPrefix(bucket, options, function (respErr, respBody, respInfo) {
        if (respErr) { reject(respErr) }

        if (respInfo.statusCode == 200) {
          //如果这个nextMarker不为空，那么还有未列举完毕的文件列表，下次调用listPrefix的时候，
          //指定options里面的marker为这个值
          if (respBody.items.length) {
            respBody = utils.pathToTreeList(respBody.items)
          }
          resolved(respBody)
        } else {
          resolved(respBody)
        }
      });
    })
  },
  // 封装七牛通用配置
  getQiNiuConfig() {
    const accessKey = GlobalConfig.qiNiuConfig.accessKey
    const secretKey = GlobalConfig.qiNiuConfig.secretKey
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)

    const config = new qiniu.conf.Config()
    config.zone = qiniu.zone.Zone_z2 // 空间对应的机房
    return { mac, config }
  }
}

module.exports = uploadService