var express = require('express');
var router = express.Router();
var productController = require('../controllers/productController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/items', productController.getProducts);
router.get('/api/items/:id/description', productController.getProductById);


module.exports = router;
