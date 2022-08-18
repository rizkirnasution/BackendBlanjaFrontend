const detailTransModel = require('../models/detailtransactions')
const commonHelper = require('../helper/common')
const detailTransactionsController = {  

  searchKeywordsDetTrans: async (request, response) => {
    try {
      const keywords = "" || request.query.keyword;
      const result = await detailTransModel.searchKeywordsDetTrans(keywords);
      response.status(200).json({
        data: result.rows,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getAllDetTransLimit: async(req, res) => {
    try{
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || 5
      const offset = (page - 1) * limit
      const sortby = req.query.sortby || "total"
      const sort = req.query.sort || "ASC"
      console.log(sort);
      const result = await detailTransModel.selectAllDetTransLimit({limit,offset,sort,sortby})
      const {rows: [count]} = await detailTransModel.countDetTrans()
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
  getAllDetTrans: (req, res) => {
    detailTransModel
    .selectAll()
      .then(
        result => commonHelper.response(res, result.rows, 200, "get All data success")
      )
      .catch(err => res.send(err)
      )
  },
  getDetTrans: (req, res) => {
    const id = Number(req.params.id)
    detailTransModel.select(id)
      .then(
        result => commonHelper.response(res, result.rows, 200, "get data success")
      )
      .catch(err => res.send(err)
      )
  },
  insert: (req, res) => {
    const { id, total, payment_id } = req.body;
    detailTransModel
      .insert(id, total, payment_id)
      .then(
        result => commonHelper.response(res, result.rows, 201, "Detail Transactions created")
      )
      .catch(err => res.send(err)
      )
  },
  update: (req, res) => {
    const id = Number(req.params.id)
    const {total, payment_id } = req.body;
    detailTransModel
      .update(id, total, payment_id )
      .then(
        result => commonHelper.response(res, result.rows, 200, "Detail Transactions updated")
      )
      .catch(err => res.send(err)
      )
  },
  delete: (req, res) => {
    const id = Number(req.params.id)
    detailTransModel.deleteDetTrans(id)
      .then(
        result => commonHelper.response(res, result.rows, 200, "Detail Transactions deleted")
      )
      .catch(err => res.send(err)
      )
  }
}

module.exports = detailTransactionsController
