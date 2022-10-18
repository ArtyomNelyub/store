import { User } from './users';
import { Actions } from '../store/userReducer';

export type UserState = {
  user: null | User;
  isAuth: boolean;
};

type ActionWithUser = {
  type: Actions.SET_USER;
  payload: User;
};
type ActionWithoutPayload = {
  type: Actions.LOG_OUT;
};

export type Action = ActionWithUser | ActionWithoutPayload;
