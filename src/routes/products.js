const express = require('express');
const router = express.Router();
const productsController = require('../controller/products');

router.get('/search/', productsController.searchKeywordsProducts);
router.get('/pagination/', productsController.getAllProductsLimit);
router.get('/',productsController.getAllProducts);
router.get('/:id',productsController.getProducts);
router.post('/',productsController.insert);
router.put('/:id',productsController.update);
router.delete('/:id',productsController.delete);

module.exports = router