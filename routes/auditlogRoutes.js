const express = require('express');
const router = express.Router();
const auditlogController = require('../controllers/auditlogController');


router.get('/', auditlogController.index);






module.exports = router;