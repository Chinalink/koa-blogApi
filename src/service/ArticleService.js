/*
 * @Description: 文章相关Service
 * @Author: HuGang
 * @Date: 2020-07-31 15:25:07
 * @LastEditTime: 2020-07-31 18:17:30
 */ 

let HttpException = require('../utils/httpException');
const { Op } = require("sequelize");
let model = require('../module')

// 创建文章
const SQLcreateArticle = async (params) => {
  const newArticle = await model.Atricle.create(params)

  if (newArticle instanceof model.Atricle) {
    const sorts = await model.Sort.findAll({ where: { id: params.sorts } })
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
      { 
        model: model.Sort,
        attributes: ['id', 'name'], 
        through: { attributes: [] } 
      }
    ]
  })
  return { code: 1, msg: '查询成功', data: allPost }
}

// 判断分类是否存在或别名重复
const _checkSort = async (params) => {
  let result = null
  let queryOptions = { name: params.name }
  if (params.alias) {
    queryOptions.alias = params.alias
  }
  const oneSort = await model.Sort.findOne({ where: { [Op.or]: queryOptions } })
  if (oneSort) {
    const msg = oneSort.name == params.name ? '已存在同名分类' : '已存在相同的分类别名'
    throw HttpException.throwError(msg, 0, 400)
  }
  return result
}

// 创建分类
const SQLcreateSort = async (params) => {
  const hasSort = await _checkSort(params)
  if (!hasSort) {
    const newSort = await model.Sort.create(params)
    if (newSort instanceof model.Sort) {
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