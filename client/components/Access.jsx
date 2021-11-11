import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import Main from './Main';

const mapStateToProps = ({
  mainPage: { currentUser, selectedLocations, pageToDisplay, loggedIn, friendsList, notFriendsList, midpoint }
}) => ({
  pageToDisplay,
  loggedIn,
  friendsList,
  notFriendsList,
  midpoint,
  currentUser,
  selectedLocations,
});

const mapDispatchToProps = dispatch => ({
  pageToSignup: () => dispatch(actions.pageToSignup()),
  signUpCancel: () => dispatch(actions.signUpCancel()),
  logIn: (user, pass) => dispatch(actions.logIn(user, pass)),
  signUpUser: (user, pass, address) => dispatch(actions.signUpUser(user, pass, address)),
  updateLocation: (user_id, address) => dispatch(actions.updateLocation(user_id, address)),
  getMidpoint: (user, friendUser) => dispatch(actions.getMidpoint(user, friendUser)),
  addFriend: (user1_id, user2_id) => dispatch(actions.addFriend(user1_id, user2_id)),
  //deleteFriend method added
  deleteFriend: (user1_id, user2_id) => dispatch(actions.deleteFriend(user1_id, user2_id)),
  addSelected: (user, boolean) => dispatch(actions.addSelected(user, boolean)),
});


export const Access = ({ addSelected, pageToDisplay, currentUser, selectedLocations, addFriend, deleteFriend, loggedIn, pageToSignup, signUpCancel, logIn, signUpUser, updateLocation, friendsList, notFriendsList, getMidpoint, midpoint }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');

  function onChangeHandler(event) {
    const { name, value } = event.currentTarget;
    if (name === "username") {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'address') {
      setAddress(value);
    }
  }

  if (loggedIn) {
    return (<Main updateLocation={updateLocation} friendsList={friendsList} notFriendsList={notFriendsList} getMidpoint={getMidpoint} {...currentUser} selectedLocations={selectedLocations} addFriend={addFriend} deleteFriend={deleteFriend} midpoint={midpoint} addSelected={addSelected} />)
  }

  // Log In Page
  if (pageToDisplay === 'login') return (
    <div className='loginStyles'>

      <h1>Login Page</h1>
      <img src='https://i.imgur.com/YQ3shad.png' />
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
      <button onClick={() => logIn(username, password)}>Login</button>
      <button onClick={pageToSignup}>Sign-up</button>

    </div>
  );



  // Sign Up Page
  return (
    <div className='loginStyles'>

      <h1>Sign-up Page</h1>
      <img src='https://i.imgur.com/YQ3shad.png' />

      <input name="username" id="username" value={username} type="text" placeholder="Username" onChange={(event) => onChangeHandler(event)}></input>
      <input name="password" id="password" value={password} type="password" placeholder="Password" onChange={(event) => onChangeHandler(event)}></input>
      <input name="address" id="address" value={address} type="text" placeholder="45 main street" onChange={(event) => onChangeHandler(event)}></input>

      <button onClick={() => { if ((username || password || address) !== '') signUpUser(username, password, address) }}>Create an account</button>
      <button onClick={signUpCancel}>Cancel</button>
    </div>
  );

}

export default connect(mapStateToProps, mapDispatchToProps)(Access);
