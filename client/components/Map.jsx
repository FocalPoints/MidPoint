import React from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker.jsx';

const imgUrl = 'https://i.imgur.com/WTHBUgm.png';

// const Marker = ({ icon }) => <img height={'50px'} width={'50px'} src={imgUrl}></img>;

const Map = ({midpoint}) => {
    return(
      
        <div id="right-side-content" className='mapContainer'>
          {console.log('we are in maps', midpoint.lat, midpoint.lng) }
           {console.log('is middle point an object', midpoint) }
          
  
          <div id="map-container" className='mapStyles'>
            <GoogleMapReact 
              bootstrapURLKeys={{key: 'AIzaSyAisanRgGF25lhPR7TSu_VDRggQqwH5MVg'}}
              defaultCenter={midpoint}
              defaultZoom={12}
              >
              {/* do markers go in here? */}
              {/* <Marker className='marker' lat={midpoint.lat} lng = {midpoint.lng} text='midpoint' icon={imgUrl} /> */}
              //! THIS IS THE UPDATED MIDPOINT MARKER THAT WORKS WITH ZOOM 
              <Marker
            lat={midpoint.lat}
            lng={midpoint.lng}
            name="My Marker"
            // color="blue"
            icon={imgUrl}
          />
            </GoogleMapReact>
          </div>
        </div>
      )
}


export default Map;
