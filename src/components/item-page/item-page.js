import CartSmall from '../cart-small/cart-small';
import Buttons from '../buttons/buttons';
import { useParams, Navigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { items } from '../../mocks/items';
import {
  correctItemsAction,
  restCurrentItemAction,
  selectItemAction,
} from '../../store/itemsReducer';
import { APP_ROUTE } from '../../const/app-route';

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

  function onChangeHandler(e) {
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
                    id={id}
                    name={name}
                    price={price}
                    img={img}
                    description={description}
                    count={count}
                    maxCount={maxCount}
                    countChange={countInputValue === 0 ? 1 : countInputValue}
                  >
                    <input
                      ref={countInput}
                      type='number'
                      name='item-count'
                      id='item-count'
                      className='item-page__count'
                      onChange={onChangeHandler}
                      onBlur={onChangeHandler}
                    />
                  </Buttons>
                </div>
              </div>
            </>
          )}
          {adminMode && (
            <AdminMode
              setAdminMode={setAdminMode}
              {...{ name, price, description, count, id }}
            />
          )}
        </div>
      </div>
    </>
  );
}

function AdminMode(props) {
  const { setAdminMode, name, price, count, description, id } = props;
  const [newName, setName] = useState(name);
  const [newPrice, setPrice] = useState(price);
  const [newCount, setCount] = useState(count);
  const [newDescription, setDescription] = useState(description);
  const dispatch = useDispatch();

  function numberHandler(e, cb) {
    const regExText = /^[0-9]+$/;
    if (regExText.test(e.target.value)) {
      cb(e.target.value);
    }
    if (e.target.value === '') {
      cb(0);
    }
    return;
  }

  function textHandler(e, cb) {
    const regExText = /^[a-zA-Z0-9\s]+$/;
    if (regExText.test(e.target.value)) {
      cb(e.target.value);
    }
    if (e.target.value === '') {
      cb('');
    }

    return;
  }

  function textTrim(e, cb) {
    cb(e.target.value.trim());
    return;
  }

  function saveHandler() {
    dispatch(
      correctItemsAction({
        newName,
        newPrice,
        newCount,
        newDescription,
        id,
      })
    );
    setAdminMode(false);
  }
  return (
    <>
      <div className='item-page__header'>
        <div className='item-page__correct-block'>
          <label htmlFor='name'>Название</label>
          <input
            type='text'
            name='name'
            id='name'
            value={newName}
            onChange={(e) => textHandler(e, setName)}
            onBlur={(e) => textTrim(e, setName)}
          />
        </div>
        <div className='item-page__correct-block'>
          <label htmlFor='price'>Цена</label>
          <input
            type='number'
            name='price'
            id='price'
            value={newPrice}
            onChange={(e) => numberHandler(e, setPrice)}
          />
        </div>
      </div>
      <div className='item-page__correct-block'>
        <label htmlFor='count'>В наличии</label>
        <input
          type='number'
          name='count'
          id='count'
          value={newCount}
          onChange={(e) => numberHandler(e, setCount)}
        />
      </div>
      <div className='item-page__correct-block'>
        <label htmlFor='price'>Описание</label>
        <textarea
          name='price'
          id='price'
          rows='7'
          value={newDescription}
          onChange={(e) => textHandler(e, setDescription)}
          onBlur={(e) => textTrim(e, setDescription)}
        ></textarea>
      </div>
      <div className='item-page__footer'>
        <div
          className='item-page__button button_delete button'
          onClick={() => {
            setAdminMode(false);
          }}
        >
          отмена
        </div>
        <div className='item-page__button button' onClick={saveHandler}>
          сохранить
        </div>
      </div>
    </>
  );
}
