import { createStore, combineReducers } from 'redux';
import { itemsReducer } from './itemsReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer } from './userReducer';

export const rootReducer = combineReducers({
  items: itemsReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, composeWithDevTools());
