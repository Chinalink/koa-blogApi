/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-26 17:26:54
 * @LastEditTime: 2020-07-26 19:45:12
 */ 

// var HttpException = require('../../lib/httpException');
const post = require('../../service/article/post');

const createPost = async (ctx, next) => {
  const data = await post.createSort(ctx.request.body)
  return ctx.response.body = data
}

module.exports = {
  createPost
}