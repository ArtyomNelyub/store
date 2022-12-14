import { correctItemAction } from '../../app-store/itemsReducer';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks';
import { Item } from '../../types/items';

type AdminModeProps = {
  setAdminMode: (adminMode: boolean) => void;
};

export default function AdminMode(props: AdminModeProps): JSX.Element {
  const { setAdminMode } = props;
  const currentItem = useAppSelector((state) => state.items.currentItem);

  const dispatch = useDispatch();
  const { name, price, id, description, count, img } = currentItem as Item;
  const [newName, setName] = useState<string>(name);
  const [newPrice, setPrice] = useState<number>(price);
  const [newCount, setCount] = useState<number>(count);
  const [newDescription, setDescription] = useState<string>(description);

  function priceHandler(
    e: React.ChangeEvent<HTMLInputElement>,
    cb: (numb: number) => void
  ) {
    const regExNumber = /^(?=.*\d)\d*(?:\.\d{0,2})?$/;
    if (Number(e.target.value) < 0 || e.target.value === '') {
      cb(0);
    }
    if (regExNumber.test(e.target.value)) {
      cb(Number(e.target.value));
    }

    return;
  }

  function countHandler(
    e: React.ChangeEvent<HTMLInputElement>,
    cb: (numb: number) => void
  ) {
    if (/[0-9]+/.test(e.target.value)) {
      cb(Number(e.target.value));
    }
    if (Number(e.target.value) % 1 !== 0) {
      cb(Number(Number(e.target.value).toFixed(0)));
    }
    if (Number(e.target.value) < 0 || e.target.value === '') {
      cb(0);
    }

    return;
  }

  function textHandler(
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>,
    cb: (numb: string) => void
  ) {
    const regExText = /^[a-zA-Z0-9\s.,!?]+$/;
    if (regExText.test(e.target.value)) {
      cb(e.target.value);
    }
    if (e.target.value === '') {
      cb('');
    }

    return;
  }

  function textTrim(
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>,
    cb: (numb: string) => void
  ) {
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
    <>
      <div
        className='item-page__img'
        style={{
          background: `url(${img}) center / cover no-repeat`,
        }}
      ></div>
      <div className='item-page__content' data-testid='admin-mode'>
        <div className='item-page__header'>
          <div className='item-page__correct-block'>
            <label htmlFor='name'>????????????????</label>
            <input
              data-testid='input-correct-name'
              type='text'
              name='name'
              id='name'
              value={newName}
              onChange={(e) => textHandler(e, setName)}
              onBlur={(e) => textTrim(e, setName)}
            />
          </div>
          <div className='item-page__correct-block'>
            <label htmlFor='price'>????????</label>
            <input
              data-testid='input-correct-price'
              type='number'
              name='price'
              id='price'
              value={newPrice}
              onChange={(e) => priceHandler(e, setPrice)}
            />
          </div>
        </div>
        <div className='item-page__correct-block'>
          <label htmlFor='count'>?? ??????????????</label>
          <input
            data-testid='input-correct-count'
            type='number'
            name='count'
            id='count'
            value={newCount}
            onChange={(e) => countHandler(e, setCount)}
          />
        </div>
        <div className='item-page__correct-block'>
          <label htmlFor='price'>????????????????</label>
          <textarea
            data-testid='textarea-correct-description'
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
            data-testid='cancel-button'
            onClick={() => {
              setAdminMode(false);
            }}
          >
            ????????????
          </div>
          <div className='item-page__button button' onClick={saveHandler} data-testid='save-button'>
            ??????????????????
          </div>
        </div>
      </div>
    </>
  );
}
