const {
  insertDataInUser,
  getDataViaOrder,
} = require('../controllers/ManageData');
const router = require('express').Router();

router.post('/InsertUser', insertDataInUser);

module.exports = router;
