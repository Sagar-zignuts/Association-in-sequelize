const router = require('express').Router();
const {
  insertDataOrder,
  getDataViaOrder,
} = require('../controllers/OrderController');

router.post('/insertOrder', insertDataOrder);
router.get('/getAllOrder', getDataViaOrder);
module.exports = router;
