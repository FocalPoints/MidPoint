import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker.jsx';
import CafeCard from './CafeCard.jsx';
import YelpButton from './YelpButton.jsx';
import { useSelector } from 'react-redux'

const imgUrl = 'https://i.imgur.com/WTHBUgm.png';
// const Marker = ({ icon }) => <img height={'100px'} width={'100px'} src={imgUrl}></img>;

const Map = (props) => {
  const [cafes, setCafes] = useState([]);
  const [cafeCards, setCafeCards] = useState([]);
  //sets the center of the map to the midpoint 
  const [center, setCenter] = useState(props.address);
  //react hooks way of grabbing state from redux store
  const state = useSelector((state) => state);


  // let cafeCards;
  // creating cafe cards every time 'cafes' changes
  useEffect(() => {
    console.log('CAFES', cafes);
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

  
  // set the center of the map to the midpoint address
  useEffect(() => {
    setCenter(props.midpoint);
  }, [props.midpoint]);

    return (
      
        <div id="right-side-content" className='mapContainer'>
          <div id="map-container" className='mapStyles'>
            <GoogleMapReact 
              bootstrapURLKeys={{key: 'AIzaSyAisanRgGF25lhPR7TSu_VDRggQqwH5MVg'}}
              center={center}
              defaultZoom={15}>
              {/* do markers go in here? */}
              {/* <Marker lat={midpoint.lat} lng = {midpoint.lng} text='midpoint' icon={imgUrl} /> */}
          <Marker
            lat={props.address.lat}
            lng={props.address.lng}
            name="My Marker"
            id = "myMarker"
            // color="blue"
          />

          <Marker
            lat={props.midpoint.lat}
            lng={props.midpoint.lng}
            name="Midpoint Marker"
            id = "midpointMarker"
            // color="red"
          />

          {
            state.mainPage.friendAddress.lat !== false
            && 
            <Marker
            lat={state.mainPage.friendAddress.lat}
            lng={state.mainPage.friendAddress.lng}
            name="Friend Marker"
            id = "friendMarker"
            // color="yellow"
          />
          }
          
          
          { cafeCards }

          <YelpButton lat={props.midpoint.lat} lng={props.midpoint.lng} setCafes={setCafes} cafes={cafes} />
            
          </GoogleMapReact>
          </div>
        </div>
      )
}


export default Map;
