import { useSelector, useDispatch } from 'react-redux';
import { removeItemFromCartAction } from '../../store/itemsReducer';

export default function Cart() {
  const cartItems = useSelector((state) => state.ITEMS.cartItems);
  const dispatch = useDispatch();

  return (
    <div className='cart-page'>
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
          <div className='cart-page__row' key={item.id}>
            <div className='cart-page__numb cell'>{index + 1}</div>
            <div className='cart-page__id cell'>{item.id}</div>
            <div className='cart-page__name cell'>{item.name}</div>
            <div className='cart-page__price cell'>{item.price} р.</div>
            <div className='cart-page__count cell'>{item.count}</div>
            <div className='cart-page__sum cell'>{item.price * item.count}</div>
            <div className='cart-page__del cell'>
              <button
                className='cart-page__button'
                onClick={() => {
                  dispatch(removeItemFromCartAction(item.id));
                }}
              ></button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
