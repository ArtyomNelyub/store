import Header from '../layout/header';
import pic from '../../img/Mech_bronzovogo_veka.webp'
import CartSmall from '../cart-small/cart-small';

export default function Main() {
  return (
    <>
      <Header />
      <div className='main'>
        <CartSmall />
        <div className='main__container'>
          <ul className='main__items'>
            <li className='main__item'>
              <article className='item'>
                <a
                  href='#'
                  className='item__img'
                  style={{
                    background:
                      `url(${pic}) center / cover no-repeat`,
                  }}
                ></a>
                <div className='item__name'>Item</div>
                <div className='item__price'>200 p.</div>
                <div className='item__block'>
                  <div className='item__button button button_delete'>
                    delete
                  </div>
                  <div className='item__button button'>add</div>
                </div>
              </article>
            </li>
            <li className='main__item'>
              <article className='item'>
                <a
                  href='#'
                  className='item__img'
                  style={{
                    background:
                      `url(${pic}) center / cover no-repeat`,
                  }}
                ></a>
                <div className='item__name'>Item</div>
                <div className='item__price'>200 p.</div>
                <div className='item__block'>
                  <div className='item__button button button_delete'>
                    delete
                  </div>
                  <div className='item__button button'>add</div>
                </div>
              </article>
            </li><li className='main__item'>
              <article className='item'>
                <a
                  href='#'
                  className='item__img'
                  style={{
                    background:
                      `url(${pic}) center / cover no-repeat`,
                  }}
                ></a>
                <div className='item__name'>Item</div>
                <div className='item__price'>200 p.</div>
                <div className='item__block'>
                  <div className='item__button button button_delete'>
                    delete
                  </div>
                  <div className='item__button button'>add</div>
                </div>
              </article>
            </li><li className='main__item'>
              <article className='item'>
                <a
                  href='#'
                  className='item__img'
                  style={{
                    background:
                      `url(${pic}) center / cover no-repeat`,
                  }}
                ></a>
                <div className='item__name'>Item</div>
                <div className='item__price'>200 p.</div>
                <div className='item__block'>
                  <div className='item__button button button_delete'>
                    delete
                  </div>
                  <div className='item__button button'>add</div>
                </div>
              </article>
            </li><li className='main__item'>
              <article className='item'>
                <a
                  href='#'
                  className='item__img'
                  style={{
                    background:
                      `url(${pic}) center / cover no-repeat`,
                  }}
                ></a>
                <div className='item__name'>Item</div>
                <div className='item__price'>200 p.</div>
                <div className='item__block'>
                  <div className='item__button button button_delete'>
                    delete
                  </div>
                  <div className='item__button button'>add</div>
                </div>
              </article>
            </li><li className='main__item'>
              <article className='item'>
                <a
                  href='#'
                  className='item__img'
                  style={{
                    background:
                      `url(${pic}) center / cover no-repeat`,
                  }}
                ></a>
                <div className='item__name'>Item</div>
                <div className='item__price'>200 p.</div>
                <div className='item__block'>
                  <div className='item__button button button_delete'>
                    delete
                  </div>
                  <div className='item__button button'>add</div>
                </div>
              </article>
            </li><li className='main__item'>
              <article className='item'>
                <a
                  href='#'
                  className='item__img'
                  style={{
                    background:
                      `url(${pic}) center / cover no-repeat`,
                  }}
                ></a>
                <div className='item__name'>Item</div>
                <div className='item__price'>200 p.</div>
                <div className='item__block'>
                  <div className='item__button button button_delete'>
                    delete
                  </div>
                  <div className='item__button button'>add</div>
                </div>
              </article>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
