/*
 * @Description: 分类controller
 * @Author: HuGang
 * @Date: 2020-07-25 13:40:51
 * @LastEditTime: 2020-07-25 16:50:43
 */ 
var HttpException = require('../../lib/httpException');
const sort = require('../../service/article/sort');

const createSort = async (ctx, next) => {
  // 判断必填项
  const { sort_name } = ctx.request.body
  if (!sort_name || sort_name === '') {
    throw HttpException.throwError('分类名称不能为空！', 4001)
  }
  
  const data = await sort.createSort(ctx.request.body)
  return ctx.response.body = data
}

const queryAllSort = async(ctx, next) => {
  const data = await sort.queryAllSort()
  return ctx.response.body = data
}

module.exports = {
  createSort,
  queryAllSort
}