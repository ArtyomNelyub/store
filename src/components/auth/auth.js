import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { users } from '../../mocks/users';
import { setUserAction } from '../../store/userReducer';

export default function Auth(props) {
  const { setIsModal } = props;
  const dispatch = useDispatch();
  const [isError, setError] = useState(false); 
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const regExTest = /^[a-zA-Z0-9]+$/;

  function closeModal() {
    setIsModal(false);
  }

  function inputHandler(e, cb) {
    if (regExTest.test(e.target.value)) {
      cb(e.target.value);
    }
    if (e.target.value === '') {
      cb('');
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
              onChange={e => inputHandler(e, setLogin)}
            />
          </div>

          <div className='modal__field'>
            <label htmlFor='login'>Password</label>
            <input
              type='text'
              name='login'
              id='login'
              value={password}
              onChange={e => inputHandler(e, setPassword)}
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
