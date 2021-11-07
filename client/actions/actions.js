import * as types from '../constants/actionTypes';

export const logIn = (user, pass) => ({
  type: types.LOG_IN,
  payload: {user, pass},
});

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