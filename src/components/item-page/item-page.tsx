import CartSmall from '../cart-small/cart-small';
import AdminMode from './admin-mode';
import UserMode from './user-mode';
import { useParams, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { items as mockItems } from '../../mocks/items';
import { selectItemAction } from '../../app-store/itemsReducer';
import { AppRoute } from '../../const/app-route';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Item } from '../../types/items';

export default function ItemPage(): JSX.Element {
  const { id: currentId } = useParams();
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.items.items);
  const currentItem = useAppSelector((state) => state.items.currentItem);
  const isItemsLoaded = useAppSelector((state) => state.items.isItemsLoaded);
  const isItemLoaded = useAppSelector((state) => state.items.isItemLoaded);
  const [adminMode, setAdminMode] = useState<boolean>(false);
  const item: Item | undefined = items.find((i) => i.id === Number(currentId));
  
  useEffect(() => {
    if (isItemsLoaded && item !== undefined) {
      dispatch(selectItemAction(item));
    } else {
      setTimeout(() => {
        let index = mockItems.findIndex((i) => i.id === Number(currentId));
        if (index !== -1) {
          dispatch(selectItemAction(mockItems[index]));
        } else {
          dispatch(selectItemAction(null));
        }
      }, 500);
    }
  }, [currentId, dispatch, isItemsLoaded, item, items]);

  if (!isItemLoaded) {
    return <div>Loading...</div>;
  }

  if (currentItem === null) {
    return <Navigate to={AppRoute.NOT_FOUND} />;
  }

  return (
    <>
      <CartSmall />
      {!adminMode && <UserMode {...{ adminMode, setAdminMode }} />}
      {adminMode && <AdminMode {...{ setAdminMode }} />}
    </>
  );
}
