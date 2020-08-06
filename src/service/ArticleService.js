/*
 * @Description: 文章相关Service
 * @Author: HuGang
 * @Date: 2020-07-31 15:25:07
 * @LastEditTime: 2020-08-07 00:03:00
 */ 

const { Op, where } = require("sequelize");
var model = require('../module');

class ArticleService {
  // 创建分类
  static async SQLcreateSort(params) {
    try {
      const hasSort = await ArticleService.checkSort(params)
      if (!hasSort) {
        const newSort = await model.Sort.create(params)
        if (newSort instanceof model.Sort) {
          return new global.Success('创建分类成功').returnData()
        }
      }
    } catch (error) {
      throw new global.ParameterException(error.errors[0].message)
    }
  }

  // 删除分类
  static async SQLdeleteSort(params) {
    if (params.id) {
      const sortChildren = await model.Sort.findAll({ where: { parentId: params.id } })

      if (sortChildren.length > 0) {
        throw new global.ParameterException('当前操作的分类存在子分类')
      }

      const result = await model.Sort.destroy({ where: { id: params.id } })
      if (result === 1) {
        return new global.Success('分类删除成功', allSort).resultData()
      }
    }
  }

  // 更新分类
  static async SQLupdateSort(params) {
    const sort = await model.Sort.findOne({ where: { id: params.id } })
    if (sort instanceof model.Sort) {
      const updateData = { name: params.name, desc: params.desc, alias: params.alias, parentId: params.parentId }
      const result = await model.Sort.update(updateData, { where: { id: params.id } })
      if (result[0] === 1)
        return new global.Success('分类更新成功', allSort).resultData()
    }
  }

  // 查询所有分类
  static async SQLquerySortList() {
    const allSort = await model.Sort.findAll()
    return new global.Success('查询成功', allSort).resultData()
  }

  // 判断分类是否存在或别名重复
  async checkSort(params) {
    try {
      let result = null
      let queryOptions = { name: params.name }
      if (params.alias) {
        queryOptions.alias = params.alias
      }
      const oneSort = await model.Sort.findOne({ where: { [Op.or]: queryOptions } })
      if (oneSort) {
        const msg = oneSort.name == params.name ? '已存在同名分类' : '已存在相同的分类别名'
        return new global.ParameterException(msg)
      }
      return result
    } catch (error) {
      // console.log(error)
      // throw new global.ParameterException(error.errors[0].message)
    }
    
  }

  // 创建文章
  static async SQLcreateArticle(params) {
    try {
      const newArticle = await model.Atricle.create(params)

      if (newArticle instanceof model.Atricle) {
        const sorts = await model.Sort.findAll({ where: { id: params.category } })
        await newArticle.setSorts(sorts)
        return new global.Success('创建文章成功').resultData()
      }
    } catch (error) {
      console.log(error)
    }
  }

  // 查询所有文章 
  static async SQLqueryArticleList() {
    const allPost = await model.Atricle.findAll({
      attributes: { exclude: ['timer'] },
      order: [ ['createdAt', 'desc'] ],
      include: [
        {
          model: model.Sort,
          attributes: ['id', 'name'],
          through: { attributes: [] }
        }
      ]
    })
    return new global.Success('查询成功', allPost).resultData()
  }
}

module.exports = ArticleService