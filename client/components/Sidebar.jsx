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
          <p  className='pStyles'>{JSON.stringify(props.address)}</p>

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
        <div>{props.friendsList.map((friend, i ) => {return(<div className='center' id={friend.user_id} key={friend.username} value={friend.username}> <button onClick={() => props.getMidpoint(props.address, props.friendsList[i].coordinates)}>
          Meet with {friend.username}
        </button>  </div>)})}</div>
      </div>
        {/* eventual functionality to add a friend to user's friend list by name search */}
      <div id="add-friend">
        <p>Add a friends:</p>
        <select className="inputStyles">{props.notFriendsList.map(notFriend => {return(<option key={notFriend} value={notFriend}> {notFriend} </option>)})}</select>
        {/* when clicked, triggers action to add friend to friendList */}
        <button >
          Add Friend
        </button>
      </div>
    </div>
  )
}





export default Sidebar;