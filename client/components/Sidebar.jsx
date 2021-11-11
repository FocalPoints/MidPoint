import React, { useState } from 'react';

const Sidebar = (props) => {

  const [newAddress, setNewAddress] = useState('');

  function onChangeHandler(event) {
    const { name, value } = event.currentTarget;
    if (name === "newAddress") {
      setNewAddress(value);
    }
  }

  const imgUrl = 'https://i.imgur.com/WTHBUgm.png';

  return (
    <div id="sidebar" className='sidebarStyles'>
      <div id="user-info" style={{ borderBottom: '1px solid black' }}>
        <div className='flexAlignCenter'>

          {/* shows avatar photo and user greeting */}
          <img src={props.userAvatar} className='picStyles' />
          <p id="welcomeText" className='pStyles'>Welcome back, {props.userName}!</p>

        </div>
        <div className='flexAlignCenter'>

          {/* shows location icon and user location */}
          <img src={imgUrl} className='picStyles' />
          <p id="locationText">{JSON.stringify(props.userAddress)}</p>

        </div>
        <div className='center'>

          {/* input field where users can elect to update their current location */}
          New address? <input className='inputStyles'
            name="newAddress" type="text"
            placeholder="lat / lng"
            value={newAddress}
            onChange={(event) => onChangeHandler(event)}>
          </input>

          <button id="changeAddressButton" onClick={() => props.updateLocation(newAddress)}>
            Change
          </button>
        </div>
      </div>
      <div id="friend-list" className='center'>
        <p>Friends:</p>
        {/* dropdown populated with users from friends list */}
        {console.log('Props friends list', props.friendsList)} {/* array of objects with user_id, username, and coordinates properties*/}


        <div className='inputStyles'>{props.friendsList.map((friend) => {
          return (<div id={friend.user_id} key={friend.user_id} value={friend.username}> 
            <button id="findMidpointButton" onClick={() => props.getMidpoint(props.userCoords, friend.coordinates)}>
            {friend.username} 
            </button></div>)
        })}</div>

        {/* when clicked, triggers action to get that friend's location and use it to find the midpoint */}
      </div>
      {/* eventual functionality to add a friend to user's friend list by name search */}
      <div id="futureFriendsList" className='center'>
        <p>Future Friends: </p>
        <div className='inputStyles' className='center'>{props.notFriendsList.map((notFriend, i) => {
          return (<div id={notFriend.user_id} key={notFriend.user_id} value={notFriend.username}>
            <button onClick={() => props.addFriend(props.userID, notFriend.user_id)}>
            {notFriend.username}
            </button></div>)
      })}</div>

      </div>
    </div>
  )
}





export default Sidebar;