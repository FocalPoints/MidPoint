import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import Main from './Main';

const mapStateToProps = ({
   mainPage: { currentUserID, pageToDisplay , loggedIn , selfInfo, friendsList, notFriendsList, midpoint } 
  }) => ({
  pageToDisplay,
  loggedIn,
  selfInfo,
  friendsList,
  notFriendsList,
  midpoint,
  currentUserID,
});

const mapDispatchToProps = dispatch => ({
  pageToSignup: () => dispatch(actions.pageToSignup()),
  signUpCancel: () => dispatch(actions.signUpCancel()),
  logIn: (user,pass) => dispatch(actions.logIn(user,pass)),
  signUpUser: (user,pass,address) => dispatch(actions.signUpUser(user,pass,address)),
  updateLocation: (address, id) => dispatch(actions.updateLocation(address, id)),
  getMidpoint: (user, friendUser) => dispatch(actions.getMidpoint(user, friendUser)),
  addFriend: (user1_id, user2_id) => dispatch(actions.addFriend(user1_id, user2_id)),
  addOutsideFriend: (user2_id, username, friendAddress) => dispatch(actions.addOutsideFriend(user2_id, username, friendAddress)),
});


const Access = ({pageToDisplay, currentUserID, addFriend, loggedIn, pageToSignup, signUpCancel, logIn, signUpUser, selfInfo, updateLocation, friendsList, notFriendsList, getMidpoint, midpoint, addOutsideFriend}) => {

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
    return (<Main {...selfInfo} 
      updateLocation={updateLocation} 
      friendsList={friendsList} 
      notFriendsList={notFriendsList} 
      getMidpoint={getMidpoint} 
      currentUserID={currentUserID} 
      addFriend={addFriend} 
      addOutsideFriend={addOutsideFriend} 
      midpoint={midpoint}/>)
  }

  const props = useSpring({
    from: { marginTop: -500 },
    to: { marginTop: 0 }
  })

  // Log In Page
  if (pageToDisplay === 'login') return (
    <div className='loginStyles'>
      <animated.h1 style={props}>H A L F W A Y</animated.h1>
      <h2>m e e t .  m e .  h a l f w a y</h2>
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
      <div id='button-container'>
        <button onClick={() => logIn(username,password)}>Login</button> 
        <button onClick={pageToSignup}>Sign-up</button>
      </div>  
    </div>
  );

 

  // Sign Up Page
  return (
    <div className='loginStyles'>

      <h1>Sign-up Page</h1>
      <img src='https://i.imgur.com/YQ3shad.png'/>
        
        <input name="username" id="username" value={username} type="text" placeholder="Username" onChange={(event) => onChangeHandler(event)}></input> 
        <input name="password" id="password" value={password} type="password" placeholder="Password" onChange={(event) => onChangeHandler(event)}></input>
        <input name="address" id="address" value={address} type="text" placeholder="45 main street" onChange={(event) => onChangeHandler(event)}></input>

        <button onClick={() => {if((username || password || address) !== '') signUpUser(username,password,address)}}>Create an account</button>
        <button onClick={signUpCancel}>Cancel</button>  
    </div>
  );

}

export default connect(mapStateToProps, mapDispatchToProps)(Access);
