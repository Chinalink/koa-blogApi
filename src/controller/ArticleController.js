/*
 * @Description: 文章相关Controller
 * @Author: HuGang
 * @Date: 2020-07-31 15:13:17
 * @LastEditTime: 2020-08-02 13:24:27
 */ 
const HttpException = require('../utils/httpException');
const Validation = require('../utils/validation');
const ArticleService = require('../service/ArticleService');

// 文章相关
const queryArticleList = async (ctx, next) => {
  const data = await ArticleService.SQLqueryArticleList()
  return ctx.response.body = data
}

const createArticle = async (ctx, next) => {
  const {title, content} = ctx.request.body
  Validation.empty(title, '文章标题不能为空')
  Validation.empty(content, '文章内容不能为空')

  const data = await ArticleService.SQLcreateArticle(ctx.request.body)
  return ctx.response.body = data
}

// 分类相关
const querySortList = async (ctx, next) => {
  const data = await ArticleService.SQLquerySortList()
  return ctx.response.body = data
}

const createSort = async (ctx, next) => {
  const { name, parentId } = ctx.request.body

  Validation.empty(name, '分类名称不能为空！')

  if (parentId) { // 父类ID不合法，默认为一级分类
    if (parentId === 'none' || typeof parentId !== 'number') {
      delete ctx.request.body.parentId
    }
  }
  
  const data = await ArticleService.SQLcreateSort(ctx.request.body)
  return ctx.response.body = data
}

const updateSort = async (ctx, next) => {
  const { name, id, parentId } = ctx.request.body
  Validation.empty(name, '分类名称不能为空！')
  
  if (!id || typeof id !== 'number') {
    throw HttpException.throwError('该分类不存在', 4001)
  }

  if (parentId) { // 父类ID校验
    if (parentId === 'none' || typeof parentId !== 'number') {
      ctx.request.body.parentId = null
    }
  }

  const data = await ArticleService.SQLupdateSort(ctx.request.body)
  return ctx.response.body = data
}

const deleteSort = async (ctx, next) => {
  const { id } = ctx.request.query
  Validation.empty(id, '请求参数错误', 4001)

  const data = await ArticleService.SQLdeleteSort(ctx.request.query)
  return ctx.response.body = data
}

module.exports = {
  queryArticleList,
  createArticle,
  querySortList,
  createSort,
  updateSort,
  deleteSort
}