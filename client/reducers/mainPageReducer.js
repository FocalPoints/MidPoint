import * as types from '../constants/actionTypes';


const initialState = {
  loggedIn: false,
  pageToDisplay: 'login',
  userID: null,
  userAvatar: 'https://st3.depositphotos.com/7863750/16862/i/1600/depositphotos_168621110-stock-photo-halloween-cat-snake-cook.jpg', //change where selfInfo.avatar updated - then map to props
  userName: 'CatSnake', //change where selfInfo.name updated - then map to props
  userAddress: '', //make it the displayAddress sent back from server upon signup and login
  userCoords: { lat: 40, lng: -74 }, //change where selfInfo.address updated - then map to props
  friendsList: [],
  notFriendsList: [],
  midpoint: { lat: 40, lng: -74 }
};

const mainPageReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.PAGE_TO_SIGN_UP: { //unaffected, good
      return {
        ...state,
        pageToDisplay: 'signup'
      };
    }

    case types.SIGN_UP_CANCEL: { //unaffected, good
      return {
        ...state,
        pageToDisplay: 'login' 
      };
    }


    case types.LOG_OUT: {
      const tempObj = { ...state.selfInfo };
      tempObj.name = 'CatSnake'
      return {
        ...state,
        loggedIn: false,
        userID: '',
        userName: 'CatSnake',
        userAddress: '',
        userCoords: { lat: 40, lng: -74 },
        friendsList: [],
        notFriendsList: [],
        midpoint: { lat: 40, lng: -74 }
      }
    }

    case types.UPDATE_LOCATION: {
      return {
        ...state,
        userAddress: action.payload.newAddress //this is the string the user entered in the sidebar field
        //try getting db to update user coordinates
      }
    }

    case types.SIGN_UP_USER: {
      if(action.payload.verified === true) { //want to update userName, user's coordinates, and displayAddress
        return {
          ...state,
          userID: action.payload.user.user_id,
          userName: action.payload.user.username,
          userAddress: action.payload.displayAddress,
          userCoords: {lat: Number(action.payload.user.coordinates.lat), lng: Number(action.payload.user.coordinates.lng)},
          loggedIn: true,
          notFriendsList: action.payload.notFriendList,
          pageToDisplay: 'login',
          midpoint: {lat: Number(action.payload.user.coordinates.lat), lng: Number(action.payload.user.coordinates.lng)}
        };    
      } else {
        return {
          ...state,
          pageToDisplay: 'signup',
        };
      }
      }

    case types.LOG_IN: {
      if (action.payload.verified) { 
        return {
          ...state,
          loggedIn: true,
          userID: action.payload.user.user_id,
          userName: action.payload.user.username,
          userCoords: {lat: Number(action.payload.user.coordinates.lat), lng: Number(action.payload.user.coordinates.lng)},
          // userAddress: action.payload.displayAddress,
          friendsList: action.payload.friendList,
          notFriendsList: action.payload.notFriendList,
          //how to get marker to first render on user coords? maybe set initial midpoint to that on login
          midpoint: {lat: Number(action.payload.user.coordinates.lat), lng: Number(action.payload.user.coordinates.lng)}
        };
      }
    }

     case types.ADD_FRIEND: { //console.log('add friend triggered')
      return {
        ...state,
        friendsList: action.payload.friendList,
        notFriendsList: action.payload.notFriendList,
       }
     }
        
     case types.GET_MIDPOINT: {
      return {
        ...state,
        midpoint: action.payload
      }
    }

    

    default: {
      return state;
    }
  }
};

export default mainPageReducer;