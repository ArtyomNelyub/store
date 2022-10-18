import { correctItemAction } from '../../store/itemsReducer';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks';
import React from 'react';
import { Item } from '../../types/items';

type AdminModeProps = {
  setAdminMode: (adminMode: boolean) => void;
};

export default function AdminMode(props: AdminModeProps): JSX.Element {
  const { setAdminMode } = props;
  const currentItem = useAppSelector((state) => state.items.currentItem);

  const dispatch = useDispatch();
  const { name, price, id, description, count, img } = currentItem as Item;
  const [newName, setName] = useState(name);
  const [newPrice, setPrice] = useState(price);
  const [newCount, setCount] = useState(count);
  const [newDescription, setDescription] = useState(description);

  function numberHandler(e, cb) {
    const regExNumber = /(\d)|(\.)$/;
    if (regExNumber.test(e.target.value)) {
      cb(e.target.value);
    }
    if (e.target.value === '') {
      cb(0);
    }

    return;
  }

  function numberCorrector(e, cb) {
    cb(parseFloat(e.target.value).toFixed(2).toString());
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
      correctItemAction({
        name: newName,
        id,
        price: newPrice,
        img: img,
        description: newDescription,
        count: newCount,
        maxCount: newCount,
      })
    );
    setAdminMode(false);
  }

  return (
    <div className='item-page'>
      <div
        className='item-page__img'
        style={{
          background: `url(${img}) center / cover no-repeat`,
        }}
      ></div>
      <div className='item-page__content'>
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
              onBlur={(e) => numberCorrector(e, setPrice)}
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
            onBlur={(e) => numberCorrector(e, setCount)}
          />
        </div>
        <div className='item-page__correct-block'>
          <label htmlFor='price'>Описание</label>
          <textarea
            name='price'
            id='price'
            rows={7}
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
      </div>
    </div>
  );
}