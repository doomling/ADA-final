var express = require('express');
var router = express.Router();
var productController = require('../controllers/productController')

router.get('/api/items', productController.getProducts);
router.get('/api/items/:id', productController.getProductById);


module.exports = router;
