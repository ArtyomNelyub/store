import CartSmall from '../cart-small/cart-small';
import ItemCard from './item-card';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { items as mockItems } from '../../mocks/items';
import { fetchItemsAction } from '../../app-store/itemsReducer';

export default function Main(): JSX.Element {
  const dispatch = useAppDispatch();
  const isItemsLoaded = useAppSelector((state) => state.items.isItemsLoaded);
  const currentItem = useAppSelector((state) => state.items.currentItem);
  const items = useAppSelector((state) => state.items.items);

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
          <ItemCard {...item} key={item.id} />
        ))}
      </ul>
    </>
  );
}
