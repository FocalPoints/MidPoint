import * as types from '../constants/actionTypes';
import axios from 'axios';


const initialState = {
  pageToDisplay: 'login',
  currentUserID: '', // this is primary key for the username, should be a number.
  loggedIn: false
};

const mainPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGN_UP:
      // const body = {
      //   path: '/login',
      //   method: POST,
      //   body: action.payload, // {user,pass, {lat,lng}}
      // }
      // axios.post(/(server endpoint), body).then(data => {})
      return {
        ...state,
        pageToDisplay: 'signup',
      };

    case types.SIGN_UP_CANCEL:
      return {
        ...state,
        pageToDisplay: 'login',
      };

    case types.LOG_IN:
      console.log("trigger")
      // const body = {
      //   path: '/login',
      //   method: GET,
      //   body: action.payload, // {user,pass}
      // }

      // axios.get(/(server endpoint), body).then(data => {})

      // DB res back with all of data, use the data to change the state.
      // return statement should go inside the .then
      //server will res back with an object that has a boolean value and a msg
      return {
        ...state,
        loggedIn: true, // obj.booleanValue
      };

      //update location needs ID

    default:
      return state;
  }
};

export default mainPageReducer;
