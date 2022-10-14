import { Outlet, Link } from 'react-router-dom';
import { APP_ROUTE } from '../../const/app-route';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Auth from '../auth/auth';
import { logOutAction } from '../../store/userReducer';

export default function Layout() {
  const [isModal, setIsModal] = useState(false);
  const user = useSelector((state) => state.USER.user);
  const dispatch = useDispatch();

  function logOut() {
    dispatch(logOutAction());
  }

  return (
    <>
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
              <div className='auth__link' onClick={() => setIsModal(!isModal)}>
                Log in
              </div>
            ) : (
              <>
                <div className='auth__link'>{user.name}</div>
                <div className='auth__link' onClick={logOut}>
                  Log-out
                </div>
              </>
            )}
          </div>
        </div>
      </header>
      <div className='main'>
        {isModal && <Auth setIsModal={setIsModal} />}
        <div className='main__container'>
          <Outlet />
        </div>
      </div>
    </>
  );
}
