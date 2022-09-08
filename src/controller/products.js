const createError = require('http-errors')
const productsModel = require('../models/products')
const commonHelper = require('../helper/common')
const client = require('../config/redis')
const productsController = {  

  searchKeywordsProducts: async (request, response) => {
    try {
      const keywords = "" || request.query.search;
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
        result => {
          client.setEx(`products/${id}`,60*60,JSON.stringify(result.rows))
          commonHelper.response(res, result.rows, 200, "get data success from database")
        }
      )
      .catch(err => res.send(err)
      )
  },
  insert: async(req, res) => {
    const PORT = process.env.PORT || 5000
    const DB_HOST = process.env.DB_HOST || 'localhost'
    const photo = req.file.filename;
    const { name, stock, price, descriptions, category_id, transactions_id, merk, condition} = req.body
    const {rows: [count]} = await productsModel.countProducts()
    const id = Number(count.count)+1;

    const data ={
      id,
      name,
      stock,
      price,
      photo:`http://${DB_HOST}:${PORT}/img/${photo}`,
      descriptions,
      category_id,
      transactions_id,
      merk, condition
    }
    productsModel.insert(data)
      .then(
        result => commonHelper.response(res, result.rows, 201, "Product created")
      )
      .catch(err => res.send(err)
      )
  },
  update: async(req, res, next) => {
    try{
      const PORT = process.env.PORT || 5000
      const DB_HOST = process.env.DB_HOST || 'localhost'
      const id = Number(req.params.id)
      const photo = req.file.filename;
      const { name,stock,price,descriptions, category_id, transactions_id, merk, condition} = req.body
      const {rowCount} = await productsModel.findId(id)
      if(!rowCount){
        return next(createError(403,"ID is Not Found"))
      }
      const data ={
        id,
        name,
        stock,
        price,
        photo:`http://${DB_HOST}:${PORT}/img/${photo}`,
        descriptions,
        category_id, 
        transactions_id,
        merk,
        condition
      }
      productsModel.update(data)
        .then(
          result => commonHelper.response(res, result.rows, 200, "Product updated")
          )
          .catch(err => res.send(err)
          )
        }catch(error){
          console.log(error);
        }
  },
  delete: async(req, res, next) => {
    try{
      const id = Number(req.params.id)
      const {rowCount} = await productsModel.findId(id)
      if(!rowCount){
        return next(createError(403,"ID is Not Found"))
      }
      productsModel.deleteProducts(id)
        .then(
          result => commonHelper.response(res, result.rows, 200, "Product deleted")
        )
        .catch(err => res.send(err)
        )
    }catch(error){
        console.log(error);
    }
  }
}

module.exports = productsController
