import React from 'react';
import GoogleMapReact from 'google-map-react';

const Map = ({midpoint}) => {
    return(
      
        <div id="right-side-content" style={{display: 'flex', flexDirection: 'column', margin: '0px 0px 0px 20px'}}>
          {console.log(midpoint.lat, midpoint.lng)}
          <div id="map-container" style={styles}>
            <GoogleMapReact 
              bootstrapURLKeys={{key: "KEY GOES HERE"}}
              defaultCenter={midpoint}
              defaultZoom={10} />
          </div>
          <div>
            I'll be recommendations one day
          </div>
        </div>
      )
}

const styles = {
  border: '1px solid gray',
  height: '600px',
  width: '800px'
}

export default Map;
