import React from 'react';
import GoogleMapReact from 'google-map-react';

const imgUrl = 'https://i.imgur.com/WTHBUgm.png';
const Marker = ({ text }) => <div>{text}</div>;

const Map = ({midpoint}) => {
    return(
      
        <div id="right-side-content" className='mapContainer'>
          {console.log('we are in maps', midpoint.lat, midpoint.lng) }
           {console.log('is middle point an object', midpoint) }
          
  
          <div id="map-container" className='mapStyles'>
            <GoogleMapReact 
              bootstrapURLKeys={{key: "AIzaSyAG8pD29eYb7EnZNrNFinFbmMtJiqqnzKI"}}
              defaultCenter={midpoint}
              defaultZoom={20}>
              {/* do markers go in here? */}
              <Marker lat={midpoint.lat} lng = {midpoint.lng} text='midpoint' icon={imgUrl} />
            </GoogleMapReact>
          </div>
          <div>
            I'll be recommendations one day
          </div>
        </div>
      )
}


export default Map;
