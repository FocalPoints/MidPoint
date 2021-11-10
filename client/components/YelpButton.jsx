import React from 'react';
import '../scss/yelpbutton.scss';

function YelpButton(props) {
  // grabbing lat, lng of current midpoint as well as 'setCafe' method from parent
  const { lat, lng, setCafes, cafes } = props;

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
    })
    .catch(err => console.log('ERROR FETCHING FROM FRONT END'));
  }

  return (
    <div id='yelp-button-div'>
      <button id='yelp-button' onClick={ getCafes } >Find nearby cafes</button>
    </div>
  )
}

export default YelpButton;
