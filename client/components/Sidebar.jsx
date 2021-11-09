import React, { useState } from 'react';

const Sidebar = (props) => {

  const [address, setAddress] = useState('');

  function onChangeHandler(event) {
    const { name, value } = event.currentTarget;
    if (name === "address") {
      setAddress(value);
    }
  }

  const imgUrl = 'https://i.imgur.com/WTHBUgm.png';

  return (
    <div id="sidebar" className='sidebarStyles'>
      <div id="user-info" style={{ borderBottom: '1px solid black' }}>
        <div className='flexAlignCenter'>

          {/* shows avatar photo and user greeting */}
          <img src={props.avatar} className='picStyles' />
          <p className='pStyles'>Welcome back, {props.name}!</p>

        </div>
        <div className='flexAlignCenter'>

          {/* shows location icon and user location */}
          <img src={imgUrl} className='picStyles' />
          <p className='pStyles'>{JSON.stringify(props.address)}</p>

        </div>
        <div className='center'>

          {/* input field where users can elect to update their current location */}
          Update your address: <input className='inputStyles'
            name="address" type="text"
            placeholder="lat/lng"
            value={address}
            onChange={(event) => onChangeHandler(event)}>
          </input>

          <button onClick={() => props.updateLocation(address)}>
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
            <button onClick={() => props.getMidpoint(props.address, friend.coordinates)}>
              Meet in the Middle
            </button> {friend.username} </div>)
        })}</div>

        {/* when clicked, triggers action to get that friend's location and use it to find the midpoint */}
      </div>
      {/* eventual functionality to add a friend to user's friend list by name search */}

      <div className='inputStyles' className='center'>{props.notFriendsList.map((notFriend, i) => {
        return (<div id={notFriend.user_id} key={notFriend.user_id} value={notFriend.username}>
          <button onClick={() => props.addFriend(props.currentUserID, notFriend.user_id)}>
            Add Friend
          </button> {notFriend.username} </div>)
      })}

      </div>
    </div>
  )
}





export default Sidebar;