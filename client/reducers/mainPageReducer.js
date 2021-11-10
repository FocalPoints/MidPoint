import * as types from '../constants/actionTypes';
import axios from 'axios';
import { updateLocation } from '../actions/actions';


const initialState = {
  pageToDisplay: 'login',
  loggedIn: false,
  midpoint: { lat: 40.7142700, lng: -74.0059700 },
  currentUser: {},
  selectedLocations: [],
  friendsList: [],
  notFriendsList: [],
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

    case types.LOG_IN: {
      const { verified, message, user, friendList, notFriendList } = action.payload;
      if (verified) {
        const newLocationList = state.selectedLocations.slice();
        newLocationList.push(user);

        return {
          ...state,
          loggedIn: true,
          midpoint: user.coordinates,
          currentUser: user,
          selectedLocations: newLocationList,
          friendsList: friendList,
          notFriendsList: notFriendList
        };
      }
    }
    case types.SIGN_UP_USER: {
      const { verified, message, user, friendList, notFriendList } = action.payload;
      if (verified) {
        const tempObj = { ...state.selfInfo };
        tempObj.name = user.username;
        tempObj.address = user.coordinates;

        const newLocationList = state.selectedLocations.slice();
        newLocationList.push(user);
        console.log(tempObj)
        return {
          ...state,
          pageToDisplay: 'login',
          loggedIn: true,
          midpoint: user.coordinates,
          currentUser: user,
          selectedLocations: newLocationList,
          friendsList: friendList,
          notFriendsList: notFriendList,
        };
      }
      return {
        ...state,
        pageToDisplay: 'signup',
      };
    }

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

      return {
        ...state,
        friendsList: action.payload.friendList,
        notFriendsList: action.payload.notFriendList,
      }

    case types.ADD_SELECTED: {
      const { user, boolean } = action.payload;
      console.log('user, boolean:', user, boolean);
      let newLocationList = state.selectedLocations.slice();
      if (boolean) {
        newLocationList.push(user);
      }
      else {
        newLocationList = newLocationList.filter(friend => {
          return friend.user_id !== user.user_id;
        })
        console.log(newLocationList);
      }

      return {
        ...state,
        selectedLocations: newLocationList,
      }
    }



    default:
      return state;
  }
};

export default mainPageReducer;