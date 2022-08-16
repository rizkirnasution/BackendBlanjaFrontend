const categoryModel = require('../models/category')
const commonHelper = require('../helper/common')
const categoryController = {  

getAllCategory: async(req, res) => {
    try{
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || 5
      const offset = (page - 1) * limit
      const sortby = req.query.sortby || name
      const sort = req.query.sort.toUpperCase() || "ASC"
      console.log(sort);
      const result = await categoryModel.selectAll({limit,offset,sort,sortby})
      const {rows: [count]} = await categoryModel.countCategory()
      const totalData = parseInt(count.count)
      const totalPage = Math.ceil(totalData/limit)
      const pagination ={     
            currentPage : page,
            limit:limit,
            totalData:totalData,
            totalPage:totalPage
          }
      commonHelper.response(res, result.rows, 200, "get data success",pagination)
    }catch(error){
      console.log(error);
    }
  },
  getCategory: (req, res) => {
    const id = Number(req.params.id)
    categoryModel.select(id)
      .then(
        result => commonHelper.response(res, result.rows, 200, "get data success")
      )
      .catch(err => res.send(err)
      )
  },
  insert: (req, res) => {
    const { id, name } = req.body
    categoryModel.insert(id, name)
      .then(
        result => commonHelper.response(res, result.rows, 201, "Category created")
      )
      .catch(err => res.send(err)
      )
  },
  update: (req, res) => {
    const id = Number(req.params.id)
    const name = req.body.name
    categoryModel.update(id, name)
      .then(
        result => commonHelper.response(res, result.rows, 200, "Category updated")
      )
      .catch(err => res.send(err)
      )
  },
  delete: (req, res) => {
    const id = Number(req.params.id)
    categoryModel.deleteCategory(id)
      .then(
        result => commonHelper.response(res, result.rows, 200, "Category deleted")
      )
      .catch(err => res.send(err)
      )
  }
}

module.exports = categoryController
