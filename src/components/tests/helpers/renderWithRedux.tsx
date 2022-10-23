import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { itemsReducer } from '../../../app-store/itemsReducer';
import { userReducer } from '../../../app-store/userReducer';
import { ItemsState } from '../../../types/itemsReducerTypes';
import { UserState } from '../../../types/userReducerTypes';

export const renderWithRedux = (component: JSX.Element, initialItemsState:ItemsState, initialUserState:UserState) => {
  const rootReducer = combineReducers({
    items: itemsReducer,
    user: userReducer,
  });

  const store = createStore(rootReducer, {
    items: initialItemsState,
    user: initialUserState,
  });

  return <Provider store={store}>{component}</Provider>;
};
