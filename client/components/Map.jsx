import React, {useEffect} from 'react';
import GoogleMapReact from 'google-map-react';

const imgUrl = 'https://uxwing.com/wp-content/themes/uxwing/download/02-arrow-direction/direction-corner-top-left.png';
const Marker = ({ icon }) => <img height={'50px'} width={'50px'} src={imgUrl}></img>;
//TODO: make marker icons correspond with user avatars?

const Map = ({midpoint}) => {

    return(
      <div>
        <div id="right-side-content" className='mapContainer'> 
          <div id="map-container" className='mapStyles'>
            <GoogleMapReact 
              bootstrapURLKeys={{key: 'AIzaSyCr3-1_OEv0MkdH_0p31AiCI0IL7EGNh-4'}} //GOOGLE-MAPS-API-KEY
              center={midpoint}
              defaultZoom={8}>
              {/* do markers go in here? */}
              <Marker lat={midpoint.lat} lng = {midpoint.lng} text='midpoint' icon={imgUrl} />
            </GoogleMapReact>
          </div>
        </div>
        
      </div>
      )
}


export default Map;
