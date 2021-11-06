import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as bootstrap from 'bootstrap';
import * as actions from '../actions/actions';

const mapStateToProps = ({
   mainPage: { pageToDisplay } 
  }) => ({
  pageToDisplay
});

const mapDispatchToProps = dispatch => ({
  signUp: () => dispatch(actions.signUp()),
  signUpCancel: () => dispatch(actions.signUpCancel()),
});


const Access = ({pageToDisplay, signUp, signUpCancel}) => {


  // Log In Page
  if (pageToDisplay === 'login') return (
    <div>
      <h1>login Page</h1>
      <input 
        name="username"
        type="text"
        placeholder="Username"
      />
      <input 
        name="password"
        type="password"
        placeholder="Password"
        />
      <button>Login</button> 
      <button onClick={signUp}>Sign-up</button>
        
    </div>
  );

  // onClick={() => logIn(username,password)}

  // Sign Up Page
  return (
    <div>
      <h1>sign-in Page</h1>
        <input 
          name="user" id="user"
          //  value={username} 
          //  onChange={(event) => onChangeHandler(event)} 
          type="text" 
          placeholder="Username">
        </input> 
        <input name="password" id="password" type="password" placeholder="Password"></input>
        
        <button>Sign Up</button>
        <button onClick={signUpCancel}>Cancel</button>
    </div>
  );
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Access);

