import React, { useState } from 'react';
 
const Sidebar = (props) => {
  const [address, setAddress] = useState('');

  function onChangeHandler(event) {
    const { name, value } = event.currentTarget;
    if(name === "address") {
      setAddress(value);
    }
  }

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
          {/* update user location */}
          <br></br>
          New Address?
          <input name="address" 
          type="text"
          placeholder="newAddress"
          value={address}
          onChange={(event) => onChangeHandler(event)}>
          </input>
          <button onClick={() => props.updateLocation(address)}>
            Change Your Location
          </button>
        </div>
      </div>
      <div>
        <p>Choose who you'll be meeting!</p>
        <p>Select a friend from the list below:</p>
      </div>
      <div id="friend-list">
        {/* create dropdown with list of friends */}
        <select>{props.friendsList.map(friend => {return(<option key = {friend} value={friend}> {friend} </option>)})}</select>
        <button onClick={() => props.getMidpoint("user", "friendUser")}>
          Get midpoint!
        </button>
        <p>midpoint: {props.midpoint}</p>
      </div>
      <div id="add-friend">
        <br/>
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