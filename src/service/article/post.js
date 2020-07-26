/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-25 14:13:20
 * @LastEditTime: 2020-07-26 20:06:09
 */ 

// 查询
var HttpException = require('../../lib/httpException');
// const { Op } = require("sequelize");
var PostModel = require('../../module/post');

// 创建分类
const createSort = async (params) => {
  console.log(params)
  // const newPost = await PostModel.create(params)
  // if (newPost instanceof PostModel) {
  //   return { code: 1, msg: '创建文章成功' }
  // }
  throw HttpException.throwError('错误', 4002)
}




module.exports = {
  createSort
}