import Header from '../layout/header';
import pic from '../../img/Mech_bronzovogo_veka.webp'
import CartSmall from '../cart-small/cart-small';

export default function Item() {
  return (
    <>
      <Header />

      <div class='main'>
        <CartSmall />
        <div class='main__container'>
          <div class='item-page'>
            <div
              class='item-page__img'
              style={{
                background: `url(${pic}) center / cover no-repeat`,
              }}
            ></div>
            <div class='item-page__content'>
              <div class='item-page__header'>
                <div class='item-page__name'>Item</div>

                {/* <div class="item-page__correct-block">
                  <label for="name">Название</label>
                  <input type="text" name="name" id="name" />
                </div> */}

                <div class='item-page__price'>200 р.</div>

                {/* <div class="item-page__correct-block">
                  <label for="price">Цена</label>
                  <input type="number" name="price" id="price" />
                </div> */}
              </div>
              <div class='item-page__number'>В наличии: 10 шт.</div>

              {/* <div class="item-page__correct-block">
                <label for="count">В наличии</label>
                <input type="number" name="count" id="count" />
              </div>  */}

              <p class='item-page__text'>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos
                unde dolorum fugit cum ut, error enim quam harum quod vel amet
                minus eius omnis. Consectetur pariatur, nihil corporis vel illo
                officiis dolore iusto laboriosam quis quisquam explicabo itaque
                ducimus, earum consequatur, ipsum id dolorum? Earum culpa in
                laboriosam molestiae consequatur, suscipit ipsa officiis ab!
                Aliquam, pariatur beatae! Assumenda quod odio dolores eos, modi
                eum commodi, adipisci culpa aut earum laboriosam a?
              </p>

              {/* <div class="item-page__correct-block">
                <label for="price">Описание</label>
                <textarea name="price" id="price" rows="7"></textarea>
              </div> */}

              <div class='item-page__footer'>
                {/* <div class='item-page__button button_delete button'>delete</div> */}
                {/* <div class='item-page__button button_correct button'>редактировать</div> */}
                {/* <div class='item-page__button button_delete button'>отмена</div> */}
                {/* <div class='item-page__button button'>сохранить</div> */}
                <div class='item-page__add-block'>
                  <input
                    type='number'
                    name='item-count'
                    id='item-count'
                    class='item-page__count'
                  />
                  <div class='item-page__add button'>add</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
