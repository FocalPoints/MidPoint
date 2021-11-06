import React, { Component, useState } from 'react';
import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as bootstrap from 'bootstrap';
import * as actions from '../actions/actions';
import Main from './Main'

const mapStateToProps = ({
   mainPage: { pageToDisplay , loggedIn } 
  }) => ({
  pageToDisplay,
  loggedIn
});

const mapDispatchToProps = dispatch => ({
  signUp: () => dispatch(actions.signUp()),
  signUpCancel: () => dispatch(actions.signUpCancel()),
  logIn: (user,pass) => dispatch(actions.logIn(user,pass)),
});


const Access = ({pageToDisplay, loggedIn, signUp, signUpCancel, logIn}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function onChangeHandler(event) {
      const { name, value } = event.currentTarget;
      if(name === "username") {
          setUsername(value);
      } else if(name === 'password') {
          setPassword(value);
      }
  }

   // Logged In 
   if (loggedIn) {
      //<Link to="main">My Profile</Link>
    // <div id="access">>    
    //     <Router>
    //         <Switch>
    //             <Route path='/' element={<Main />} />
    //         </Switch>
    //     </Router>
    // </div>
    return (<Main />)
  }

  // Log In Page
  if (pageToDisplay === 'login') return (
    <div>
      <h1>login Page</h1>
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
      <button onClick={signUp}>Sign-up</button>
        
    </div>
  );

 

  // Sign Up Page
  return (
    <div>
      <h1>sign-in Page</h1>
        <input 
          name="user" id="user"
          value={username} 
          //  onChange={(event) => onChangeHandler(event)} 
          type="text" 
          placeholder="Username">
        </input> 
        <input name="password" id="password" value={password} type="password" placeholder="Password"></input>
        
        <button>Sign Up</button>
        <button onClick={signUpCancel}>Cancel</button>
    </div>
  );

  
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Access);

