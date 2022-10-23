import { useAppSelector } from '../../hooks';

export default function CartSmall(): JSX.Element {
  const countItems = useAppSelector((state) => state.items.itemCount);
  const priceItems = useAppSelector((state) => state.items.itemPrice);
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const user = useAppSelector((state) => state.user.user);

  if (isAuth && user !== null && !user.isAdmin) {
    return (
      <div className='cart' data-testid='small-cart'>
        В корзине <span data-testid='count-items'>{String(countItems)}</span>{' '}
        товаров на сумму{' '}
        <span data-testid='sum-items'>{String(priceItems)}</span> р.
      </div>
    );
  }

  return <></>;
}
