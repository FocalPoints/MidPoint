import React, { useState } from 'react';
import Avatar from 'react-avatar';

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
          <Avatar className="avatar" size='30px' color='black' name={props.username} />

          <p className='pStyles'>Welcome back, {props.username}!</p>

        </div>

        <div className='flexAlignCenter'>

          {/* shows location icon and user location */}
          <img src={imgUrl} className='picStyles' />
          <div>
            <p className="latlng">Lat: {props.coordinates.lat.toFixed(2)}</p>
            <p className="latlng">Long: {props.coordinates.lng.toFixed(2)}</p>
          </div>

        </div>
      </div>
      <div className='center'>

        {/* input field where users can elect to update their current location */}
        Update your location: <input className='inputStyles'
          name="address" type="text"
          placeholder="Address"
          value={address}
          onChange={(event) => onChangeHandler(event)}>
        </input>

        <button onClick={() => {
          console.log(props.user_id)
          props.updateLocation(props.user_id, address)
        }}>
          Change
        </button>
      </div>

      <div id="friend-list" className='center'>
        <p className="latlng">Friends:</p>
        {/* dropdown populated with users from friends list */}

        <div className='scrollContainer'>{props.friendsList.map((friend) => {
          return (
            <div key={friend.user_id}>
              <input type="checkbox" id={friend.user_id} name={friend.username} onChange={(e) => {
                props.addSelected(friend, e.target.checked)
              }} /> {/* friend.username has friend info */}

              <label htmlFor={friend.username}>{friend.username}</label>
            </div>
          )
        })
        }
        </div>

        {/* when clicked, triggers action to get that friend's location and use it to find the midpoint */}
      </div>
      <div id="friend-list" className='center'>
        <p className="latlng">Add New Friends:</p>
        {/* dropdown populated with users from friends list */}



        <div className='scrollContainer'>{props.notFriendsList.map((notFriend, i) => {
          return (<div id={notFriend.user_id} key={notFriend.user_id} value={notFriend.username}>
            <button onClick={() => props.addFriend(props.user_id, notFriend.user_id)}>
              +
            </button> {notFriend.username} </div>)
        })}
        </div>
      </div>
    </div>
  )
}





export default Sidebar;
