import { useAppDispatch, useAppSelector } from '../../hooks';
import { removeItemFromCartAction, updateSmallCartAction } from '../../app-store/itemsReducer';

export default function Cart():JSX.Element {
  const cartItems = useAppSelector((state) => state.items.cartItems);
  const dispatch = useAppDispatch();

  return (
    <div className='cart-page' data-testid='cart-block'>
      <div className='cart-page__row'>
        <div className='cart-page__numb cart-page__title cell'>Number</div>
        <div className='cart-page__id cart-page__title cell'>id</div>
        <div className='cart-page__name cart-page__title cell'>Name</div>
        <div className='cart-page__price cart-page__title cell'>Price</div>
        <div className='cart-page__count cart-page__title cell'>Count</div>
        <div className='cart-page__sum cart-page__title cell'>Sum</div>
        <div className='cart-page__del cart-page__title cell'>Delete</div>
      </div>

      {cartItems.map((item, index) => {
        return (
          <div className='cart-page__row' key={item.id} data-testid={`item-field-${item.id}`}>
            <div className='cart-page__numb cell'>{index + 1}</div>
            <div className='cart-page__id cell'>{item.id}</div>
            <div className='cart-page__name cell'>{item.name}</div>
            <div className='cart-page__price cell'>{item.price} р.</div>
            <div className='cart-page__count cell'>{item.count}</div>
            <div className='cart-page__sum cell'>{item.price * item.count}</div>
            <div className='cart-page__del cell'>
              <button
                data-testid={`remove-button-${item.id}`}
                className='cart-page__button'
                onClick={() => {
                  dispatch(removeItemFromCartAction({id: item.id}));
                  dispatch(updateSmallCartAction());
                }}
              ></button>
            </div>
          </div>
        );
      })}
      
    </div>
  );
}
