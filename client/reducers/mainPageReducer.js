import * as types from '../constants/actionTypes';
import axios from 'axios';
import { updateLocation } from '../actions/actions';


const initialState = {
  pageToDisplay: 'login',
  currentUserID: '',
  // currentUser: {
  //  id: null,
  //  avatar: 'https://www.mindenpictures.com/cache/pcache2/90392052.jpg',
  //  name: '',
  //  coordinates: {
  //    lat: 40,
  //    lng: -74
  //  }
  // }
  loggedIn: false,
  selfInfo: { avatar: 'https://www.mindenpictures.com/cache/pcache2/90392052.jpg', name: 'Wunderpus Photogenicus', address: { lat: 40, lng: -74 } },
  friendsList: [],
  notFriendsList: [],
  midpoint: { lat: 40.7142700, lng: -74.0059700 },
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
      if (action.payload.verified) {
        const tempObj = { ...state.selfInfo };
        tempObj.name = action.payload.user.username;
        tempObj.address = {lat: Number(action.payload.user.coordinates.lat), lng: Number(action.payload.user.coordinates.lng)}

        return {
          ...state,
          currentUserID: action.payload.user.user_id,
          selfInfo: tempObj,
          friendsList: action.payload.friendList,
          notFriendsList: action.payload.notFriendList,
          loggedIn: true,
        };
      }

      case types.SIGN_UP_USER:

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
        const tempObj = Object.assign({}, state.selfInfo);
        tempObj.address = action.payload.address;
        return {
          ...state,
          selfInfo: tempObj,
        }
        
      case types.GET_MIDPOINT:
        return {
          ...state,
          midpoint: action.payload
        }


    case types.ADD_FRIEND:
      console.log("add friend triggered")

      return {
        ...state,
        friendsList: action.payload.friendList,
        notFriendsList: action.payload.notFriendList,
      }

    default:
      return state;
  }
};

export default mainPageReducer;