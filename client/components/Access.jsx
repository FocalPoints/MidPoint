import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import Main from './Main';

const mapStateToProps = ({
   mainPage: { loggedIn, pageToDisplay, userID, userAvatar, userName, userAddress, userCoords, friendsList, notFriendsList, midpoint } 
  }) => ({
    loggedIn,
    pageToDisplay,
    userID,
    userAvatar,
    userName,
    userAddress,
    userCoords,
    friendsList,
    notFriendsList,
    midpoint
});

const mapDispatchToProps = dispatch => ({
  pageToSignup: () => dispatch(actions.pageToSignup()),
  signUpCancel: () => dispatch(actions.signUpCancel()),
  logIn: (user, pass) => dispatch(actions.logIn(user, pass)),
  logOut: () => dispatch(actions.logOut()),
  signUpUser: (user, pass, address) => dispatch(actions.signUpUser(user, pass, address)),
  updateLocation: (address) => dispatch(actions.updateLocation(address)),
  getMidpoint: (user, friendUser) => dispatch(actions.getMidpoint(user, friendUser)),
  addFriend: (user1_id, user2_id) => dispatch(actions.addFriend(user1_id, user2_id)),
});


const Access = ({ loggedIn, pageToDisplay, userID, userAvatar, userName, userAddress, userCoords, friendsList, notFriendsList, midpoint, pageToSignup, signUpCancel, logOut, logIn, signUpUser, updateLocation, getMidpoint, addFriend }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');

  function onChangeHandler(event) {
      const { name, value } = event.currentTarget;
      if(name === "username") {
        setUsername(value);
      } else if(name === 'password') {
        setPassword(value);
      } else if(name === 'address') {
        setAddress(value);
      } 
  }

   if (loggedIn) {
    return (<Main loggedIn={loggedIn} pageToDisplay={pageToDisplay} 
      userID={userID} userAvatar={userAvatar} userName={userName} userAddress={userAddress} userCoords={userCoords} 
      friendsList={friendsList} notFriendsList={notFriendsList} midpoint={midpoint}
      updateLocation={updateLocation} getMidpoint={getMidpoint} addFriend={addFriend} logOut={logOut}/>)
  }

  // Log In Page
  if (pageToDisplay === 'login') return (
    <div className='loginStyles'>
      
      <h1>MIDPOINT</h1>
      <img src='https://i.imgur.com/YQ3shad.png'/>
      <h2>login</h2>
      <input 
        name="username"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(event) => onChangeHandler(event)}
      />
      <input 
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => onChangeHandler(event)}
        />
      <button id="darkButton" onClick={() => logIn(username, password)}>Login</button> 
      <button id="lightButton" onClick={pageToSignup}>Sign-up</button>
        
    </div>
  );

 

  // Sign Up Page
  return (
    <div className='loginStyles'>

      <h1>MIDPOINT</h1>
      <img src='https://i.imgur.com/YQ3shad.png'/>
      <h2>sign-up</h2>
        <input name="username" id="username" value={username} type="text" placeholder="Username" onChange={(event) => onChangeHandler(event)}></input> 
        <input name="password" id="password" value={password} type="password" placeholder="Password" onChange={(event) => onChangeHandler(event)}></input>
        <input name="address" id="address" value={address} type="text" placeholder="29 Park Place" onChange={(event) => onChangeHandler(event)}></input>

        <button id="darkButton" onClick={() => {if((username || password || address) !== '') signUpUser(username, password, address)}}>Create an account</button>
        <button id="lightButton" onClick={signUpCancel}>Cancel</button>  
    </div>
  );

}

export default connect(mapStateToProps, mapDispatchToProps)(Access);
