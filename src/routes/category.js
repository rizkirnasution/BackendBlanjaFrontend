const express = require('express');
const router = express.Router();
const categoryController = require('../controller/category');
const {protect} = require('../middleware/auth')
const {authorisSeller, authorBuyer} = require('../middleware/authorizations')

router.get('/search/', protect, authorBuyer, categoryController.searchKeywordsCategory);
router.get('/pagination', protect, authorisSeller, categoryController.getAllCategoryLimit);
router.get('/', protect, authorisSeller, categoryController.getAllCategory);
router.get('/:id', protect, authorisSeller, categoryController.getCategory);
router.post('/', protect, authorisSeller,categoryController.insert);
router.put('/:id', protect, authorisSeller, categoryController.update);
router.delete('/:id', protect, authorisSeller,  categoryController.delete);

module.exports = router