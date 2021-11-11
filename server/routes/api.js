const express = require('express');
const apiController = require('../controllers/apiController');
const router = express.Router();

// SETTING UP API ROUTER IN CASE WE WANT TO ADD MORE API'S LIKE WEATHER, PUBLIC TRANSPORTATION

router.post('/yelp', apiController.getYelp, (req, res) => {
  // console.log('api route hit');
  console.log('YELP FORMATTED DATA: ', res.locals.cafes);
  return res.status(200).json(res.locals.cafes);
})


router.post('/weather', apiController.getWeather, (req, res) => {
  console.log('REACHED END OF WEATHER ROUTER');
  console.log('WEATHER DATA: ', res.locals.weather);
  return res.status(200).json(res.locals.weather);
});


module.exports = router;

