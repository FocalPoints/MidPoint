import React, {useState, useCallback} from 'react';
import Map from './Map'
import Sidebar from './Sidebar'


const Main = (props) => {

  const[showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(prev => !prev);
  }

    return(
      <div id="main-content" className='mainStyles'>
          <Sidebar {...props}/>
          <div className = "mapContainer">
          <Map {...props}/>
           <div className="Schedule Button">
           <button onClick ={() => {openModal()
          console.log(showModal)
          
          }}>Schedule a Meeting </button>
         </div>
        </div>
      </div>
    )
}

export default Main;