import {
  itemsReducer,
  fetchItemsAction,
  clearItemsAction,
  selectItemAction,
  addItemAction,
  deleteItemAction,
  removeItemFromCartAction,
  correctItemAction,
  updateSmallCartAction,
} from './itemsReducer';
import { items as mockItems } from '../mocks/items';
import { Item, Items } from '../types/items';
import { ItemsState } from '../types/itemsReducerTypes';

describe('Testing itemsReducer', () => {
  let itemForBuying: null | Item = null;
  let fakeItems: Items = [];
  let fakeDefault: null | ItemsState;

  beforeEach(() => {
    itemForBuying = { ...mockItems[9], count: 5 };
    fakeItems = [...mockItems.map((i) => ({ ...i }))];
    fakeDefault = {
      items: [],
      cartItems: [],
      currentItem: null,
      isItemsLoaded: false,
      isItemLoaded: false,
      itemPrice: 0,
      itemCount: 0,
    } as ItemsState;
  });

  test('fetch items action', () => {
    expect(
      itemsReducer(fakeDefault as ItemsState, fetchItemsAction(fakeItems))
    ).toEqual({
      items: fakeItems,
      cartItems: [],
      currentItem: null,
      isItemsLoaded: true,
      isItemLoaded: false,
      itemPrice: 0,
      itemCount: 0,
    });
  });

  test('clear items action', () => {
    expect(
      itemsReducer(
        {
          items: [
            ...fakeItems.map((i) =>
              i.id === 10 ? { ...i, count: 5 } : { ...i }
            ),
          ],
          currentItem: { ...fakeItems[9] } as Item,
          cartItems: [{ ...fakeItems[9], count: 5 }],
          isItemsLoaded: true,
          isItemLoaded: true,
          itemPrice: 100,
          itemCount: 1,
        },
        clearItemsAction()
      )
    ).toEqual({
      items: [],
      cartItems: [],
      currentItem: null,
      isItemsLoaded: false,
      isItemLoaded: false,
      itemPrice: 0,
      itemCount: 0,
    });
  });

  test('select item action', () => {
    expect(
      itemsReducer(
        fakeDefault as ItemsState,
        selectItemAction({ ...itemForBuying } as Item)
      )
    ).toEqual({
      items: [],
      cartItems: [],
      currentItem: { ...itemForBuying } as Item,
      isItemsLoaded: false,
      isItemLoaded: true,
      itemPrice: 0,
      itemCount: 0,
    });
  });

  test('add item action if items filled', () => {
    expect(
      itemsReducer(
        {
          ...(fakeDefault as ItemsState),
          items: [...fakeItems.map((i) => ({ ...i }))],
          isItemsLoaded: true,
        },
        addItemAction(itemForBuying as Item)
      )
    ).toEqual({
      items: [
        ...fakeItems.map((i) =>
          i.id === 10 ? { ...fakeItems[9], count: 5 } : { ...i }
        ),
      ],
      cartItems: [{ ...fakeItems[9], count: 5 }],
      currentItem: null,
      isItemsLoaded: true,
      isItemLoaded: false,
      itemPrice: 0,
      itemCount: 0,
    });
  });

  test('add item action if one item filled', () => {
    expect(
      itemsReducer(
        {
          ...(fakeDefault as ItemsState),
          currentItem: { ...fakeItems[9] } as Item,
          isItemLoaded: true,
        },
        addItemAction({ ...itemForBuying } as Item)
      )
    ).toEqual({
      items: [],
      cartItems: [{ ...fakeItems[9], count: 5 }],
      currentItem: { ...fakeItems[9], count: 5 },
      isItemsLoaded: false,
      isItemLoaded: true,
      itemPrice: 0,
      itemCount: 0,
    });
  });

  test('add item action if both item and items filled', () => {
    expect(
      itemsReducer(
        {
          ...(fakeDefault as ItemsState),
          items: [...fakeItems.map((i) => ({ ...i }))],
          currentItem: { ...fakeItems[9] } as Item,
          isItemLoaded: true,
          isItemsLoaded: true,
        },
        addItemAction({ ...itemForBuying } as Item)
      )
    ).toEqual({
      items: [
        ...fakeItems.map((i) => (i.id === 10 ? { ...i, count: 5 } : { ...i })),
      ],
      cartItems: [{ ...fakeItems[9], count: 5 }],
      currentItem: { ...fakeItems[9], count: 5 },
      isItemsLoaded: true,
      isItemLoaded: true,
      itemPrice: 0,
      itemCount: 0,
    });
  });

  test('add item action if item is exactly in the cart', () => {
    expect(
      itemsReducer(
        {
          ...(fakeDefault as ItemsState),
          items: [
            ...fakeItems.map((i) =>
              i.id === 10 ? { ...i, count: 9 } : { ...i }
            ),
          ],
          currentItem: { ...fakeItems[9], count: 9 } as Item,
          cartItems: [{ ...fakeItems[9], count: 1 }],
          isItemLoaded: true,
          isItemsLoaded: true,
        },
        addItemAction({ ...itemForBuying } as Item)
      )
    ).toEqual({
      items: [
        ...fakeItems.map((i) => (i.id === 10 ? { ...i, count: 4 } : { ...i })),
      ],
      cartItems: [{ ...fakeItems[9], count: 6 }],
      currentItem: { ...fakeItems[9], count: 4 },
      isItemsLoaded: true,
      isItemLoaded: true,
      itemPrice: 0,
      itemCount: 0,
    });
  });

  test('delete item action if items filled and count items in cart is the same as in payload', () => {
    expect(
      itemsReducer(
        {
          ...(fakeDefault as ItemsState),
          items: [
            ...fakeItems.map((i) =>
              i.id === 10 ? { ...i, count: 5 } : { ...i }
            ),
          ],
          cartItems: [{ ...fakeItems[9], count: 5 }],
          isItemsLoaded: true,
        },
        deleteItemAction(itemForBuying as Item)
      )
    ).toEqual({
      items: [
        ...fakeItems.map((i) =>
          i.id === 10 ? { ...fakeItems[9], count: 10 } : { ...i }
        ),
      ],
      cartItems: [],
      currentItem: null,
      isItemsLoaded: true,
      isItemLoaded: false,
      itemPrice: 0,
      itemCount: 0,
    });
  });

  test('delete item action if one item filled and count items in cart less than payload', () => {
    expect(
      itemsReducer(
        {
          ...(fakeDefault as ItemsState),
          currentItem: { ...fakeItems[9], count: 3 } as Item,
          cartItems: [{ ...fakeItems[9], count: 7 }],
          isItemLoaded: true,
        },
        deleteItemAction({ ...itemForBuying } as Item)
      )
    ).toEqual({
      items: [],
      currentItem: { ...fakeItems[9], count: 8 },
      cartItems: [{ ...fakeItems[9], count: 2 }],
      isItemsLoaded: false,
      isItemLoaded: true,
      itemPrice: 0,
      itemCount: 0,
    });
  });

  test('remove item from cart action if one item is loaded', () => {
    expect(
      itemsReducer(
        {
          ...(fakeDefault as ItemsState),
          currentItem: { ...fakeItems[9], count: 3 } as Item,
          cartItems: [{ ...fakeItems[9], count: 7 }],
          isItemLoaded: true,
        },
        removeItemFromCartAction({ id: 10 })
      )
    ).toEqual({
      items: [],
      currentItem: { ...fakeItems[9], count: 10 },
      cartItems: [],
      isItemsLoaded: false,
      isItemLoaded: true,
      itemPrice: 0,
      itemCount: 0,
    });
  });

  test('remove item from cart action if items is loaded', () => {
    expect(
      itemsReducer(
        {
          ...(fakeDefault as ItemsState),
          items: [
            ...fakeItems.map((i) =>
              i.id === 10 ? { ...i, count: 5 } : { ...i }
            ),
          ],
          cartItems: [{ ...fakeItems[9], count: 5 }],
          isItemsLoaded: true,
        },
        removeItemFromCartAction({ id: 10 })
      )
    ).toEqual({
      items: [
        ...fakeItems.map((i) => (i.id === 10 ? { ...i, count: 10 } : { ...i })),
      ],
      currentItem: null,
      cartItems: [],
      isItemLoaded: false,
      isItemsLoaded: true,
      itemPrice: 0,
      itemCount: 0,
    });
  });

  test('correct item action if one item is loaded', () => {
    expect(
      itemsReducer(
        {
          ...(fakeDefault as ItemsState),
          currentItem: { ...fakeItems[9] } as Item,
          isItemLoaded: true,
        },
        correctItemAction({
          ...fakeItems[9],
          price: 1,
          name: 'new',
          count: 777,
          description: 'new one',
        })
      )
    ).toEqual({
      items: [],
      currentItem: {
        ...fakeItems[9],
        price: 1,
        name: 'new',
        count: 777,
        maxCount: 777,
        description: 'new one',
      },
      cartItems: [],
      isItemsLoaded: false,
      isItemLoaded: true,
      itemPrice: 0,
      itemCount: 0,
    });
  });

  test('correct item action if items are loaded', () => {
    expect(
      itemsReducer(
        {
          ...(fakeDefault as ItemsState),
          items: [...fakeItems.map((i) => ({ ...i }))],
          currentItem: { ...fakeItems[9] },
          isItemsLoaded: true,
          isItemLoaded: true,
        },
        correctItemAction({
          ...fakeItems[9],
          price: 1,
          name: 'new',
          count: 777,
          description: 'new one',
        })
      )
    ).toEqual({
      items: [
        ...fakeItems.map((i) =>
          i.id === 10
            ? {
                ...i,
                price: 1,
                name: 'new',
                count: 777,
                maxCount: 777,
                description: 'new one',
              }
            : { ...i }
        ),
      ],
      currentItem: {
        ...fakeItems[9],
        price: 1,
        name: 'new',
        count: 777,
        maxCount: 777,
        description: 'new one',
      },
      cartItems: [],
      isItemsLoaded: true,
      isItemLoaded: true,
      itemPrice: 0,
      itemCount: 0,
    });
  });

  test('update small cart action', () => {
    expect(
      itemsReducer(
        {
          ...(fakeDefault as ItemsState),
          cartItems: [
            { ...fakeItems[0], count: 1 },
            { ...fakeItems[1], count: 2 },
          ],
        },
        updateSmallCartAction()
      )
    ).toEqual({
      items: [],
      currentItem: null,
      cartItems: [
        { ...fakeItems[0], count: 1 },
        { ...fakeItems[1], count: 2 },
      ],
      isItemLoaded: false,
      isItemsLoaded: false,
      itemPrice: 500.5,
      itemCount: 3,
    });
  });
});
