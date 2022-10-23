import { User } from '../types/users';
import { UserState, Action } from '../types/userReducerTypes';

export const defaultUserState: UserState = {
  user: null,
  isAuth: false,
};

export enum Actions {
  SET_USER = 'SET_USER',
  LOG_OUT = 'LOG_OUT',
}

export const userReducer = (
  state = defaultUserState,
  action: Action
): UserState => {
  switch (action.type) {
    case Actions.SET_USER:
      return { isAuth: true, user: action.payload };
    case Actions.LOG_OUT:
      return { isAuth: false, user: null };
    default:
      return state;
  }
};

export const setUserAction = (
  payload: User
): {
  type: Actions.SET_USER;
  payload: User;
} => ({
  type: Actions.SET_USER,
  payload,
});

export const logOutAction = (): { type: Actions.LOG_OUT } => ({
  type: Actions.LOG_OUT,
});
