import { logOutAction } from '../../store/userReducer';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/app-route';
import { clearCartAction } from '../../store/itemsReducer';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';

type HeaderProps = {
  setIsModal: (a:boolean) => void
}

export default function Header(props : HeaderProps):JSX.Element {
  const { setIsModal } = props;
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  return (
    <header className='header'>
      <div className='header__container'>
        <nav className='header__navigation navigation'>
          <Link to={AppRoute.MAIN} className='navigation__link'>
            Items
          </Link>
          <Link to={AppRoute.ABOUT} className='navigation__link'>
            About us
          </Link>
          <Link to={AppRoute.CART} className='navigation__link'>
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
                onClick={() => {
                  dispatch(logOutAction());
                  dispatch(clearCartAction());
                }}
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
