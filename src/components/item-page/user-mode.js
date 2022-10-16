import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import Buttons from '../buttons/buttons';

export default function UserMode(props) {
  const { adminMode, setAdminMode } = props;
  const currentItem = useSelector((state) => state.ITEMS.currentItem);
  const user = useSelector((state) => state.USER.user);
  const { name, price, id, description, count, img, maxCount } = currentItem;
  const [countInputValue, setCountInputValue] = useState(1);
  const countInput = useRef({ value: '' });

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
    <div className='item-page'>
      <div
        className='item-page__img'
        style={{
          background: `url(${img}) center / cover no-repeat`,
        }}
      ></div>
      <div className='item-page__content'>
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
      </div>
    </div>
  );
}
