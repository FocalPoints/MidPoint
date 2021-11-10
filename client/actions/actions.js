import * as types from '../constants/actionTypes';
import axios from 'axios';

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

export const pageToSignup = () => ({
  type: types.PAGE_TO_SIGN_UP,
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


export const signUpCancel = () => ({
  type: types.SIGN_UP_CANCEL,
});

export const updateLocation = (address, id) => (dispatch) => {
  console.log(address, id);

  const request = {
    method: 'PATCH',
    url: 'database/newaddress',
    data: { address, id }
  }

  // get back coordinates from address
  axios.request(request).then((response) => {
      const address = response.data.coordinates;
      if (response) dispatch({
        type: types.UPDATE_LOCATION,
        payload: {address},
      })
    }).catch(console.error);
};

export const getMidpoint = (userCoords, friendCoords) => {

  // const lat = (userCoords.lat + friendCoords.lat) / 2;
  // const lng = (userCoords.lng + friendCoords.lng) / 2;
  console.log(userCoords, friendCoords)
  // longitudinal difference
  let dLng = friendCoords.lng - userCoords.lng;
  dLng = dLng * Math.PI / 180;

  // Convert to Radians
  let lat1 = userCoords.lat * Math.PI / 180;
  let lng1 = userCoords.lng * Math.PI / 180;
  let lat2 = friendCoords.lat * Math.PI / 180;

  let bX = Math.cos(lat2) * Math.cos(dLng);
  let bY = Math.cos(lat2) * Math.sin(dLng);
  let lat = Math.atan2(Math.sin(lat1) + Math.sin(lat2), Math.sqrt((Math.cos(lat1) + bX) * (Math.cos(lat1) + bX) + bY * bY));
  let lng = lng1 + Math.atan2(bY, Math.cos(lat1) + bX);

  lat = lat * (180 / Math.PI);
  lng = lng * (180 / Math.PI);

  console.log(lat, lng);
  
  return ({
    type: types.GET_MIDPOINT,
    payload:  {'lat': lat, 'lng': lng}
  })
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

//Add outside friend route to backend
export const addOutsideFriend = (user2_id, username, friendAddress) => (dispatch) => {
  const body = {
    user2_id,
    username,
    friendAddress
  }

  const request = {
    method: 'POST',
    url: 'database/outsideFriend',
    data: body
  }

  axios.request(request).then((response) => {
    console.log(response.data);
    if(response.status == 201) dispatch({
      type: types.ADD_OUTSIDE_FRIEND,
      payload: response.data,
    });
  }).catch(console.error);
};


// export const deleteCard = id => (dispatch, getState) => {
//   if (getState().markets.marketList[id].cards > 0) {
//     dispatch({ type: types.DELETE_CARD, payload: id });
//   }
// };




// export const buyStock = () => (dispatch, getState) => {
//   // grab the symbol from state
//   const sym = getState().stocks.searchBar;
//   const user_id = getState().stocks.user_id;
//   // hit API to get current price of stock
//   const options = {
//     method: 'POST',
//     url: '/transaction',
//     data: {user_id},
//     params: {region: 'US', symbols: sym}
//   }
//   // make a post to the stocks database adding the stock name and current price
//   // make a post to the transactions database with the current user and the stock ID and time, sold price/sold time null
//   axios.request(options).then((response) => {
//     if(response.status = 201) dispatch({
//       type: types.BUY_STOCK,
//       payload: response.data,
//     });
//   }).catch(console.error);
//   // hit reducer to update state with the new query of all transactions...
// };