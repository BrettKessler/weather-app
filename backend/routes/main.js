const express = require('express');
const router = express.Router();
const MainController = require('../controllers/main');

router.get('/getweather', MainController.loadWeather);

module.exports = router;
