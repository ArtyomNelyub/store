import { Outlet, Link } from 'react-router-dom';
import Auth from '../auth/auth';
import { APP_ROUTE } from '../../const/app-route';
export default function Layout() {
  return (
    <>
      <header className='header'>
        <div className='header__container'>
          <nav className='header__navigation navigation'>
            <Link to={APP_ROUTE.MAIN} className='navigation__link'>Items</Link>
            <Link to={APP_ROUTE.ABOUT} className='navigation__link'>About us</Link>
            <Link to={APP_ROUTE.CART} className='navigation__link'>Cart</Link>
          </nav>
          <div className='header__auth auth'>
            {/* <div className="auth__link">Willigund</div>
            <div className="auth__link">Log-out</div>  */}
            <div className='auth__link'>Log in</div>
          </div>
        </div>
      </header>
      <div className='main'>
        {/* <Auth/> */}
        <div className='main__container'>
          <Outlet />
        </div>
      </div>
    </>
  );
}
