import Buttons from '../buttons/buttons';
import { useState, useRef } from 'react';
import { useAppSelector } from '../../hooks/index';
import { Item } from '../../types/items';

type UserModeProps = {
  adminMode: boolean;
  setAdminMode: (a: boolean) => void;
};

export default function UserMode(props: UserModeProps): JSX.Element {
  const { adminMode, setAdminMode } = props;
  const user = useAppSelector((state) => state.user.user);
  const currentItem = useAppSelector((state) => state.items.currentItem);
  const { name, price, id, description, count, img, maxCount } =
    currentItem as Item;
  const [countInputValue, setCountInputValue] = useState<number>(1);
  const countInput = useRef<HTMLInputElement | null>(null);

  function countHandler(e: React.ChangeEvent<HTMLInputElement>): void {
    if (Number(e.target.value) < 0) {
      e.target.value = '0';
      return;
    }
    if (Number(e.target.value) >= count) {
      e.target.value = count.toString();
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
