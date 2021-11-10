const queryString = require('query-string');
const fetch = require('node-fetch');
const apiController = {};


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
      // console.log('RETURNED DATA FROM CONTROLLER: ', data);
      data.businesses.forEach((cafe) => {
        const tempDetails = {};
        tempDetails.name = cafe.name;
        tempDetails.coordinates = cafe.coordinates;
        tempDetails.distance = cafe.distance;
        cafesArray.push(tempDetails);
      })
      res.locals.cafes = cafesArray;

      return next();
    })
    .catch((err) => next(err));
}

module.exports = apiController;