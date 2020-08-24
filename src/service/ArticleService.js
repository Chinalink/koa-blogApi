/*
 * @Description: 文章相关Service
 * @Author: HuGang
 * @Date: 2020-07-31 15:25:07
 * @LastEditTime: 2020-08-24 18:19:09
 */ 

const sequelize = require('../base/dbConn');
const { Op } = require("sequelize");
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
      const lowerCaseModelName = modelName.toLowerCase()
      const { count, rows } = await Model[modelName].findAndCountAll({
        limit: query.pageSize,
        offset: (query.current - 1) * query.pageSize,
        order: [['createdAt', 'desc']],
        attributes: {
          include: [
            [
              sequelize.literal(`(
                SELECT COUNT(article.article_id) AS count
                FROM article AS article
                LEFT OUTER JOIN article_${lowerCaseModelName} AS article${modelName}
                INNER JOIN ${lowerCaseModelName} AS ${lowerCaseModelName}s
                ON ${lowerCaseModelName}.${lowerCaseModelName}_id = article${modelName}.${lowerCaseModelName}_id
                ON article.article_id = article${modelName}.article_id
                WHERE ${lowerCaseModelName}.${lowerCaseModelName}_id = article${modelName}.${lowerCaseModelName}_id
              )`),
              'articleTotal'
            ]
          ]
        },
        include: [
          { model: Model.Article, attributes: [], duplicating: false, through: { attributes: [] } },
        ],
        distinct: true
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
      // 多对多关联需使用事务保证成功执行，否则回滚
      return await sequelize.transaction(async (t) => {
        // 创建文章
        const newArticle = await Model.Article.create(params, { transaction: t })
        if (newArticle instanceof Model.Article) {
          // 分类关联操作
          if (params.category && params.category.length) {
            const sorts = await Model.Sort.findAll({ where: { id: { [Op.or]: params.category } } })
            await newArticle.setSorts(sorts, {transaction: t})
          } else {
            const sort = await Model.Sort.findOne({ where: { name: '未分类' } })
            await newArticle.setSorts(sort, {transaction: t})
          }
          // 标签关联操作
          if (params.tags && params.tags.length) {
            const isHaveTags = params.tags.filter(item => typeof item != 'object')
            const createTags = params.tags.filter(item => typeof item == 'object')
            if (isHaveTags.length) {
              const sorts = await Model.Tag.findAll(
                { where: { id: { [Op.or]: isHaveTags } } }, 
                { transaction: t }
              )
              await newArticle.setTags(findTags, {transaction: t})
            }
            if (createTags.length) {
              const res = await Model.Tag.bulkCreate(createTags, { ignoreDuplicates: true, transaction: t })
              await newArticle.setTags(res, {transaction: t})
            }
          }
          return new global.Success('创建文章成功').returnData()
        }
      })
    } catch (error) {
      console.log(error)
      // throw new global.ParameterException(error.errors[0].message)
    }
  }

  static async SQLqueryArticle(id) {
    const article = await Model.Article.findOne({ 
      where: { id },
      include: [
        { model: Model.User, attributes: ['id', 'nickName'], duplicating: false },
        { model: Model.Sort, attributes: ['id', 'name'], duplicating: false, through: { attributes: [] } },
        { model: Model.Tag, attributes: ['id', 'name'], duplicating: false, through: { attributes: [] } }
      ]
    })
    if (article) {
      return new global.Success('查询成功', article).returnData()
    } else {
      return new global.ParameterException('文章不存在').returnData()
    }
  }

  // 查询所有文章 
  static async SQLqueryArticleList(query) {
    const { count, rows } = await Model.Article.findAndCountAll({
      limit: query.pageSize,
      offset: (query.current - 1) * query.pageSize,
      attributes: { 
        include: [
          [sequelize.col('user.user_nick_name'), 'author']
        ],
        exclude: ['timer']
      },
      order: [['createdAt', 'desc']],
      // where: {
      //   title: { [Op.like]: '%foo%' }
      // },
      include: [
        { model: Model.User, attributes: [], duplicating: false },
        {
          model: Model.Sort,
          attributes: ['id', 'name'],
          duplicating: false,
          through: { attributes: [] }
        },
        {
          model: Model.Tag,
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