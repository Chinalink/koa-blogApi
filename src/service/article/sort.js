/*
 * @Description: 
 * @Author: HuGang
 * @Date: 2020-07-25 14:13:20
 * @LastEditTime: 2020-07-25 16:45:23
 */ 

// 查询
var HttpException = require('../../lib/httpException');
const { Op } = require("sequelize");
var SortModel = require('../../module/sort');

 // 判断分类是否存在或别名重复
const checkSort = async (params) => {
  let result = null
  let queryOptions = { sort_name: params.sort_name }
  if (params.alias) {
    queryOptions.sort_alias = params.sort_name
  }
  const oneSort = await SortModel.findOne({ where: { [Op.or]: queryOptions } })
  if (oneSort) {
    const msg = oneSort.sort_name == params.sort_name ? '父级分类中已存在同名分类' : '父级分类中已存在相同别名的分类'
    result = { msg, code: 4001}
  }
  return result
}

// 创建分类
const createSort = async (params) => {
  const hasSort = await checkSort(params)
  if(!hasSort) {
    const newSort = await SortModel.create(params)
    if (newSort instanceof SortModel) {
      return { code: 1, msg: '创建分类成功' }
    }
  }
  throw HttpException.throwError(hasSort.msg, hasSort.code)
}

const queryAllSort = async () => {
  const allSort = await SortModel.findAll()
  return { code: 1, msg: '查询成功', data: allSort }
}



module.exports = {
  createSort,
  queryAllSort
}