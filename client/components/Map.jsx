import React from 'react';

const Map = (props) => {
    return(
        <div id="right-side-content" style={{display: 'flex', flexDirection: 'column', margin: '0px 0px 0px 20px'}}>
          <div id="map-container" style={styles}>
            I'm the map, I'm the map, I'm the MAP
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
