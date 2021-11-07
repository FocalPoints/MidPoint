import * as types from '../constants/actionTypes';
import axios from 'axios';
import { updateLocation } from '../actions/actions';


const initialState = {
  pageToDisplay: 'login',
  currentUserID: '', // this is primary key for the username, should be a number.
  loggedIn: false,
  selfInfo: {avatar: 'https://randomuser.me/api/portraits/lego/1.jpg', name: 'Lego', address: 'Legoland'},
  friendsList: ['john','yogi','cece','james','johnny'],
  midpoint: {lat: 59.955413, lng: 30.337844}
};

const mainPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PAGE_TO_SIGN_UP:
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

    /*
      Expects: req.body = {username, password}
      Returns: {verified: bool, message: string, user: userObject}
      User Object: {
        user_id: int,
        username: string,
        password: string,
        created_on: timestamp,
        coordinate: {
          lat: num,
          lng: num
        }
      }
    */
      console.log('Login action type has been triggered')
      console.log(action.payload)

      return {
        ...state,
        loggedIn: true, // obj.booleanValue
      };

      case types.SIGN_UP_USER:
        console.log("SIGN_UP_USER action type has been triggered")
        console.log('action pay', action.payload)

        if(action.payload.verified === true){
          return {
            ...state,
            loggedIn: true,
            pageToDisplay: 'login',
          };
        }
        return {
          ...state,
          pageToDisplay: 'signup',
        };
  
      
      case types.UPDATE_LOCATION:
        console.log("Update location case triggered")
        // add a update request to update location in db

        const tempObj = Object.assign({}, state.selfInfo);
        tempObj.address = action.payload.address;

        return {
          ...state,
          selfInfo: tempObj,
        }
        
      case types.GET_MIDPOINT:
          console.log("midpoint case triggered")

        return {
          ...state,
          midpoint: 321
        }

      //update location needs ID

    default:
      return state;
  }
};

export default mainPageReducer;