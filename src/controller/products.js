const productsModel = require('../models/products')
const commonHelper = require('../helper/common')
const productsController = {  

  searchKeywordsProducts: async (request, response) => {
    try {
      const keywords = "" || request.query.keyword;
      const result = await productsModel.searchKeywordsProducts(keywords);
      response.status(200).json({
        data: result.rows,
      });
    } catch (error) {
      console.log(error);
    }
  },

  getAllProductsLimit: async(req, res) => {
    try{
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || 5
      const offset = (page - 1) * limit
      const sortby = req.query.sortby || "name"
      const sort = req.query.sort || "ASC"
      console.log(sort);
      const result = await productsModel.selectAllProductsLimit({limit,offset,sort,sortby})
      const {rows: [count]} = await productsModel.countProducts()
      const totalData = parseInt(count.count)
      const totalPage = Math.ceil(totalData/limit)
      const pagination ={     
            currentPage : page,
            limit:limit,
            totalData:totalData,
            totalPage:totalPage
          }
      commonHelper.response(res, result.rows, 200, "get All Limit data success",pagination)
    }catch(error){
      console.log(error);
    }
  },
  getAllProducts: (req, res) => {
    productsModel
    .selectAll()
      .then(
        result => commonHelper.response(res, result.rows, 200, "get All data success")
      )
      .catch(err => res.send(err)
      )
  },
  getProducts: (req, res) => {
    const id = Number(req.params.id)
    productsModel.select(id)
      .then(
        result => commonHelper.response(res, result.rows, 200, "get data success")
      )
      .catch(err => res.send(err)
      )
  },
  insert: (req, res) => {
    const { id, name, stock, price, category_id, transactions_id } = req.body;
    productsModel
      .insert(id, name, stock, price, category_id, transactions_id)
      .then(
        result => commonHelper.response(res, result.rows, 201, "Products created")
      )
      .catch(err => res.send(err)
      )
  },
  update: (req, res) => {
    const id = Number(req.params.id)
    const { name, stock, price, category_id, transactions_id } = req.body;
    productsModel
      .update(id, name, stock, price, category_id, transactions_id)
      .then(
        result => commonHelper.response(res, result.rows, 200, "Products updated")
      )
      .catch(err => res.send(err)
      )
  },
  delete: (req, res) => {
    const id = Number(req.params.id)
    productsModel.deleteProducts(id)
      .then(
        result => commonHelper.response(res, result.rows, 200, "Products deleted")
      )
      .catch(err => res.send(err)
      )
  }
}

module.exports = productsController
