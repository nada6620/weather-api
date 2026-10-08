const express = require('express');
const router = express.Router();

const weatherController = require('../controller/weatherController');
router.get('/:city',weatherController.getWeatherData);

module.exports = router;