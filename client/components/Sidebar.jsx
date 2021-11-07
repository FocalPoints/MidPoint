import React from 'react';
 
const Sidebar = (props) => {
  return (
    <div id="sidebar" style={sidebarStyles}>
      <div id="user-info">
        <div>
          Avatar and name
          <img src={props.avatar}/>
          <p>{props.name}</p>
        </div>
        <div>
          Location: {props.address}
          <button>Change?</button>
        </div>
      </div>
      <div>
        <p>Choose who you'll be meeting!</p>
        <p>Select a friend from the list below:</p>
      </div>
      <div id="friend-list">
        <p>Dropdown menu, populated w/ user's friends</p>
      </div>
      <div id="add-friend">
        Add friend:
      </div>
    </div>
  )
  // profile pic
  // your name
  // your location
  // change button


  // List of friends

}

const sidebarStyles = {
  display: 'flex',
  flexDirection: 'column',
  width: '22%',
  height: '900px',
  border: '1px solid black'
}

export default Sidebar;