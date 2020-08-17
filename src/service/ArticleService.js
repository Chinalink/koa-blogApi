/*
 * @Description: 文章相关Service
 * @Author: HuGang
 * @Date: 2020-07-31 15:25:07
 * @LastEditTime: 2020-08-17 20:09:59
 */ 

const { Op, Sequelize } = require("sequelize");
var Model = require('../model');

class ArticleService {
  // 创建分类 Or 标签
  static async SQLcreateSortOrTag(params, modelName, msgType) {
    try {
      const hasSortOrTag = await ArticleService.checkTagOrSort(params, modelName, msgType)
      if (!hasSortOrTag) {
        const newSortOrTag = await Model[modelName].create(params)
        if (newSortOrTag instanceof Model[modelName]) {
          return new global.Success(`创建${msgType}成功`).returnData()
        }
      }
      return new global.ParameterException(hasSortOrTag).returnData()
    } catch (error) {
      throw new global.ParameterException(error.errors[0].message)
    }
  }

  // 删除分类
  static async SQLdeleteSort(params) {
    if (params.id) {
      const sortChildren = await Model.Sort.findAll({ where: { parentId: params.id } })

      if (sortChildren.length > 0) {
        throw new global.ParameterException('当前操作的分类存在子分类')
      }

      const result = await Model.Sort.destroy({ where: { id: params.id } })
      if (result === 1) {
        return new global.Success('操作成功').returnData()
      }
    }
  }

  // 删除标签
  static async SQLdeleteTag(params) {
    if (params.id) {
      const result = await Model.Tag.destroy({ where: { id: params.id } })
      if (result === 1) {
        return new global.Success('操作成功').returnData()
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
        return new global.Success('操作成功').returnData()
      }
    }
  }

  // 更新标签
  static async SQLupdateTag(params) {
    const sort = await Model.Tag.findOne({ where: { id: params.id } })
    if (sort instanceof Model.Tag) {
      const updateData = { name: params.name, alias: params.alias }
      const result = await Model.Tag.update(updateData, { where: { id: params.id } })
      if (result[0] === 1) {
        return new global.Success('操作成功').returnData()
      }
    }
  }

  // 查询所有分类
  static async SQLquerySortOrTagList(query, modelName) {
    try {
      const { count, rows } = await Model[modelName].findAndCountAll({
        limit: query.pageSize,
        offset: (query.current - 1) * query.pageSize,
        order: [['createdAt', 'desc']],
        attributes: {
          include: [
            [
              Sequelize.literal(`(                    
                SELECT COUNT(article.article_id) AS count                 
                FROM article AS article
                INNER JOIN article_${modelName.toLowerCase()} AS article${modelName}
                ON article.article_id = article${modelName}.article_id
              )`),
              'articleTotal'
            ]
          ]
        }
      })

      const result = { result: rows, total: count }
      return new global.Success('查询成功', result).returnData()
    } catch (error) {
      throw new global.Success(error)
    }
  }

  // 判断分类是否存在或别名重复
  static async checkTagOrSort(params, model, msgType) {
    let result = null
    let queryOptions = { name: params.name }
    if (params.alias) {
      queryOptions.alias = params.alias
    }
    const oneSort = await Model[model].findOne({ where: { [Op.or]: queryOptions } })
    if (oneSort) {
      const msg = oneSort.name == params.name ? `已存在同名${msgType}` : `已存在相同的${$msgType}别名`
      return msg
    }
    return result
  }

  // 创建文章
  static async SQLcreateArticle(params) {
    try {
      const newArticle = await Model.Article.create(params)

      if (newArticle instanceof Model.Article) {
        const sorts = await Model.Sort.findAll({ where: { id: params.category } })
        await newArticle.setSorts(sorts)
        return new global.Success('创建文章成功').returnData()
      }
    } catch (error) {
      throw new global.ParameterException(error.errors[0].message)
    }
  }

  // 查询所有文章 
  static async SQLqueryArticleList(query) {
    const { count, rows } = await Model.Article.findAndCountAll({
      limit: query.pageSize,
      offset: (query.current - 1) * query.pageSize,
      attributes: { exclude: ['timer'] },
      order: [['createdAt', 'desc']],
      // where: {
      //   title: { [Op.like]: '%foo%' }
      // },
      include: [
        {
          model: Model.Sort,
          attributes: ['id', 'name'],
          duplicating: false,
          through: { attributes: [] }
        }
      ]
    });
    const result = { result: rows, total: count }
    return new global.Success('查询成功', result).returnData()
  }
}

module.exports = ArticleService