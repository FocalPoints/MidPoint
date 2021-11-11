const apiController = require("../../server/controllers/apiController");


router.post('/weather', apiController.getWeather, (req, res) => {
  console.log('WEATHER DATA: ', res.locals.weather);
  return res.status(200).json(res.locals.weather);
});


const WEATHER_API_KEY = '0102687240c94dd6950160752211111';
const weatherBaseUrl = 'http://api.weatherapi.com/v1/forecast.json?';

// example fetch route
// http://api.weatherapi.com/v1/current.json?key=<YOUR_API_KEY>&q=London
// alerts=yes parameter

apiController.getWeather = (req, res, next) => {
  const { lat, lng } = req.body;
  const keyString = `key=${WEATHER_API_KEY}&`;
  const queryParams = `q=${lat},${lng}&days=1&aqi=yes&alerts=yes`;
  fetch(`${weatherBaseUrl}${keyString}${queryParams}`)
    .then(res => res.json())
    .then(data => {
      console.log('RETRIEVED FROM API CALL: ', data);
      res.locals.weather = data;
    })
    .catch(err => {
      console.log('ERROR FETCHING FROM WEATHER API IN APICONTROLLER');
      return next(err);
    })
}