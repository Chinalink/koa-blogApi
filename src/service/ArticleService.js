/*
 * @Description: 文章相关Service
 * @Author: HuGang
 * @Date: 2020-07-31 15:25:07
 * @LastEditTime: 2020-08-02 19:17:36
 */ 

let HttpException = require('../utils/httpException');
const { Op, where } = require("sequelize");
let model = require('../module');

// 创建文章
const SQLcreateArticle = async (params) => {
  const newArticle = await model.Atricle.create(params)

  if (newArticle instanceof model.Atricle) {
    const sorts = await model.Sort.findAll({ where: { id: params.category } })
    await newArticle.setSorts(sorts)
    return { code: 0, msg: '创建文章成功' }
  }
  throw HttpException.throwError('错误', 4002)
}

// 查询所有文章 
const SQLqueryArticleList = async () => {
  const allPost = await model.Atricle.findAll({
    attributes: { exclude: ['timer'] },
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
    throw HttpException.throwError(msg, 4002)
  }
  return result
}

// 创建分类
const SQLcreateSort = async (params) => {
  const hasSort = await _checkSort(params)
  if (!hasSort) {
    const newSort = await model.Sort.create(params)
    if (newSort instanceof model.Sort) {
      return { code: 0, msg: '创建分类成功' }
    }
  }
  throw HttpException.throwError(hasSort.msg, hasSort.code)
}

// 更新分类
const SQLupdateSort =async (params) => {
  const sort = await model.Sort.findOne({ where: { id: params.id} })
  if (sort instanceof model.Sort) {
    const updateData = { name: params.name, desc: params.desc, alias: params.alias, parentId: params.parentId }
    const result = await model.Sort.update(updateData, { where: { id: params.id } })
    if(result[0] === 1)
    return { code: 0, msg: '分类更新成功', data: null }
  }
}

// 删除分类
const SQLdeleteSort = async (params) => {
  if(params.id) {
    const sortChildren = await model.Sort.findAll({ where: { parentId: params.id } })

    if(sortChildren.length > 0) {
      throw HttpException.throwError('当前操作的分类存在子分类', 4005)
    }

    const result = await model.Sort.destroy({ where: { id: params.id } })
    if(result === 1) {
      return { code: 0, msg: '分类删除成功', data: null }
    }
  }
}

// 查询所有分类
const SQLquerySortList = async () => {
  const allSort = await model.Sort.findAll()
  return { code: 0, msg: '查询成功', data: allSort }
}


module.exports = {
  SQLcreateArticle,
  SQLqueryArticleList,
  SQLcreateSort,
  SQLupdateSort,
  SQLdeleteSort,
  SQLquerySortList
}