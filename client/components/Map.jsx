import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker.jsx';
import CafeCard from './CafeCard.jsx';
import YelpButton from './YelpButton.jsx';
const imgUrl = 'https://i.imgur.com/WTHBUgm.png';
// const Marker = ({ icon }) => <img height={'100px'} width={'100px'} src={imgUrl}></img>;

const Map = (props) => {
  const [cafes, setCafes] = useState([]);
  const [cafeCards, setCafeCards] = useState([]);

  // creating cafe cards every time 'cafes' changes
  useEffect(() => {
    console.log(cafes);
    const cafeCards = cafes.map(obj => {
      return <CafeCard
        lat={obj.coordinates.latitude}
        lng={obj.coordinates.longitude}
        name={obj.name}
        address={obj.address}
        key={obj.name}
      />
    });
    setCafeCards(cafeCards);
    console.log(cafeCards);
  }, [cafes]);

    return (
      
        <div id="right-side-content" className='mapContainer'>
          {console.log('we are in maps', props.address.lat, props.address.lng) }
           {console.log('is middle point an object', props.address) }
          
  
          <div id="map-container" className='mapStyles'>
            <GoogleMapReact 
              bootstrapURLKeys={{key: 'AIzaSyAisanRgGF25lhPR7TSu_VDRggQqwH5MVg'}}
              center={props.address}
              defaultZoom={15}>
              {/* do markers go in here? */}
              {/* <Marker lat={midpoint.lat} lng = {midpoint.lng} text='midpoint' icon={imgUrl} /> */}
              <Marker
                lat={props.address.lat}
                lng={props.address.lng}
                name="My Marker"
                color="blue"
              />

          <Marker
            lat={props.midpoint.lat}
            lng={props.midpoint.lng}
            name="Midpoint Marker"
            color="red"
          />

          
          {cafeCards}
          

          <YelpButton lat={props.midpoint.lat} lng={props.midpoint.lng} setCafes={setCafes} cafes={cafes} />
            
          </GoogleMapReact>
          </div>
        </div>
      )
}


export default Map;
