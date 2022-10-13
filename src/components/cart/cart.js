export default function Cart() {
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
      <div className='cart-page__row'>
        <div className='cart-page__numb cell'>1</div>
        <div className='cart-page__id cell'>101</div>
        <div className='cart-page__name cell'>Sword</div>
        <div className='cart-page__price cell'>200 р.</div>
        <div className='cart-page__count cell'>5</div>
        <div className='cart-page__sum cell'>1000</div>
        <div className='cart-page__del cell'>
          <button className='cart-page__button'></button>
        </div>
      </div>
      <div className='cart-page__row'>
        <div className='cart-page__numb cell'>1</div>
        <div className='cart-page__id cell'>101</div>
        <div className='cart-page__name cell'>Sword</div>
        <div className='cart-page__price cell'>200 р.</div>
        <div className='cart-page__count cell'>5</div>
        <div className='cart-page__sum cell'>1000</div>
        <div className='cart-page__del cell'>
          <button className='cart-page__button'></button>
        </div>
      </div>
    </div>
  );
}
