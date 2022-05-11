var express = require('express');
const { addUser, getAllUser } = require('../controllers/user.controller');
var router = express.Router();

router.get('/generate_user_sheet', getAllUser)
router.post('/add', addUser);

module.exports = router;
