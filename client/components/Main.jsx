import React from 'react';
import Map from './Map'
import Sidebar from './Sidebar'

const Main = (props) => {
    return(
      <div id="main-content" className='mainStyles'>
        <Sidebar {...props}/>
        <Map {...props}/>
        <div style={{width: '60px'}}>
          <button onClick={() => props.logOut()}>Log Out</button>
        </div>
      </div>
    )
}

export default Main;