/*
 * @Description: 文章相关Controller
 * @Author: HuGang
 * @Date: 2020-07-31 15:13:17
 * @LastEditTime: 2021-05-24 21:24:43
 */ 
// const Validation = require('../utils/validation')
const ArticleService = require('../service/ArticleService');

class ArticleController {
  // 创建文章
  // static async createArticle(ctx, next) {
  //   let { tags } = ctx.request.body
  //   if(tags && tags.length) {
  //     // 需要创建的标签
  //     const createFilter = tags.filter(item => item.name == item.id)
  //     const createTags = createFilter.map(item => { return { name: item.name } })
  //     // 已经创建的标签
  //     const findTags = tags.filter(item => item.name != item.id)
  //     const Tags = findTags.map(item => item.id)
  //     tags = [].concat(createTags, Tags)
  //   }

  //   const data = await ArticleService.SQLcreateArticle(ctx.request.body)
  //   return ctx.response.body = data
  // }

  // static async deleteArticle(ctx, next) {

  // }

  // static async updateArticle(ctx, next) {

  // }

  // static async queryArticle(ctx, next) {
  //   const { id } = ctx.request.query
  //   Validation.isEmpty(id, '请求参数错误')
  //   const data = await ArticleService.SQLqueryArticle(id)
  //   return ctx.response.body = data
  // }
  
  // 查询文章列表
  static async queryArticleList(ctx, next) {
    const { pageSize = 20, current = 1 } = ctx.request.query
    
    const query = {
      pageSize: +pageSize,
      current: +current
    }
    const data = await ArticleService.SQLqueryArticleList(query)
    return ctx.response.body = data
  }

  // 创建分类
  static async createSort(ctx, next) {
    const { parentId } = ctx.request.body
    if (parentId) { // 父类ID不合法，默认为一级分类
      if (parentId === 'none' || typeof parentId !== 'number') {
        delete ctx.request.body.parentId
      }
    }
    const data = await ArticleService.SQLcreateSortOrTag(ctx.request.body, 'Sort', '分类')
    return ctx.response.body = data
  }

  // 删除分类
  static async deleteSort(ctx, next) {
    const { id } = ctx.params
    Validation.isEmpty(id, '请求参数错误')

    const data = await ArticleService.SQLdeleteSort(ctx.params)
    return ctx.response.body = data
  }

  // 更新分类
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
  // 查询分类列表
  static async querySortList(ctx, next) {
    const { pageSize = 20, current = 1 } = ctx.request.query

    const query = {
      pageSize: +pageSize,
      current: +current
    }
    const data = await ArticleService.SQLquerySortOrTagList(query, 'Sort')
    return ctx.response.body = data
  }

  // 创建标签
  static async createTag(ctx, next) {
    const data = await ArticleService.SQLcreateSortOrTag(ctx.request.body, 'Tag', '标签')
    return ctx.response.body = data
  }

  // 删除标签
  static async deleteTag(ctx, next) {
    const { id } = ctx.params
    Validation.isEmpty(id, '请求参数错误')

    const data = await ArticleService.SQLdeleteTag(ctx.params)
    return ctx.response.body = data
  }
  
  // 更新标签
  static async updateTag(ctx, next) {
    const { name, id } = ctx.request.body
    Validation.isEmpty(name, '分类名称不能为空！')

    if (!id || typeof id !== 'number') {
      throw new global.ParameterException('该分类不存在')
    }

    const data = await ArticleService.SQLupdateTag(ctx.request.body)
    return ctx.response.body = data
  }

  // 查询标签列表
  static async queryTagList(ctx, next) {
    const { pageSize = 20, current = 1 } = ctx.request.query

    const query = {
      pageSize: +pageSize,
      current: +current
    }
    const data = await ArticleService.SQLquerySortOrTagList(query, 'Tag')
    return ctx.response.body = data
  }
}

module.exports = ArticleController