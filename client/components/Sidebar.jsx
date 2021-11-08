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
      <div id="user-info" style={{borderBottom: '1px solid black'}}>
        <div style={{display: 'flex'}}>

          <img src={props.avatar} style={avatarStyles}/> <p>{props.name}</p>

        </div>
        <div>

          Location: {props.address}
          <br/>
          Update your address:
          <input name="address" 
          type="text"
          placeholder="newAddress"
          value={address}
          onChange={(event) => onChangeHandler(event)}>
          </input>
          <button onClick={() => props.updateLocation(address)}>
            Change
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
        <p>midpoint: {JSON.stringify(props.midpoint)}</p>
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
  backgroundColor: '283845',
  width: '22%',
  height: '900px',
  border: '1px solid black',
  borderRadius: '6px',
  margin: '10px 0px 0px 6px'
}

const avatarStyles = {
  height: '40px',
  width: '40px',
  borderRadius: '50%',
  marginRight: '20px'
}

export default Sidebar;