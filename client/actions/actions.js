import * as types from '../constants/actionTypes';
import axios from 'axios';



export const pageToSignup = () => ({
  type: types.PAGE_TO_SIGN_UP,
});

export const signUpCancel = () => ({
  type: types.SIGN_UP_CANCEL,
});

export const logOut = () => ({
  type: types.LOG_OUT,
});

export const updateLocation = (newAddress) => ({
  //update to also request that the user coords get updated, send back updated coords and new displayAddress
  type: types.UPDATE_LOCATION,
  payload: {newAddress},
});

export const signUpUser = (username, password, address) => (dispatch) => {
  // const coordinates = {lat, lng}  
  
  const request = {
      method: 'POST',
      url: '/database/signup',
      data: {username, password, address}
    }
   
    axios.request(request).then((response) => {
      if(response.status = 201) dispatch({
        type: types.SIGN_UP_USER,
        payload: response.data,
      });
    }).catch(console.error);
};

export const logIn = (username, password) => (dispatch) => {
  const request = {
    method: 'GET',
    url: '/database/login',
    params: {username, password}
  }
 
  axios.request(request).then((response) => {
    if(response.status = 201) dispatch({
      type: types.LOG_IN,
      payload: response.data, //will hold the user object
    });
  }).catch(console.error);
};

export const addFriend = (user1_id, user2_id) => (dispatch) => {
  const request = {
    method: 'POST',
    url: 'database/friend',
    data: {user1_id, user2_id}
  }

  axios.request(request).then((response) => {
    if(response.status = 201) dispatch({
      type: types.ADD_FRIEND,
      payload: response.data,
    });
  }).catch(console.error);
}

export const getMidpoint = (userCoords, friendCoords) => {

  const lat = (userCoords.lat + friendCoords.lat) / 2;
  const lng = (userCoords.lng + friendCoords.lng) / 2;

  const request = {
    method: 'POST',
    url: 'nearbysearch',
    //url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522%2C151.1957362&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyD3ffU-AJuJVW1AB3do_AOV2hi1mwYavTU',
    data: {lat: lat, lng: lng, radius: 1500, type: 'restaurant', keyword: ''}
  };

  axios(request)
  .then(function (response) {
    console.log('in .then')
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });

  
  return ({
    type: types.GET_MIDPOINT,
    payload:  {'lat': lat, 'lng': lng}
  })
}