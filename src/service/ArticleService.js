/*
 * @Description: 文章相关Service
 * @Author: HuGang
 * @Date: 2020-07-31 15:25:07
 * @LastEditTime: 2020-08-08 23:56:54
 */ 

const { Op, where } = require("sequelize");
var Model = require('../model');

class ArticleService {
  // 创建分类
  static async SQLcreateSort(params) {
    try {
      const hasSort = await ArticleService.checkSort(params)
      if (!hasSort) {
        const newSort = await Model.Sort.create(params)
        if (newSort instanceof Model.Sort) {
          return new global.Success('创建分类成功').returnData()
        }
      }
    } catch (error) {
      throw new global.ParameterException(error.errors[0].message)
    }
  }

  // 删除分类
  static async SQLdeleteSort(params) {
    console.log(params.id)
    if (params.id) {
      const sortChildren = await Model.Sort.findAll({ where: { parentId: params.id } })

      if (sortChildren.length > 0) {
        throw new global.ParameterException('当前操作的分类存在子分类')
      }

      const result = await Model.Sort.destroy({ where: { id: params.id } })
      if (result === 1) {
        return new global.Success('分类删除成功', allSort).returnData()
      }
    }
  }

  // 更新分类
  static async SQLupdateSort(params) {
    const sort = await Model.Sort.findOne({ where: { id: params.id } })
    if (sort instanceof Model.Sort) {
      const updateData = { name: params.name, desc: params.desc, alias: params.alias, parentId: params.parentId }
      const result = await Model.Sort.update(updateData, { where: { id: params.id } })
      if (result[0] === 1) {
        return new global.Success('分类更新成功', allSort).returnData()
      }
    }
  }

  // 查询所有分类
  static async SQLquerySortList() {
    const allSort = await Model.Sort.findAll()
    return new global.Success('查询成功', allSort).returnData()
  }

  // 判断分类是否存在或别名重复
  static async checkSort(params) {
    let result = null
    let queryOptions = { name: params.name }
    if (params.alias) {
      queryOptions.alias = params.alias
    }
    const oneSort = await Model.Sort.findOne({ where: { [Op.or]: queryOptions } })
    if (oneSort) {
      const msg = oneSort.name == params.name ? '已存在同名分类' : '已存在相同的分类别名'
      throw new global.ParameterException(msg)
    }
    return result
  }

  // 创建文章
  static async SQLcreateArticle(params) {
    try {
      const newArticle = await Model.Atricle.create(params)

      if (newArticle instanceof Model.Atricle) {
        const sorts = await Model.Sort.findAll({ where: { id: params.category } })
        await newArticle.setSorts(sorts)
        return new global.Success('创建文章成功').returnData()
      }
    } catch (error) {
      throw new global.ParameterException(error.errors[0].message)
    }
  }

  // 查询所有文章 
  static async SQLqueryArticleList() {
    const allPost = await Model.Atricle.findAll({
      attributes: { exclude: ['timer'] },
      order: [ ['createdAt', 'desc'] ],
      include: [
        {
          model: Model.Sort,
          attributes: ['id', 'name'],
          through: { attributes: [] }
        }
      ]
    })
    return new global.Success('查询成功', allPost).returnData()
  }
}

module.exports = ArticleService