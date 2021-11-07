import * as types from '../constants/actionTypes';
import axios from 'axios';


export const signUp = () => ({
  type: types.SIGN_UP,
});

export const signUpUser = (user,pass,lat,lng) => ({
  type: types.SIGN_UP_USER,
  payload: {user, pass, lat, lng},
});

export const signUpCancel = () => ({
  type: types.SIGN_UP_CANCEL,
});

export const updateLocation = (address) => ({
  type: types.UPDATE_LOCATION,
  payload: {address},
})

export const getMidpoint = (user, friendUser) => ({
  type: types.GET_MIDPOINT,
  payload: {user, friendUser}
})

// export const deleteCard = id => (dispatch, getState) => {
//   if (getState().markets.marketList[id].cards > 0) {
//     dispatch({ type: types.DELETE_CARD, payload: id });
//   }
// };


export const logIn = (user, pass) => (dispatch) => {
  const username = user;
  const password = pass;
  
  const request = {
    method: 'GET',
    url: '/database/login',
    data: {username, password}
  }

  axios.request(request).then((response) => {
    if(response.status = 200) dispatch({
      type: types.BUY_STOCK,
      payload: response.data,
    });
  }).catch(console.error);
};

export const buyStock = () => (dispatch, getState) => {
  // grab the symbol from state
  const sym = getState().stocks.searchBar;
  const user_id = getState().stocks.user_id;
  // hit API to get current price of stock
  const options = {
    method: 'POST',
    url: '/transaction',
    data: {user_id},
    params: {region: 'US', symbols: sym}
  }
  // make a post to the stocks database adding the stock name and current price
  // make a post to the transactions database with the current user and the stock ID and time, sold price/sold time null
  axios.request(options).then((response) => {
    if(response.status = 201) dispatch({
      type: types.BUY_STOCK,
      payload: response.data,
    });
  }).catch(console.error);
  // hit reducer to update state with the new query of all transactions...
};