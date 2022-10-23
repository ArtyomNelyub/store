import {
  defaultUserState,
  userReducer,
  setUserAction,
  logOutAction,
} from './userReducer';
import { users as mockUsers } from '../mocks/users';
import { UserState } from '../types/userReducerTypes';

describe('Testing userReducer', () => {
  let fakeDefault: null | UserState = null;

  beforeEach(() => {
    fakeDefault = { ...defaultUserState };
  });

  test('set user action', () => {
    expect(
      userReducer(fakeDefault as UserState, setUserAction(mockUsers[0]))
    ).toEqual({
      user: mockUsers[0],
      isAuth: true,
    });
  });

  test('log out action', () => {
    expect(
      userReducer(
        { ...(fakeDefault as UserState), user: mockUsers[1] },
        logOutAction()
      )
    ).toEqual({
      user: null,
      isAuth: false,
    });
  });
});
