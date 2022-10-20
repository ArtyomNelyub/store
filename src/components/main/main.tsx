import CartSmall from '../cart-small/cart-small';
import ItemCards from './item-cards';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { items as mockItems } from '../../mocks/items';
import { fetchItemsAction } from '../../app-store/itemsReducer';

export default function Main(): JSX.Element {
  const dispatch = useAppDispatch();
  const isItemsLoaded = useAppSelector((state) => state.items.isItemsLoaded);
  const currentItem = useAppSelector((state) => state.items.currentItem);

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
      <ItemCards />
    </>
  );
}
