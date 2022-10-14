import CartSmall from '../cart-small/cart-small';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { items } from '../../mocks/items';
import { fetchItemsAction } from '../../store/itemsReducer';
import Item from './item';

export default function Main() {
  const dispatch = useDispatch();
  const isItemsLoaded = useSelector((state) => state.ITEMS.isItemsLoaded);
  const isItemLoaded = useSelector((state) => state.ITEMS.isItemLoaded);
  const currentItem = useSelector((state) => state.ITEMS.currentItem);
  const goods = useSelector((state) => state.ITEMS.items);

  useEffect(() => {
    setTimeout(() => {
      if (!isItemsLoaded && !isItemLoaded) {
        dispatch(fetchItemsAction(items));
      }

      if (!isItemsLoaded && isItemLoaded) {
        try {
          dispatch(
            fetchItemsAction(
              items.map((i) => (i.id === currentItem.id ? currentItem : i))
            )
          );
        } catch (e) {
          dispatch(fetchItemsAction(items));
        }
      }

      if (!isItemsLoaded) {
        dispatch(fetchItemsAction(items));
        return;
      }
    }, 500);
  }, [currentItem, dispatch, isItemLoaded, isItemsLoaded]);

  if (!isItemsLoaded) {
    return <div>loading...</div>;
  }

  return (
    <>
      <CartSmall />
      <ul className='main__items'>
        {goods.map((item) => (
          <Item {...item} key={item.id} />
        ))}
      </ul>
    </>
  );
}
