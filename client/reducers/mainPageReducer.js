import * as types from '../constants/actionTypes';
import axios from 'axios';
import { updateLocation } from '../actions/actions';


const initialState = {
  pageToDisplay: 'login',
  currentUserID: '', // this is primary key for the username, should be a number.
  loggedIn: false,
  selfInfo: {avatar: 'https://www.mindenpictures.com/cache/pcache2/90392052.jpg', name: 'Wunderpus Photogenicus', address: {lat: 40, lng: -74}},
  friendsList: [],
  notFriendsList: [],
  midpoint: {lat: 40.7142700, lng: -74.0059700},
};
// Latitude: 40.7142700° Longitude: -74.0059700
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
      Returns: {verified: bool, message: string, user: userObject} //in future we'll have a friends key in this object
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
      'john','yogi','cece','james','johnny'
    */
      console.log('Login action type has been triggered')
      console.log(action.payload)
      console.log(action.payload.user.user_id)


      if (action.payload.verified) {
        const tempObj = {...state.selfInfo};
        tempObj.name = action.payload.user.username;
        tempObj.address = {lat: Number(action.payload.user.coordinates.lat), lng: Number(action.payload.user.coordinates.lng)};

        //this will be replaced with friendList from backend
        // const actionPayloadFriends = action.payload.friendList;
        // const newFriendList = actionPayloadFriends.map(obj => ({'user_id': obj.user_id, 'username': obj.username, 'coordinates': obj.coordinates}))

        // //this will be replaced with notFriendList from backend
        // const actionPayloadNotFriends =  [ { user_id: 1, username: 'John', password: '123', created_on: 'right now', coordinates: {lat: 1, lng: -1 } }, { user_id: 2, username: 'Yogi', password: '123', created_on: 'right now', coordinates: {lat: 2, lng: -2 } }, { user_id: 3, username: 'Johnny', password: '123', created_on: 'right now', coordinates: {lat: 3, lng: -3} }] //this will become action.payload.(friends)? extract names and put into list
        // const newNotFriends = actionPayloadNotFriends.map(obj => obj.username)
        
        return {
          ...state,
          currentUserID: action.payload.user.user_id,
          selfInfo: tempObj,
          friendsList: action.payload.friendList,
          notFriendsList: action.payload.notFriendList,
          loggedIn: true, // obj.booleanValue
        };
      }


      case types.SIGN_UP_USER:
        console.log("SIGN_UP_USER action type has been triggered")
        console.log('action pay', action.payload)

        

        if(action.payload.verified === true) {
          const tempObj = {...state.selfInfo};
          tempObj.name = action.payload.user.username;
          tempObj.address = `{lat: ${action.payload.user.coordinates.lat}, lng: ${action.payload.user.coordinates.lng}}`;

          return {
            ...state,
            currentUserID: action.payload.user.user_id,
            selfInfo: tempObj,
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
          midpoint: action.payload
        }

      //update location needs ID

    default:
      return state;
  }
};

export default mainPageReducer;