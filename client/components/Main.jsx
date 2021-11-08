import React from 'react';
import Map from './Map'
import Sidebar from './Sidebar'

const Main = (props) => {
    return(
      <div id="main-content" style={mainStyles}>
        <Sidebar {...props}/>
        <Map {...props}/>
      </div>
    )
}

const mainStyles = {
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: '202C39',
  color: 'ivory',
  height: '100%'
}

export default Main;