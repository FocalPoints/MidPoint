import * as types from '../constants/actionTypes';
import axios from 'axios';


const initialState = {
  pageToDisplay: 'login',
  currentUserID: '', // this is primary key for the username, should be a number.
  loggedIn: false,
  selfInfo: {avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',name: 'Lego', address: 'Legoland'},
  friendInfo: {},
};

const mainPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGN_UP:
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
      console.log("Login action type has been trigger")
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

      case types.SIGN_UP_USER:
        console.log("Login action type has been trigger")
      // const body = {
      //   path: '/login',
      //   method: POST,
      //   body: action.payload, // {user,pass, {lat,lng}}
      // }
      // axios.post(/(server endpoint), body).then(data => {})

      // DB res back with all of data, use the data to change the state.
      // return statement should go inside the .then
      //server will res back with an object that has a boolean value and a msg
      return {
        ...state,
        pageToDisplay: 'login',
      };

      //update location needs ID

    default:
      return state;
  }
};

export default mainPageReducer;
