import Buttons from '../buttons/buttons';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/app-route';
import { useAppSelector } from '../../hooks';

export default function ItemCards(): JSX.Element {
  const items = useAppSelector((state) => state.items.items);
  return (
    <ul className='main__items' data-testid='items-block'>
      {items.map((item) => (
        <li className='main__item' key={item.id} data-testid={`item-${item.id}`}>
          <article className='item'>
            <Link
              to={`${AppRoute.ITEM}/${item.id}`}
              className='item__img'
              data-testid='item-image'
              style={{
                background: `url(${item.img}) center / cover no-repeat`,
              }}
            ></Link>
            <Link
              to={`${AppRoute.ITEM}/${item.id}`}
              className='item__name navigation__link'
              data-testid='item-name'
            >
              {item.name}
            </Link>
            <div className='item__price'>{item.price} p.</div>
            <div className='item__block'>
              <Buttons
                id={item.id}
                name={item.name}
                price={item.price}
                img={item.img}
                description={item.description}
                count={item.count}
                maxCount={item.maxCount}
                key={item.count}
              />
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
