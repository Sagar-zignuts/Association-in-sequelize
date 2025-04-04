const { insertDataInUser } = require('../controllers/UserController');
const router = require('express').Router();

router.post('/InsertUser', insertDataInUser);

module.exports = router;
