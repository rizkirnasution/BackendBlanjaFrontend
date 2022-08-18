const express = require('express');
const router = express.Router();
const detailTransactionsController = require('../controller/detailtransactions');

router.get('/search/', detailTransactionsController.searchKeywordsDetTrans);
router.get('/pagination', detailTransactionsController.getAllDetTransLimit);
router.get('/',detailTransactionsController.getAllDetTrans);
router.get('/:id',detailTransactionsController.getDetTrans);
router.post('/',detailTransactionsController.insert);
router.put('/:id',detailTransactionsController.update);
router.delete('/:id',detailTransactionsController.delete);

module.exports = router