import { Link } from 'react-router-dom';
import { APP_ROUTE } from '../../const/app-route';
import Buttons from '../buttons/buttons';

export default function Item(props) {
  const { name, id, price, img, description, count, maxCount } = props;

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
        <Link
          to={`${APP_ROUTE.ITEM}/${id}`}
          className='item__name navigation__link'
        >
          {name}
        </Link>
        <div className='item__price'>{price} p.</div>
        <div className='item__block'>
          <Buttons
            id={id}
            name={name}
            price={price}
            img={img}
            description={description}
            count={count}
            maxCount={maxCount}
          />
        </div>
      </article>
    </li>
  );
}
