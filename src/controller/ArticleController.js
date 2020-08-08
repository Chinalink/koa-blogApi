/*
 * @Description: 文章相关Controller
 * @Author: HuGang
 * @Date: 2020-07-31 15:13:17
 * @LastEditTime: 2020-08-08 23:59:13
 */ 
const Validation = require('../utils/validation')
const ArticleService = require('../service/ArticleService');

class ArticleController {
  // 文章相关
  static async createArticle(ctx, next) {
    const data = await ArticleService.SQLcreateArticle(ctx.request.body)
    return ctx.response.body = data
  }

  static async deleteArticle(ctx, next) {

  }

  static async updateArticle(ctx, next) {

  }

  static async queryArticleList(ctx, next) {
    const data = await ArticleService.SQLqueryArticleList()
    return ctx.response.body = data
  }
  // 分类相关
  static async createSort(ctx, next) {
    const { parentId } = ctx.request.body
    if (parentId) { // 父类ID不合法，默认为一级分类
      if (parentId === 'none' || typeof parentId !== 'number') {
        delete ctx.request.body.parentId
      }
    }
    const data = await ArticleService.SQLcreateSort(ctx.request.body)
    return ctx.response.body = data
  }

  static async deleteSort(ctx, next) {
    const { id } = ctx.params
    Validation.isEmpty(id, '请求参数错误')

    const data = await ArticleService.SQLdeleteSort(ctx.params)
    return ctx.response.body = data
  }

  static async updateSort(ctx, next) {
    const { name, id, parentId } = ctx.request.body
    Validation.isEmpty(name, '分类名称不能为空！')

    if (!id || typeof id !== 'number') {
      throw new global.ParameterException('该分类不存在')
    }

    if (parentId) { // 父类ID校验
      if (parentId === 'none' || typeof parentId !== 'number') {
        ctx.request.body.parentId = null
      }
    }

    const data = await ArticleService.SQLupdateSort(ctx.request.body)
    return ctx.response.body = data
  }

  static async querySortList(ctx, next) {
    const data = await ArticleService.SQLquerySortList()
    return ctx.response.body = data
  }
}

module.exports = ArticleController