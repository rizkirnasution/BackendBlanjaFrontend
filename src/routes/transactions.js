const express = require('express');
const router = express.Router();
const transactionsController = require('../controller/transactions');
const {protect} = require('../middleware/auth')
const {authorisAdmin, authorisSeller} = require('../middleware/authorizations')

router.get("/search/", authorisAdmin,protect, transactionsController.searchKeywordsTransactions);
router.get('/pagination/',authorisSeller,protect, transactionsController.getAllTransactionsLimit);
router.get('/', protect, authorisSeller, transactionsController.getAllTransactions);
router.get('/:id', protect, authorisAdmin, transactionsController.getTransactions);
router.post('/', protect, authorisSeller,transactionsController.insert);
router.put('/:id', protect, authorisSeller,transactionsController.update);
router.delete('/:id', protect,authorisSeller, transactionsController.delete);

module.exports = router