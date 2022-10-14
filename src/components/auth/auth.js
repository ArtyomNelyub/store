import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { users } from '../../mocks/users';
import { setUserAction } from '../../store/userReducer';

export default function Auth(props) {
  const { setIsModal } = props;
  const dispatch = useDispatch();
  const [isError, setError] = useState(false); // = useSelector((state) => state.USER.isError);]
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const regExTest = /^[a-zA-Z0-9]+$/;

  function closeModal() {
    setIsModal(false);
  }

  function loginHandler(e) {
    if (regExTest.test(e.target.value)) {
      setLogin(e.target.value);
    }
    if (e.target.value === '') {
      setLogin('');
    }
  }

  function passwordHandler(e) {
    if (regExTest.test(e.target.value)) {
      setPassword(e.target.value);
    }
    if (e.target.value === '') {
      setPassword('');
    }
  }

  function loginActionHandler() {
    users.forEach((user) => {
      if (user.name === login && user.password === password) {
        dispatch(setUserAction(user));
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
        <div className='modal__close' onClick={closeModal}>
          X
        </div>
        {isError && (
          <div className='modal__error'>Неверный логи или пароль</div>
        )}
        <div className='modal__data'>
          <div className='modal__field'>
            <label htmlFor='login'>Login</label>
            <input
              type='text'
              name='login'
              id='login'
              value={login}
              onChange={loginHandler}
            />
          </div>
          <div className='modal__field'>
            <label htmlFor='login'>Password</label>
            <input
              type='text'
              name='login'
              id='login'
              value={password}
              onChange={passwordHandler}
            />
          </div>
        </div>

        <button className='button' onClick={loginActionHandler}>
          log in
        </button>
        <button className='button button_delete' onClick={closeModal}>
          cancel
        </button>
      </div>
    </div>
  );
}
