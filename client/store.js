import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { logIn } from './actions/actions';
import reducers from './reducers/combineReducer';

// we are adding composeWithDevTools here to get easy access to the Redux dev tools
const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

// store.dispatch(logIn('james', 'maguire'));

export default store;