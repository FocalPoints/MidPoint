const queryString = require('query-string');
const fetch = require('node-fetch');
const apiController = {};




// YELP API

const yelpBaseEndpoint = 'https://api.yelp.com/v3';
const BEARER_TOKEN = 'txLO3bBnTwEQyijGIc16dCPLup1BOLnVZB-Vv-tqNkfdQFdK8Q5dSZ9JUSl_XjqZxVOCof3jqaeD7oA0YqWYriXzq-Jsn7dIdlZRV7ya9stnRcDIVk-VkSCI5N2KYXYx';
// SAMPLE FETCH URL
// 'https://api.yelp.com/v3/businesses/search?latitude=37.786882&longitude=-122.399972&categories=cafes&radius=1000&sort_by=rating&limit=3'

apiController.getYelp = (req, res, next) => {
  // console.log('REQUEST BODY', req.body);
  // console.log('stringified REQBODY: ', queryString.stringify(req.body));
  const stringQuery = queryString.stringify(req.body);

  const queryParams = 'categories=cafes&radius=1000&sort_by=rating&limit=3';

  fetch(`${yelpBaseEndpoint}/businesses/search?${stringQuery}&${queryParams}`, {
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
      Origin: 'localhost',
      withCredentials: true
    }
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log('RETURNED DATA FROM CONTROLLER: ', data);
      // console.log('ENTERED FETCH THEN BLOCK');
      const cafesArray = [];
      console.log('RETURNED DATA FROM CONTROLLER: ', data);
      data.businesses.forEach((cafe) => {
        const tempDetails = {};
        tempDetails.name = cafe.name;
        tempDetails.coordinates = cafe.coordinates;
        tempDetails.distance = cafe.distance;
        tempDetails.address = cafe.location.display_address;
        tempDetails.photo = cafe.image_url;
        cafesArray.push(tempDetails);
      })
      res.locals.cafes = cafesArray;

      return next();
    })
    .catch((err) => next(err));
}


// WEATHER API

const weatherBaseUrl = 'http://api.weatherapi.com/v1/forecast.json?';
const WEATHER_API_KEY = '0102687240c94dd6950160752211111';

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
      const weatherDetails = {};
      weatherDetails.name = data.location.name;
      weatherDetails.region = data.location.region;
      weatherDetails.localTime = data.location.localtime;
      weatherDetails.lastUpdated = data.current.last_updated;
      weatherDetails.tempC = data.current.temp_c;
      weatherDetails.tempF = data.current.temp_f;
      weatherDetails.condition = data.current.condition.text;
      weatherDetails.conditionImg = data.current.condition.icon;
      weatherDetails.windMph = data.current.wind_mph;
      weatherDetails.windKph = data.current.wind_kph;
      weatherDetails.precipMm =data.current.precip_mm;
      weatherDetails.precipIn =data.current.precip_in;
      weatherDetails.forecast = data.forecast.forecastday[0].hour;
      weatherDetails.alerts = data.alerts.alert;
      res.locals.weather = weatherDetails;

      return next();
    })
    .catch(err => {
      console.log('ERROR FETCHING FROM WEATHER API IN APICONTROLLER');
      return next(err);
    })
}


module.exports = apiController;