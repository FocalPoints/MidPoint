import React from 'react';
import Map from './Map'
import Sidebar from './Sidebar'

const Main = (props) => {
    return(
      <div>
        Logged in
        <Sidebar />
        <Map />
      </div>
    )
}

export default Main;