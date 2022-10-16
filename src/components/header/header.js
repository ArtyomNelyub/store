import { useSelector, useDispatch } from 'react-redux';
import { logOutAction } from '../../store/userReducer';
import { Link } from 'react-router-dom';
import { APP_ROUTE } from '../../const/app-route';

export default function Header(props) {
  const { setIsModal } = props;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.USER.user);

  return (
    <header className='header'>
      <div className='header__container'>
        <nav className='header__navigation navigation'>
          <Link to={APP_ROUTE.MAIN} className='navigation__link'>
            Items
          </Link>
          <Link to={APP_ROUTE.ABOUT} className='navigation__link'>
            About us
          </Link>
          <Link to={APP_ROUTE.CART} className='navigation__link'>
            Cart
          </Link>
        </nav>
        <div className='header__auth auth'>
          {user === null ? (
            <div className='auth__link' onClick={() => setIsModal(true)}>
              Log in
            </div>
          ) : (
            <>
              <div className='auth__link'>{user.name}</div>
              <div
                className='auth__link'
                onClick={() => dispatch(logOutAction())}
              >
                Log-out
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
