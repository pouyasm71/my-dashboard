const express = require('express');
const router = express.Router();
const { getAll } = require('../controllers/exampleController');

router.get('/', getAll);

module.exports = router;
