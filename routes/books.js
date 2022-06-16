const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

let bookController = require('../controllers/book.controller');

// get data from google
router.get('/gbooks/:query', bookController.searchGbooks);


module.exports = router;