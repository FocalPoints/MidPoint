import React, { useState, useEffect, useCallback } from 'react';
import GoogleMapReact from 'google-map-react';
import Avatar from 'react-avatar';
import { GoogleMap, LoadScript } from '@react-google-maps/api'


const imgUrl = 'https://i.imgur.com/WTHBUgm.png';
// const Marker = ({ url }) => <div className="marker"><img src={url} /></div>
const Marker = ({ url, name }) => <div className="marker"><Avatar className="avatar" size='30px' name={name} /></div>


// const places = selectedLocations.map(friend => {
//   const { user_id, username, coordinates } = friend;
//   const { lat, lng } = coordinates;
//   return (
//     <Marker key={user_id} text={user_id} lat={lat} lng={lng} url={imgUrl} name={username}></Marker>
//   );
// })

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const Map = (props) => {
  const [map, setMap] = useState(null);
  const onLoad = useCallback((map) => setMap(map), []);
  useEffect(() => {
    if (map) {
      const bounds = new window.google.maps.LatLngBounds();
      props.selectedLocations.map(marker => {
        console.log(marker)
        bounds.extend({
          lat: marker.coordinates.lat,
          lng: marker.coordinates.lng,
        });
      });
      map.fitBounds(bounds);
    }
  }, [map, props.markers]);
  return (
    <LoadScript
      googleMapsApiKey='AIzaSyA0cGzN3OzHoQxpXyz9ZqqDK1psI8eTg44'
    >
      <div id="right-side-content" className='mapContainer'>

        <div id="map-container" className='mapStyles'>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}>
          </GoogleMap >
        </div>
      </div>
    </LoadScript >
  )

}

export default Map;
