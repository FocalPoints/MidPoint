import React from 'react';
import Map from './Map'
import Sidebar from './Sidebar'
import queryString from 'query-string';

const Main = (props) => {

  // const yelpBaseEndpoint = 'https://api.yelp.com/v3';
  // const BEARER_TOKEN = 'txLO3bBnTwEQyijGIc16dCPLup1BOLnVZB-Vv-tqNkfdQFdK8Q5dSZ9JUSl_XjqZxVOCof3jqaeD7oA0YqWYriXzq-Jsn7dIdlZRV7ya9stnRcDIVk-VkSCI5N2KYXYx';

  // // sample fetch url  :  https://api.yelp.com/v3/businesses/search?latitude=37.786882&longitude=-122.399972

  // /*
  // Fetch request should be made after midpoint is calculated
  // Fetched data(nearby restaurants) rendered in Main component
  
  // Format response file on backend to include:
  //   Name
  //   Address
  //   Picture
  
  // */

  // const getYelp = (path, queryParams = {latitude : 37.786882, longitude: -122.399972}) => {
  //   console.log('QUERY PARAMS: ', queryParams);
  //   const query = queryString.stringify(queryParams); // converts queryParams to url format 
  //   console.log('QUERY: ', query);
  //   const yelpData = fetch(`${yelpBaseEndpoint}${path}${query}`, {
  //     headers: {
  //       Authorization: `Bearer ${BEARER_TOKEN}`,
  //       Origin: 'localhost',
  //       withCredentials: true
  //     }
  //   })
  //   return yelpData;
  // }

  // // backend get route to '/api'
  // const fetchData = async () => {
  //   try {
  //     const rawData = await getYelp('/business/search', searchParams);
  //     console.log('RAW DATA: ', rawData);
  //     const res = await rawData.json();
  //     console.log('PARSED DATA: ', res);
  //     // setBusinesses(res.businesses);
  //     // setTotalBusinesses(res.total);
  //   } catch (err) {
  //     return err;
  //   }
  // }

  // const xtestFetch = () => {
  //   fetch('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=37.786882&longitude=-122.399972', {
  //     headers: {
  //       Authorization: `Bearer ${BEARER_TOKEN}`,
  //       Origin: 'localhost',
  //       withCredentials: true
  //     }
  //   })
  //   // fetch('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=37.786882&longitude=-122.399972')
  //   //   .then(data => console.log(data));
  // }
  // const testFetch = async (req, res, next) => {
  //   console.log('/api REACHED');
  //   try {
  //     console.log('TRY BLOCK ENTERED');
  //     terminal.write('TRY BLOCK ENTERED');
  //     const test =fetch('/api', {
  //       headers: {
  //         Authorization: `Bearer ${BEARER_TOKEN}`,
  //         Origin: 'localhost',
  //         withCredentials: true
  //       }
  //     })
  
  //   } catch(err) {
  //     console.log('ERROR MAKING FETCH REQUEST');
  //   }
  // }
  // const searchBusinesses = (latitude, longitude) => {
  //   // const [businesses, setBusinesses] = useState([]);
  //   // const [totalBusinesses, setTotalBusinesses] = useState();
  //   // const [searchParams, setSearchParams] = useState(latitude, longitude);

  //   useEffect(() => {
  //     fetch('/api').then(res => setBusinesses(res)); // convert to async await if data not getting stored in state
  //   }, [searchParams])
  //   return;
  // }

  const testFetch = () => {
    const body = {latitude : 37.786882, longitude: -122.399972};
    fetch('/api', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => console.log('FRONTEND FETCH', res.JSON()))
    .catch(err => console.log('ERROR FETCHING FROM FRONT END'));
  }
  return (
    <div id="main-content" className='mainStyles'>
      <Sidebar {...props} />
      <Map {...props} />
      <button onClick={ testFetch }>TESTING API</button>
    </div>
  )
}

export default Main;