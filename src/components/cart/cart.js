import Header from '../layout/header';

export default function Cart() {
  return (
    <>
      <Header />
      <div className='main'>
        <div className='main__container'>
          <div className='cart-page'>
            <div className='cart-page__row'>
              <div className='cart-page__numb cart-page__title cell'>
                Number
              </div>
              <div className='cart-page__id cart-page__title cell'>id</div>
              <div className='cart-page__name cart-page__title cell'>Name</div>
              <div className='cart-page__price cart-page__title cell'>
                Price
              </div>
              <div className='cart-page__count cart-page__title cell'>
                Count
              </div>
              <div className='cart-page__summ cart-page__title cell'>Summ</div>
              <div className='cart-page__del cart-page__title cell'>Delete</div>
            </div>
            <div className='cart-page__row'>
              <div className='cart-page__numb cell'>1</div>
              <div className='cart-page__id cell'>101</div>
              <div className='cart-page__name cell'>Sword</div>
              <div className='cart-page__price cell'>200 р.</div>
              <div className='cart-page__count cell'>5</div>
              <div className='cart-page__summ cell'>1000</div>
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
              <div className='cart-page__summ cell'>1000</div>
              <div className='cart-page__del cell'>
                <button className='cart-page__button'></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
