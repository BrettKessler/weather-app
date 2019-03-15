const express = require('express');
const router = express.Router();
const MainController = require('../controllers/main');

router.get('/getweather', MainController.loadWeather);
router.get('/getlocation', MainController.getLocation);

module.exports = router;
