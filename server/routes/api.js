const express = require('express');
const apiController = require('../controllers/apiController');
const router = express.Router();

// SETTING UP API ROUTER IN CASE WE WANT TO ADD MORE API'S LIKE WEATHER, PUBLIC TRANSPORTATION

router.post('/api', apiController.getYelp, (req, res) => {
  console.log('api route hit');
  console.log('FORMATTED DATA: ', res.locals.cafes);
  return res.status(200).json(res.locals.cafes);
})



module.exports = router;

