import React from 'react';
import { useAppSelector } from '../../hooks';

export default function CartSmall(): JSX.Element {
  const countItems = useAppSelector((state) => state.items.itemCount);
  const priceItems = useAppSelector((state) => state.items.itemPrice);
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const user = useAppSelector((state) => state.user.user);

  if (isAuth && user !== null && !user.isAdmin) {
    return (
      <div className='cart'>
        В корзине {String(countItems)} товаров на сумму {String(priceItems)} р.
      </div>
    );
  }

  return <></>;
}
