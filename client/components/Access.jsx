import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import Main from './Main';

// add friends list here
const mapStateToProps = ({
   mainPage: { pageToDisplay , loggedIn , selfInfo, friendsList, notFriendsList, midpoint } 
  }) => ({
  pageToDisplay,
  loggedIn,
  selfInfo,
  friendsList,
  notFriendsList,
  midpoint
});

// add change location button here
const mapDispatchToProps = dispatch => ({
  pageToSignup: () => dispatch(actions.pageToSignup()),
  signUpCancel: () => dispatch(actions.signUpCancel()),
  logIn: (user,pass) => dispatch(actions.logIn(user,pass)),
  signUpUser: (user,pass,lat,lng) => dispatch(actions.signUpUser(user,pass,lat,lng)),
  updateLocation: (address) => dispatch(actions.updateLocation(address)),
  getMidpoint: (user, friendUser) => dispatch(actions.getMidpoint(user, friendUser))
});


const Access = ({pageToDisplay, loggedIn, pageToSignup, signUpCancel, logIn, signUpUser, selfInfo, updateLocation, friendsList, notFriendsList, getMidpoint, midpoint}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');


  function onChangeHandler(event) {
      const { name, value } = event.currentTarget;
      if(name === "username") {
        setUsername(value);
      } else if(name === 'password') {
        setPassword(value);
      } else if(name === 'lat') {
        setLat(value);
      } else if(name === 'lng') {
        setLng(value);
      }
  }

    //  Logged In 
   if (loggedIn) {
    return (<Main {...selfInfo} updateLocation={updateLocation} friendsList={friendsList} notFriendsList={notFriendsList} getMidpoint={getMidpoint} midpoint={midpoint}/>)
  }

  // Log In Page
  if (pageToDisplay === 'login') return (
    <div className='loginStyles'>
      
      <h1>Login Page</h1>
      <img src='https://i.imgur.com/YQ3shad.png'/>
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
      <button onClick={() => logIn(username,password)}>Login</button> 
      <button onClick={pageToSignup}>Sign-up</button>
        
    </div>
  );

 

  // Sign Up Page
  return (
    <div className='loginStyles'>

      <h1>Sign-up Page</h1>
      <img src='https://i.imgur.com/YQ3shad.png'/>
        
        <input name="username" id="username" value={username} type="text" placeholder="Username" onChange={(event) => onChangeHandler(event)}></input> 
        <input name="password" id="password" value={password} type="password" placeholder="Password" onChange={(event) => onChangeHandler(event)}></input>
        <input name="lat" id="lat" value={lat} type="text" placeholder="40" onChange={(event) => onChangeHandler(event)}></input>
        <input name="lng" id="lng" value={lng} type="text" placeholder="-74" onChange={(event) => onChangeHandler(event)}></input>

        <button onClick={() => {if((username || password || lat || lng) !== '') signUpUser(username,password,lat,lng)}}>Create an account</button>
        <button onClick={signUpCancel}>Cancel</button>  
    </div>
  );

}

export default connect(mapStateToProps, mapDispatchToProps)(Access);
