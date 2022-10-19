import Buttons from '../buttons/buttons';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/app-route';
import { Item } from '../../types/items';

export default function ItemCard(props: Item): JSX.Element {
  const { name, id, price, img, description, count, maxCount } = props; 
  return (
    <li className='main__item'>
      <article className='item'>
        <Link
          to={`${AppRoute.ITEM}/${id}`}
          className='item__img'
          style={{
            background: `url(${img}) center / cover no-repeat`,
          }}
        ></Link>
        <Link
          to={`${AppRoute.ITEM}/${id}`}
          className='item__name navigation__link'
        >
          {name}
        </Link>
        <div className='item__price'>{price} p.</div>
        <div className='item__block'>
          <Buttons
            {...{ id, name, price, img, description, count, maxCount }}
          />
        </div>
      </article>
    </li>
  );
}
