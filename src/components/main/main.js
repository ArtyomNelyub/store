import CartSmall from '../cart-small/cart-small';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { items as mockItems } from '../../mocks/items';
import { fetchItemsAction } from '../../store/itemsReducer';
import Item from './item';

export default function Main() {
  const dispatch = useDispatch();
  const isItemsLoaded = useSelector((state) => state.ITEMS.isItemsLoaded);
  const currentItem = useSelector((state) => state.ITEMS.currentItem);
  const items = useSelector((state) => state.ITEMS.items);

  useEffect(() => {
    setTimeout(() => {
      if (!isItemsLoaded && currentItem !== null) {
        dispatch(
          fetchItemsAction(
            mockItems.map((i) => (i.id === currentItem.id ? currentItem : i))
          )
        );
      }

      if (!isItemsLoaded && currentItem === null) {
        dispatch(fetchItemsAction(mockItems));
        return;
      }
    }, 500);
  }, [currentItem, dispatch, isItemsLoaded]);

  if (!isItemsLoaded) {
    return <div>loading...</div>;
  }

  return (
    <>
      <CartSmall />
      <ul className='main__items'>
        {items.map((item) => (
          <Item {...item} key={item.id} />
        ))}
      </ul>
    </>
  );
}
