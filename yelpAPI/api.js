// import for converting query params
import { tsNamespaceExportDeclaration } from '@babel/types';
import queryString from 'query-string';

// import for frontend
import { useState, useEffect } from 'react';

const yelpBaseEndpoint = 'https://api.yelp.com/v3';

// sample fetch url  :  https://api.yelp.com/v3/businesses/search?latitude=37.786882&longitude=-122.399972

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

const searchBusinesses = (term, location) => {
  const [businesses, setBusinesses] = useState([]);
  const [totalBusinesses, setTotalBusinesses] = useState();
  const [searchParams, setSearchParams] = useState(term, location);

  useEffect(() => {
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
    fetchData();
  }, [searchParams])
  return [businesses, totalBusinesses, searchParams, setSearchParams];
}