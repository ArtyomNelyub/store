import { useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { users as mockUsers } from '../../mocks/users';
import { setUserAction } from '../../app-store/userReducer';

type AuthProps = {
  setIsModal: (a: boolean) => void;
};

export default function Auth(props: AuthProps): JSX.Element {
  const { setIsModal } = props;
  const dispatch = useAppDispatch();
  const [isError, setError] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const regExTest = /^[a-zA-Z0-9]+$/;

  function inputHandler(
    e: React.ChangeEvent<HTMLInputElement>,
    cb: (str: string) => void
  ) {
    if (regExTest.test(e.target.value)) {
      cb(e.target.value);
    }
    if (e.target.value === '') {
      cb('');
    }
  }

  function loginActionHandler() {
    mockUsers.forEach((mockUser) => {
      if (mockUser.name === login && mockUser.password === password) {
        dispatch(setUserAction(mockUser));
        setError(false);
        setIsModal(false);
      } else {
        setError(true);
      }
    });
  }

  return (
    <div className='modal'>
      <div className='modal__window'>
        <div className='modal__close' onClick={() => setIsModal(false)}>
          X
        </div>

        {isError && (
          <div className='modal__error'>Неверный логин или пароль</div>
        )}

        <div className='modal__data'>
          <div className='modal__field'>
            <label htmlFor='login'>Login</label>
            <input
              type='text'
              name='login'
              id='login'
              value={login}
              onChange={(e) => inputHandler(e, setLogin)}
            />
          </div>

          <div className='modal__field'>
            <label htmlFor='login'>Password</label>
            <input
              type='text'
              name='login'
              id='login'
              value={password}
              onChange={(e) => inputHandler(e, setPassword)}
            />
          </div>
        </div>

        <button className='button' onClick={loginActionHandler}>
          log in
        </button>

        <button
          className='button button_delete'
          onClick={() => setIsModal(false)}
        >
          cancel
        </button>
      </div>
    </div>
  );
}
