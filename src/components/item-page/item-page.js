import CartSmall from '../cart-small/cart-small';
import { useParams, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { items as mockItems } from '../../mocks/items';
import { selectItemAction } from '../../store/itemsReducer';
import { APP_ROUTE } from '../../const/app-route';
import AdminMode from './admin-mode';
import UserMode from './user-mode';

export default function ItemPage() {
  const { id: currentId } = useParams();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.ITEMS.items);
  const currentItem = useSelector((state) => state.ITEMS.currentItem);
  const isItemsLoaded = useSelector((state) => state.ITEMS.isItemsLoaded);
  const isItemLoaded = useSelector((state) => state.ITEMS.isItemLoaded);
  const [adminMode, setAdminMode] = useState(false);

  useEffect(() => {
    if (isItemsLoaded) {
      dispatch(
        selectItemAction(items.find((i) => i.id === Number(currentId)))
      );
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
  }, [currentId, dispatch, isItemsLoaded, items]);

  if (!isItemLoaded) {
    return <div>Loading...</div>;
  }

  if (currentItem === null) {
    return <Navigate to={APP_ROUTE.NOT_FOUND} />;
  }

  return (
    <>
      <CartSmall />
      {!adminMode && <UserMode {...{ adminMode, setAdminMode }} />}
      {adminMode && <AdminMode {...{ setAdminMode }} />}
    </>
  );
}
