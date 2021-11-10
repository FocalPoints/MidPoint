import React from 'react';
import GoogleMapReact from 'google-map-react';
import Avatar from 'react-avatar';


const imgUrl = 'https://i.imgur.com/WTHBUgm.png';
// const Marker = ({ url }) => <div className="marker"><img src={url} /></div>
const Marker = ({ url, name }) => <div className="marker"><Avatar className="avatar" size='30px' name={name} /></div>

// have users sign up with an image url
// have each user rendered on the map at thhat users location

// todo - need an array of every users location

const Map = ({ midpoint, selectedLocations }) => {
  const places = selectedLocations.map(friend => {
    const { user_id, username, coordinates } = friend;
    const { lat, lng } = coordinates;
    return (
      <Marker key={user_id} text={user_id} lat={lat} lng={lng} url={imgUrl} name={username}></Marker>
    );
  })

  return (
    <div id="right-side-content" className='mapContainer'>
      {/* {console.log('we are in maps', midpoint.lat, midpoint.lng)}
      {console.log('is middle point an object', midpoint)} */}

      <div id="map-container" className='mapStyles'>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAG8pD29eYb7EnZNrNFinFbmMtJiqqnzKI" }}
          // this cannot be dynamic so change that
          defaultCenter={midpoint}
          defaultZoom={9}>
          {places}
          {/* this needs to re render dynamically */}
          {/* <Marker key="midpoint" lat={midpoint.lat} lng={midpoint.lng} text='midpoint' url={imgUrl} /> */}
        </GoogleMapReact>
      </div>
    </div>
  )
}

export default Map;
