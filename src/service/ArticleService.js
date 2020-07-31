/*
 * @Description: 文章相关Service
 * @Author: HuGang
 * @Date: 2020-07-31 15:25:07
 * @LastEditTime: 2020-07-31 16:31:30
 */ 

let HttpException = require('../utils/httpException');
const { Op } = require("sequelize");
let model = require('../module')

// 创建文章
const SQLcreateArticle = async (params) => {
  const newArticle = await model.Atricle.create({ post_title: params.post_title, post_content: params.content })
  if (newArticle instanceof PostModel) {
    const sorts = await model.Sort.findAll({ where: { id: params.category } })
    await newArticle.setSorts(sorts)
    return { code: 1, msg: '创建文章成功' }
  }
  throw HttpException.throwError('错误', 4002)
}

// 查询所有文章 
const SQLqueryArticleList = async () => {
  const allPost = await model.Atricle.findAll({
    order: [
      ['createdAt', 'desc']
    ],
    include: [
      { model: SortModel, attributes: ['id', 'sort_name'], through: { attributes: [] } }
    ]
  })
  return { code: 1, msg: '查询成功', data: allPost }
}

// 判断分类是否存在或别名重复
const _checkSort = async (params) => {
  let result = null
  let queryOptions = { sort_name: params.sort_name }
  if (params.alias) {
    queryOptions.sort_alias = params.sort_alias
  }
  const oneSort = await SortModel.findOne({ where: { [Op.or]: queryOptions } })
  if (oneSort) {
    const msg = oneSort.sort_name == params.sort_name ? '父级分类中已存在同名分类' : '父级分类中已存在相同别名的分类'
    result = { msg, code: 4001 }
  }
  return result
}

// 创建分类
const SQLcreateSort = async (params) => {
  const hasSort = await _checkSort(params)
  if (!hasSort) {
    const newSort = await model.Sort.create(params)
    if (newSort instanceof SortModel) {
      return { code: 1, msg: '创建分类成功' }
    }
  }
  throw HttpException.throwError(hasSort.msg, hasSort.code)
}

// 查询所有分类
const SQLquerySortList = async () => {
  const allSort = await model.Sort.findAll()
  return { code: 1, msg: '查询成功', data: allSort }
}


module.exports = {
  SQLcreateArticle,
  SQLqueryArticleList,
  SQLcreateSort,
  SQLquerySortList
}