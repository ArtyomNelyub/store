import React, { ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addItemAction, deleteItemAction } from '../../store/itemsReducer';
import { Item } from '../../types/items';

type ButtonsProps = Item & {
  countChange?: number,
  children?: ReactNode 
}

export default function Buttons(props : ButtonsProps):JSX.Element {
  const {
    id,
    name,
    price,
    img,
    description,
    count,
    countChange = 1,
    maxCount,
    children,
  } = props;
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const user = useAppSelector((state) => state.user.user);

  function onClickHandlerAdd() {
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
  }

  function onClickHandlerDelete() {
    if (count === maxCount) {
      return;
    }
    if (countChange > maxCount - count) {
      return;
    }
    dispatch(deleteItemAction({ id, count: countChange }));
  }

  if (!isAuth) {
    return (
      <div className='info'>
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
        className='item__button button button_delete'
        onClick={onClickHandlerDelete}
        disabled={count === maxCount}
      >
        delete
      </button>
      {children}
      <button
        className='item__button button'
        onClick={onClickHandlerAdd}
        disabled={count <= 0}
      >
        {count <= 0 ? 'none' : 'add'}
      </button>
    </>
  );
}