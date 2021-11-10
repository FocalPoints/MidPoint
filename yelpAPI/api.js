// import for converting query params
import { tsNamespaceExportDeclaration } from '@babel/types';
import queryString from 'query-string';

// import for frontend
import { useState, useEffect } from 'react';

const yelpBaseEndpoint = 'https://api.yelp.com/v3';
const BEARER_TOKEN = 'txLO3bBnTwEQyijGIc16dCPLup1BOLnVZB-Vv-tqNkfdQFdK8Q5dSZ9JUSl_XjqZxVOCof3jqaeD7oA0YqWYriXzq-Jsn7dIdlZRV7ya9stnRcDIVk-VkSCI5N2KYXYx';
z

// sample fetch url  :  https://api.yelp.com/v3/businesses/search?latitude=37.786882&longitude=-122.399972

/*
Fetch request should be made after midpoint is calculated
Fetched data(nearby restaurants) rendered in Main component

Format response file on backend to include:
  Name
  Address
  Picture

Fetch request might need to be made in the front end, after retrieving key from backend.
POST request with lat/lng. Return array of 3 cafes from backend.

*/



// HELPER FUNCTION TO MAKE PROPERLY FORMATTED REQUEST TO YELP API ENDPOINT
const getYelp = (path, queryParams) => {
  const query = queryString.stringify(queryParams); // converts queryParams to url format 
  const yelpData = fetch(`${yelpBaseEndpoint}${path}${query}`, {
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
      Origin: 'localhost',
      withCredentials: true
    }
  })
  return yelpData;
}

// backend get route to '/api'
const fetchData = async () => {
  try {
    const rawData = await getYelp('/business/search', searchParams);
    const res = await rawData.json();
    setBusinesses(res.businesses);
    setTotalBusinesses(res.total);
  } catch(err) {
    return next(err);
  }
}

// REDUX APPROACH 
// Need to add new action, actionTypes, initialState
const searchBusinesses = (lat, lng) => (dispatch) => {
  const request = {
    method: 'GET',
    url: '/api',
    params: {lat, lng}
  }
 
  axios.request(request).then((response) => {
    if(response.status = 201) dispatch({
      type: types.YELP_API,
      payload: response.data, // response.data should return array of 3 cafes
    });
  }).catch(console.error);
};


// REACT HOOKS APPROACH
const searchBusinesses = (latitude, longitude) => {
  const [businesses, setBusinesses] = useState([]);
  const [totalBusinesses, setTotalBusinesses] = useState();
  const [searchParams, setSearchParams] = useState(latitude, longitude);

  useEffect(() => {
    fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(geolocation)
    })
      .then(res => res.json())
      .then(cafes => {
        console.log('RETRIEVED FROM YELP API: ', cafes)
        setBusinesses(cafes);
      })
      .catch(err => { console.log(err) });
    }, [searchParams])
  return;
}

// SERVER SIDE LOGIC
app.get('/api', async (req, res, next) => {
  console.log('/api REACHED');
  try {
    console.log('TRY BLOCK ENTERED');
    terminal.write('TRY BLOCK ENTERED');
    const rawData = await fetch('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=37.786882&longitude=-122.399972', {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        Origin: 'localhost',
        withCredentials: true
      }
    })
    const fetchedCafes = rawData.businesses.filter((business) => business.categories.alias === 'coffee')
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3);
    res.locals.businesses = fetchedCafes;
    return next();

  } catch(err) {
    console.log('ERROR MAKING FETCH REQUEST');
  }

    // .then(res => {
    //   console.log('API GET RESPONSE: ');
    //   return next(res);
    // })
    // .catch(err => {
    //   console.log('BACKEND FETCH ERROR');
    //   return next(err);
    // })
}, (err, req, res, next) => {
  return res.status(200);
})



// IF ALL IS WORKING TRY TO ADD A WEATHER API FOR CURRENT FORECAST
// weatherapi.com