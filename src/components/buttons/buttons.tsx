import { ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  addItemAction,
  deleteItemAction,
  updateSmallCartAction,
} from '../../app-store/itemsReducer';
import { Item } from '../../types/items';

type ButtonsProps = Item & {
  countChange?: number;
  children?: ReactNode;
};

export default function Buttons({
  id,
  name,
  price,
  img,
  description,
  count,
  countChange = 1,
  maxCount,
  children,
}: ButtonsProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const user = useAppSelector((state) => state.user.user);

  function onClickHandlerAdd(): void {
    if (count === 0) {
      return;
    }
    if (countChange > count) {
      return;
    }

    dispatch(
      addItemAction({
        id,
        name,
        price,
        description,
        img,
        count: countChange,
        maxCount,
      })
    );
    dispatch(updateSmallCartAction());
  }

  function onClickHandlerDelete(): void {
    if (count === maxCount) {
      return;
    }
    if (countChange > maxCount - count) {
      return;
    }
    dispatch(deleteItemAction({ id, count: countChange }));
    dispatch(updateSmallCartAction());
  }

  if (!isAuth) {
    return (
      <div className='info' data-testid='info-block'>
        Пожалуйста, зарегистрируйтесь, чтобы совершать покупки.
      </div>
    );
  }

  if (isAuth && user !== null && user.isAdmin) {
    return <></>;
  }

  return (
    <>
      <button
        data-testid='delete-button'
        className='item__button button button_delete'
        onClick={onClickHandlerDelete}
        disabled={count === maxCount || maxCount - count < countChange}
      >
        delete
      </button>

      {children}

      <button
        data-testid='add-button'
        className='item__button button'
        onClick={onClickHandlerAdd}
        disabled={countChange > count || count <= 0}
      >
        {count <= 0 ? 'none' : 'add'}
      </button>
    </>
  );
}
