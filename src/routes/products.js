const express = require('express');
const router = express.Router();
const productsController = require('../controller/products');
const upload = require('../middleware/upload')
const {protect} = require('../middleware/auth')
const {hitCacheProductsDetail, clearCacheProductsDetail} = require('../middleware/redis')
const {authorisSeller, authorBuyer} = require('../middleware/authorizations')

router.get('/search/', authorBuyer, protect, productsController.searchKeywordsProducts);
router.get('/pagination/',authorisSeller, protect, productsController.getAllProductsLimit);
router.get('/',protect, authorisSeller, productsController.getAllProducts);
router.get('/:id', protect,authorisSeller,hitCacheProductsDetail, productsController.getProducts);
router.post('/', authorisSeller, protect,upload.single('photo'), productsController.insert);
router.put('/:id', authorisSeller, protect, clearCacheProductsDetail, upload.single('photo'), productsController.update);
router.delete('/:id', authorisSeller,protect, clearCacheProductsDetail, productsController.delete);

module.exports = router