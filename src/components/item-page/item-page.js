import CartSmall from '../cart-small/cart-small';
import Buttons from '../buttons/buttons';
import { useParams, Navigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { items } from '../../mocks/items';
import { selectItemAction } from '../../store/itemsReducer';
import { APP_ROUTE } from '../../const/app-route';
import AdminMode from './admin-mode';

export default function ItemPage() {
  const { id: currentId } = useParams();
  const dispatch = useDispatch();
  const countInput = useRef({ value: '' });
  const isItemsLoaded = useSelector((state) => state.ITEMS.isItemsLoaded);
  const itemsInShop = useSelector((state) => state.ITEMS.items);
  const isItemLoaded = useSelector((state) => state.ITEMS.isItemLoaded);
  const currentItem = useSelector((state) => state.ITEMS.currentItem);
  const user = useSelector((state) => state.USER.user);
  const [countInputValue, setCountInputValue] = useState(1);
  const [adminMode, setAdminMode] = useState(false);

  useEffect(() => {
    if (isItemsLoaded) {
      dispatch(
        selectItemAction(itemsInShop.find((i) => i.id === Number(currentId)))
      );
    } else {
      setTimeout(() => {
        dispatch(
          selectItemAction(items.find((i) => i.id === Number(currentId)))
        );
      }, 500);
    }
  }, [currentId, dispatch, isItemsLoaded, itemsInShop]);

  if (!isItemLoaded) {
    return <div>Loading...</div>;
  }

  if (currentItem === undefined) {
    return <Navigate to={APP_ROUTE.NOT_FOUND} />;
  }

  const { name, price, id, description, count, img, maxCount } = currentItem;

  function countHandler(e) {
    if (e.target.value < 0) {
      e.target.value = 0;
      return;
    }
    if (e.target.value >= count) {
      e.target.value = count;
      return;
    }

    setCountInputValue(Number(e.target.value));
  }

  return (
    <>
      <CartSmall />
      <div className='item-page'>
        <div
          className='item-page__img'
          style={{
            background: `url(${img}) center / cover no-repeat`,
          }}
        ></div>

        <div className='item-page__content'>
          {!adminMode && (
            <>
              <div className='item-page__header'>
                <div className='item-page__name'>{name}</div>
                <div className='item-page__price'>{price} р.</div>
              </div>
              <div className='item-page__number'>В наличии: {count} шт.</div>
              <p className='item-page__text'>{description}</p>
              <div className='item-page__footer'>
                {user !== null && user.isAdmin && !adminMode && (
                  <div
                    className='item-page__button button_correct button'
                    onClick={() => {
                      setAdminMode(true);
                    }}
                  >
                    редактировать
                  </div>
                )}
                <div className='item-page__add-block'>
                  <Buttons
                    {...{ id, name, price, img, description, count, maxCount }}
                    countChange={countInputValue === 0 ? 1 : countInputValue}
                  >
                    <input
                      ref={countInput}
                      type='number'
                      name='item-count'
                      id='item-count'
                      className='item-page__count'
                      onChange={countHandler}
                      onBlur={countHandler}
                    />
                  </Buttons>
                </div>
              </div>
            </>
          )}

          {adminMode && (
            <AdminMode
              {...{ name, price, description, count, id, setAdminMode }}
            />
          )}
        </div>
      </div>
    </>
  );
}
