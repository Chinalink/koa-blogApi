/*
 * @Description: 工具类
 * @Author: HuGang
 * @Date: 2020-08-05 22:58:19
 * @LastEditTime: 2020-08-23 14:52:39
 */
const utils = {
  // 创建随机字符串
  randomString(e) {
    e = e || 32
    const t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz1234567890'
    const len = t.length
    let result = ''
    for (let i = 0; i < e; i++) {
      result += t.charAt(Math.floor(Math.random() * len))
    }
    return result
  },
  pathToTreeList(data) {
    const result = []
    data.forEach(item => {
      this.createTreeNode(item, result)
    })
    return result
  },
  createTreeNode(obj, arr) {
    let splitpath = obj.name.split('/')
    const imgName = splitpath.pop()
    let parentTree = arr
    splitpath.map((path, pathIndex, splitpathArr) => {
      let Index = parentTree.findIndex(item => item.name === path)

      if (Index === -1) {
        let node = { name: path, type: 'directory' }
        node.children = []
        if (pathIndex === splitpathArr.length - 1) {
          node.children.push(obj)
        }
        parentTree.push(node)
      } else {
        if (pathIndex === splitpathArr.length - 1) {
          parentTree[Index].children.push(obj)
        }
      }
      let index = Index > -1 ? Index : parentTree.length - 1
      parentTree = parentTree[index].children
    })
  }
}

module.exports = utils