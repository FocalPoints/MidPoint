import React from 'react';
import '../scss/yelpbutton.scss';

function YelpButton(props) {
  // grabbing lat, lng of current midpoint as well as 'setCafe' method from parent
  const { lat, lng, setCafes } = props;

  const getCafes = () => {
    const body = {latitude : lat, longitude: lng};
    fetch('/api/yelp', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      // setting 'cafes' state with the new data returned from server
      setCafes(data);
      console.log(cafes);
    })
    .catch(err => console.log('ERROR FETCHING FROM FRONT END'));
  }

  const testFetch = () => {
    const body = {latitude : 37.786882, longitude: -122.399972};
    fetch('/api/yelp', {
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
    <div id='yelp-button-div'>
      <button id='yelp-button' onClick={ testFetch } >Find nearby cafes</button>
    </div>
  )
}

export default YelpButton;
