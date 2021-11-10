import React, { useState, useEffect, useCallback } from 'react';
import GoogleMapReact from 'google-map-react';
import Avatar from 'react-avatar';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'


const imgUrl = 'https://i.imgur.com/WTHBUgm.png';
// // const Marker = ({ url }) => <div className="marker"><img src={url} /></div>
// const Marker = (props) => <div className="marker"><Avatar className="avatar" size='30px' name={props.name} /></div>



const containerStyle = {
  width: '1000px',
  height: '600px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const Map = (props) => {
  // const url = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"

  const [map, setMap] = useState(null);
  const onLoad = useCallback((map) => setMap(map), []);
  useEffect(() => {
    if (map) {
      const bounds = new window.google.maps.LatLngBounds();
      props.selectedLocations.map(marker => {
        bounds.extend({
          lat: marker.coordinates.lat,
          lng: marker.coordinates.lng,
        });
      });
      map.fitBounds(bounds);

    }
  }, [map, props.selectedLocations]);
  return (
    <LoadScript
      googleMapsApiKey='AIzaSyA0cGzN3OzHoQxpXyz9ZqqDK1psI8eTg44'
    >
      <div id="right-side-content" className='mapContainer'>
        <div id="map-container" className='mapStyles'>
          <GoogleMap
            mapContainerStyle={containerStyle}
            // center={center}
            zoom={12}
            onLoad={onLoad}>
            {props.selectedLocations.map(friend => {
              const { user_id, username, coordinates } = friend;
              const { lat, lng } = coordinates;
              const arr = username.split(' ')
              return (
                <Marker key={user_id} icon={`https://ui-avatars.com/api/?name=${arr[0]}+${arr[1]}&size=30&length=${arr.length}&rounded=true&background=OD8ABC&color=fff`} title={username} position={{ lat, lng }}>
                </Marker>
              )
            })}
          </GoogleMap >
        </div>
      </div>
    </LoadScript >
  )

}

export default Map;
