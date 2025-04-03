const { insertDataProduct } = require('../controllers/ManageData');
const router = require('express').Router();

router.post('/insertProduct', insertDataProduct);

module.exports = router;
