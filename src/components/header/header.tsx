import HeaderAuth from './header-auth';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/app-route';

type HeaderProps = {
  setIsModal: (a:boolean) => void
}

export default function Header(props : HeaderProps):JSX.Element {
  const { setIsModal } = props;

  return (
    <header className='header' data-testid='header'>
      <div className='header__container'>
        <nav className='header__navigation navigation'>
          <Link to={AppRoute.MAIN} data-testid='main-link' className='navigation__link'>
            Items
          </Link>
          <Link to={AppRoute.ABOUT} data-testid='about-link' className='navigation__link'>
            About us
          </Link>
          <Link to={AppRoute.CART} data-testid='cart-link' className='navigation__link'>
            Cart
          </Link>
        </nav>
        <HeaderAuth {...{ setIsModal }}/>
      </div>
    </header>
  );
}
