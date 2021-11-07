import React from 'react';
import Map from './Map'
import Sidebar from './Sidebar'

const Main = (props) => {
    return(
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <Sidebar {...props}/>
        <Map {...props}/>
      </div>
    )
}

export default Main;