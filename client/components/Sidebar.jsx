import React, { useState } from 'react';
 
const Sidebar = (props) => {
  
  const [address, setAddress] = useState('');

  function onChangeHandler(event) {
    const { name, value } = event.currentTarget;
    if(name === "address") {
      setAddress(value);
    }
  }

  const imgUrl = 'https://i.imgur.com/WTHBUgm.png';

  return (
    <div id="sidebar" className='sidebarStyles'>
      <div id="user-info" style={{borderBottom: '1px solid black'}}>
        <div className='flexAlignCenter'>

        {/* shows avatar photo and user greeting */}
          <img src={props.avatar}  className='picStyles'/> 
          <p  className='pStyles'>Welcome back, {props.name}!</p>

        </div>
        <div className='flexAlignCenter'>

          {/* shows location icon and user location */}
          <img src={imgUrl}  className='picStyles'/> 
          <p  className='pStyles'>{props.address}</p>

        </div>
        <div>

          {/* input field where users can elect to update their current location */}
          Update your address: <input className='inputStyles'
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
        <select  className='inputStyles'>{props.friendsList.map(friend => {return(<option key={friend} value={friend}> {friend} </option>)})}</select>

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





export default Sidebar;