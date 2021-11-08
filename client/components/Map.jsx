import React from 'react';
import GoogleMapReact from 'google-map-react';

const Map = ({midpoint}) => {
    return(
      
        <div id="right-side-content" className='mapContainer'>
          {console.log(midpoint.lat, midpoint.lng)}
          <div id="map-container" className='mapStyles'>
            <GoogleMapReact 
              bootstrapURLKeys={{key: "AIzaSyACFzUEJR-AO9s20J7aaLHZzQZeUHXgCZY"}}
              defaultCenter={midpoint}
              defaultZoom={10}>
              {/* do markers go in here? */}
            </GoogleMapReact>
          </div>
          <div>
            I'll be recommendations one day
          </div>
        </div>
      )
}


export default Map;
