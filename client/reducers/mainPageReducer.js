import * as types from '../constants/actionTypes';
import axios from 'axios';


const initialState = {
  pageToDisplay: 'login',
  loggedIn: false
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
      console.log("trigger")
      // const body = {
      //   path: '/login',
      //   method: GET,
      //   body: action.payload,
      // }
      // axios.get(/(server endpoint), body).then(data => {})

      // DB res back with all of data, use the data to change the state.
      // return statement should go inside the .then
      return {
        ...state,
        loggedIn: true,
      };

    default:
      return state;
  }
};

export default mainPageReducer;
