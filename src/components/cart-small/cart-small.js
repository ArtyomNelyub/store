import { useSelector } from 'react-redux';

export default function CartSmall() {
  const countItems = useSelector((state) => state.ITEMS.itemCount);
  const priceItems = useSelector((state) => state.ITEMS.itemPrice);
  const isAuth = useSelector((state) => state.USER.isAuth);
  const user = useSelector((state) => state.USER.user);

  return (
    isAuth &&
    user !== null &&
    !user.isAdmin && (
      <div className='cart'>
        В корзине {countItems} товаров на сумму {priceItems} р.
      </div>
    )
  );
}
