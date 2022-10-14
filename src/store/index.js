import { createStore, combineReducers } from 'redux';
import { itemsReducer } from './itemsReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer } from './userReducer';

const rootReducer = combineReducers({
  ITEMS: itemsReducer,
  USER: userReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());
