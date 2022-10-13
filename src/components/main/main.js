import CartSmall from '../cart-small/cart-small';
import { items } from '../../mocks/items';
import { Link } from 'react-router-dom';
import { APP_ROUTE } from '../../const/app-route';

function Item(props) {
  const { name, id, price, img } = props;
  return (
    <li className='main__item'>
      <article className='item'>
        <Link
          to={`${APP_ROUTE.ITEM}/${id}`}
          className='item__img'
          style={{
            background: `url(${img}) center / cover no-repeat`,
          }}
        ></Link>
        <Link to={`${APP_ROUTE.ITEM}/${id}`} className='item__name navigation__link'>
          {name}
        </Link>
        <div className='item__price'>{price} p.</div>
        <div className='item__block'>
          <div className='item__button button button_delete'>delete</div>
          <div className='item__button button'>add</div>
        </div>
      </article>
    </li>
  );
}

export default function Main() {
  return (
    <>
      <CartSmall />
      <ul className='main__items'>
        {items.map((item) => (
          <Item {...item} key={item.id} />
        ))}
      </ul>
    </>
  );
}
