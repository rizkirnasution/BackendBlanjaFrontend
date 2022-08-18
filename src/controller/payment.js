const paymentModel = require("../models/payment");
const commonHelper = require('../helper/common')
const paymentController = {

  searchKeywordsPayment: async (request, response) => {
    try {
      const keywords = "" || request.query.keyword;
      const result = await paymentModel.searchKeywordsPayment(keywords);
      response.status(200).json({
        data: result.rows,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getAllPaymentLimit: async(req, res) => {
    try{
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || 5
      const offset = (page - 1) * limit
      const sortby = req.query.sortby || "amount"
      const sort = req.query.sort || "ASC"
      console.log(sort);
      const result = await paymentModel.selectAllPaymentLimit({limit,offset,sort,sortby})
      const {rows: [count]} = await paymentModel.countPayment()
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
  getAllPayment: (req, res) => {
    paymentModel
    .selectAll()
      .then(
        result => commonHelper.response(res, result.rows, 200, "get All data success")
      )
      .catch(err => res.send(err)
      )
  },
  getPayment: (req, res) => {
    const id = Number(req.params.id)
    paymentModel.select(id)
      .then(
        result => commonHelper.response(res, result.rows, 200, "get data success")
      )
      .catch(err => res.send(err)
      )
  },
  insert: (req, res) => {
    const { id, amount } = req.body
    paymentModel.insert(id, amount)
      .then(
        result => commonHelper.response(res, result.rows, 201, "Payment created")
      )
      .catch(err => res.send(err)
      )
  },
  update: (req, res) => {
    const id = Number(req.params.id)
    const amount = req.body.amount
    paymentModel.update(id, amount)
      .then(
        result => commonHelper.response(res, result.rows, 200, "Payment updated")
      )
      .catch(err => res.send(err)
      )
  },
  delete: (req, res) => {
    const id = Number(req.params.id)
    paymentModel.deletePayment(id)
      .then(
        result => commonHelper.response(res, result.rows, 200, "Payment deleted")
      )
      .catch(err => res.send(err)
      )
  }
};

module.exports = paymentController;