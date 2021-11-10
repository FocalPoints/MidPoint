import React from 'react';
import Map from './Map'
import Sidebar from './Sidebar'

const Main = (props) => {

  return (
    <div id="main-content" className='mainStyles'>
      <Sidebar {...props} />
      <Map {...props} />
    </div>
  )
}

export default Main;