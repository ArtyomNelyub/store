const userDefaultState = {
  user: null,
  isAuth: false,
};

const SET_USER = 'SET_USER';
const LOG_OUT = 'LOG_OUT';

export const userReducer = (state = userDefaultState, action) => {
  switch (action.type) {
    case SET_USER:
      return { isAuth: true, user: action.payload };
    case LOG_OUT:
      return { isAuth: false, user: null };
    default:
      return state;
  }
};

export const setUserAction = (payload) => ({ type: SET_USER, payload });
export const logOutAction = () => ({ type: LOG_OUT });
