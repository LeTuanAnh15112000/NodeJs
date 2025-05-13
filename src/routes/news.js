const express = require('express');
const router = express.Router();
const newsController = require('../app/controllers/NewsController');

router.use('/:slug', newsController.show); // Route to show a specific news article based on the slug
router.use('/', newsController.index); // Route to show a specific news article based on the slug

module.exports = router;
