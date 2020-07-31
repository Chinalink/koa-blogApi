/*
 * @Description: 文章相关Controller
 * @Author: HuGang
 * @Date: 2020-07-31 15:13:17
 * @LastEditTime: 2020-07-31 16:25:40
 */ 

const ArticleService = require('../service/ArticleService');

// 查询文章
const queryArticleList = async (ctx, next) => {
  console.log(ctx)
  const data = await ArticleService.SQLqueryArticleList()
  return ctx.response.body = data
}

// 创建文章
const createArticle = async (ctx, next) => {
  const data = await ArticleService.SQLcreateArticle(ctx.request.body)
  return ctx.response.body = data
}

// 查询分类
const querySortList = async (ctx, next) => {
  const data = await ArticleService.SQLquerySortList()
  return ctx.response.body = data
}

// 创建分类
const createSort = async (ctx, next) => {
  // 判断必填项
  const { sort_name } = ctx.request.body
  if (!sort_name || sort_name === '') {
    throw HttpException.throwError('分类名称不能为空！', 4001)
  }

  const data = await ArticleService.SQLcreateSort(ctx.request.body)
  return ctx.response.body = data
}

module.exports = {
  queryArticleList,
  createArticle,
  querySortList,
  createSort
}