const { insertDataProduct } = require('../controllers/ProductController');
const router = require('express').Router();

router.post('/insertProduct', insertDataProduct);

module.exports = router;
