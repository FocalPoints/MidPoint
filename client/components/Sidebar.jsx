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

        {/* shows avatar photo and user greeting */}
          <img src={props.avatar} style={picStyles}/> 
          <p style={pStyles}>Welcome back, {props.name}!</p>

        </div>
        <div style={{display: 'flex'}}>

          {/* shows location icon and user location */}
          <img src={imgUrl} style={picStyles}/> 
          <p style={pStyles}>{props.address}</p>

        </div>
        <div>

          {/* input field where users can elect to update their current location */}
          Update your address: <input style={inputStyles}
          name="address" type="text"
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
        <p>Choose which friend you'll be meeting:</p>
      </div>
      <div id="friend-list">
        {/* dropdown populated with users from friends list */}
        <select style={inputStyles}>{props.friendsList.map(friend => {return(<option key={friend} value={friend}> {friend} </option>)})}</select>

        {/* when clicked, triggers action to get that friend's location and use it to find the midpoint */}
        <button onClick={() => props.getMidpoint("user", "friendUser")}>
          Meet in the Middle
        </button>
        <p>Midpoint: {JSON.stringify(props.midpoint)}</p>
      </div>
        {/* eventual functionality to add a friend to user's friend list by name search */}
      <div id="add-friend">
        <br/>
        Add friend:
      </div>
    </div>
  )
}













const sidebarStyles = {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '283845',
  width: '21%',
  height: '500px',
  border: '1px solid black',
  borderRadius: '6px',
  margin: '10px 0px 0px 6px'
}

const picStyles = {
  height: '40px',
  width: '40px',
  borderRadius: '50%',
  margin: '10px 16px'
}

const inputStyles = {
  backgroundColor: '9db2cf',
  margin: '0px 6px'
}

const pStyles = {
  marginTop: '24px'
}

const imgUrl = "https://lh3.googleusercontent.com/proxy/2lwa6KI0uEOJfPm5XsYZP5BN3QnCvBk1kePaXTSX8mK614djWBi0PxBzgxaOwwZsScQk1c_oMV4s9x0IUrDy2tJlzliNRIW7Rx5SaHN9ImmVdD-I594U_3BSjY2Bz4Pkr4F-";



export default Sidebar;