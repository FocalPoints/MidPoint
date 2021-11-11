import * as types from '../constants/actionTypes';

import axios from 'axios';

export const logIn = (username, password) => (dispatch) => {
  const request = {
    method: 'GET',
    url: '/database/login',
    params: { username, password }
  }

  axios.request(request).then((response) => {
    if (response.status = 201) dispatch({
      type: types.LOG_IN,
      payload: response.data, //will hold the user object
    });
  }).catch(console.error);
};

export const pageToSignup = () => ({
  type: types.PAGE_TO_SIGN_UP,
});

export const signUpUser = (username, password, address) => (dispatch) => {
  // const coordinates = {lat, lng}  

  const request = {
    method: 'POST',
    url: '/database/signup',
    data: { username, password, address }
  }

  axios.request(request).then((response) => {
    if (response.status = 201) dispatch({
      type: types.SIGN_UP_USER,
      payload: response.data,
    });
  }).catch(console.error);
};

//update location
export const updateLocation = (user_id, address) => (dispatch) => { 
  
  const request = {
    method: 'PUT',
    url: '/database', 
    data: { user_id, address }
  }

  axios.request(request).then((response) => {
    if (response.status = 201) dispatch({
      type: types.UPDATE_LOCATION,
      payload: response.data,
    });
  }).catch(console.error);
};

  










export const signUpCancel = () => ({
  type: types.SIGN_UP_CANCEL,
});



export const addSelected = (user, boolean) => ({
  type: types.ADD_SELECTED,
  payload: { user, boolean },
})

export const getMidpoint = (userCoords, friendCoords) => {

  const lat = (userCoords.lat + friendCoords.lat) / 2;
  const lng = (userCoords.lng + friendCoords.lng) / 2;

  return ({
    type: types.GET_MIDPOINT,
    payload: { 'lat': lat, 'lng': lng }
  })
}

export const addFriend = (user1_id, user2_id) => (dispatch) => {
  const request = {
    method: 'POST',
    url: 'database/friend',
    data: { user1_id, user2_id }
  }

  axios.request(request).then((response) => {
    if (response.status = 201) dispatch({
      type: types.ADD_FRIEND,
      payload: response.data,
    });
  }).catch(console.error);
}


