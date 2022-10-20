import { Items, Item } from '../types/items';
import { ItemsState, Action } from '../types/itemsReducerTypes';

const defaultItemsState: ItemsState = {
  items: [],
  cartItems: [],
  currentItem: null,
  isItemsLoaded: false,
  isItemLoaded: false,
  itemPrice: 0,
  itemCount: 0,
};

export enum Actions {
  SELECT_ITEM = 'SELECT_ITEM',
  ADD_ITEM = 'ADD_ITEM',
  CORRECT_ITEM = 'CORRECT_ITEM',
  FETCH_ITEMS = 'FETCH_ITEMS',
  REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART',
  DELETE_ITEM = 'DELETE_ITEM',
  CLEAR_CART = 'CLEAR_CART',
  UPDATE_SMALL_CART = 'UPDATE_SMALL_CART',
  CLEAR_ITEMS = 'CLEAR_ITEMS',
}

export const itemsReducer = (
  state = defaultItemsState,
  action: Action
): ItemsState => {
  switch (action.type) {
    case Actions.FETCH_ITEMS:
      return { ...state, items: action.payload, isItemsLoaded: true };

    case Actions.CLEAR_ITEMS:
      return { ...state, items: [], isItemsLoaded: false };

    case Actions.SELECT_ITEM:
      return {
        ...state,
        isItemLoaded: true,
        currentItem: action.payload,
      };

    case Actions.ADD_ITEM:
      if (state.isItemsLoaded) {
        state.items = state.items.map((i) => {
          if (i.id === action.payload.id) {
            i.count = i.count - action.payload.count;
          }

          return i;
        });
      }

      if (state.isItemLoaded) {
        if (
          state.currentItem !== null &&
          state.currentItem.id === action.payload.id
        ) {
          state.currentItem = {
            ...state.currentItem,
            count: state.currentItem.count - action.payload.count,
          };
        }
      }

      let index = state.cartItems.findIndex((i) => i.id === action.payload.id);

      if (index !== -1) {
        state.cartItems[index].count += action.payload.count;
      } else {
        state.cartItems.push(action.payload);
      }

      return { ...state };

    case Actions.DELETE_ITEM:
      if (state.isItemsLoaded) {
        state.items = state.items.map((i) => {
          if (i.id === action.payload.id) {
            i.count = i.count + action.payload.count;
          }

          return i;
        });
      }

      if (state.isItemLoaded) {
        if (
          state.currentItem !== null &&
          state.currentItem.id === action.payload.id
        ) {
          state.currentItem = {
            ...state.currentItem,
            count: state.currentItem.count + action.payload.count,
          };
        }
      }

      let indexDel = state.cartItems.findIndex(
        (i) => i.id === action.payload.id
      );

      if (indexDel !== -1) {
        state.cartItems[indexDel].count -= action.payload.count;
        if (state.cartItems[indexDel].count === 0) {
          state.cartItems.splice(indexDel, 1);
        }
      }

      return { ...state };

    case Actions.REMOVE_ITEM_FROM_CART:
      state.cartItems = state.cartItems.filter((i) => {
        if (i.id === action.payload.id) {
          let index = state.items.findIndex((i) => i.id === action.payload.id);
          if (index !== -1) {
            state.items[index].count += i.count;
          }
          if (
            state.currentItem !== null &&
            state.currentItem.id === action.payload.id
          ) {
            state.currentItem.count += i.count;
          }
        }

        return i.id !== action.payload.id;
      });

      return { ...state };

    case Actions.CORRECT_ITEM:
      let indexCorrect = state.items.findIndex(
        (i) => i.id === action.payload.id
      );

      if (indexCorrect !== -1) {
        state.items[indexCorrect] = {
          ...state.items[indexCorrect],
          name: action.payload.name,
          price: action.payload.price,
          count: action.payload.count,
          maxCount: action.payload.count,
          description: action.payload.description,
        };
      }

      if (
        state.currentItem !== null &&
        state.currentItem.id === action.payload.id
      ) {
        state.currentItem = {
          ...state.currentItem,
          name: action.payload.name,
          price: action.payload.price,
          count: action.payload.count,
          maxCount: action.payload.count,
          description: action.payload.description,
        };
      }

      return { ...state };

    case Actions.CLEAR_CART:
      if (state.cartItems.length === 0) {
        return { ...state };
      }

      state.cartItems.forEach((cartItem) => {
        let index = state.items.findIndex((item) => item.id === cartItem.id);
        if (index !== -1) {
          state.items[index].count += cartItem.count;
        }
      });

      state.cartItems = [];

      return { ...state };

    case Actions.UPDATE_SMALL_CART:
      state.itemPrice = state.cartItems.reduce(
        (prev, item) => Number((item.count * item.price + prev).toFixed(2)),
        0
      );
      state.itemCount = state.cartItems.reduce(
        (prev, item) => Number((item.count + prev).toFixed(2)),
        0
      );
      return { ...state };

    default:
      return state;
  }
};

export const clearCartAction = (): { type: Actions.CLEAR_CART } => ({
  type: Actions.CLEAR_CART,
});
export const clearItemsAction = (): { type: Actions.CLEAR_ITEMS } => ({
  type: Actions.CLEAR_ITEMS,
});

export const updateSmallCartAction = (): {
  type: Actions.UPDATE_SMALL_CART;
} => ({
  type: Actions.UPDATE_SMALL_CART,
});

export const addItemAction = (
  payload: Item
): {
  type: Actions.ADD_ITEM;
  payload: Item;
} => ({
  type: Actions.ADD_ITEM,
  payload,
});

export const selectItemAction = (
  payload: Item | null
): {
  type: Actions.SELECT_ITEM;
  payload: Item | null;
} => ({
  type: Actions.SELECT_ITEM,
  payload,
});

export const correctItemAction = (
  payload: Item
): {
  type: Actions.CORRECT_ITEM;
  payload: Item;
} => ({
  type: Actions.CORRECT_ITEM,
  payload,
});

export const fetchItemsAction = (
  payload: Items
): { type: Actions.FETCH_ITEMS; payload: Items } => ({
  type: Actions.FETCH_ITEMS,
  payload,
});

export const deleteItemAction = (
  payload: Pick<Item, 'id' | 'count'>
): {
  type: Actions.DELETE_ITEM;
  payload: Pick<Item, 'id' | 'count'>;
} => ({
  type: Actions.DELETE_ITEM,
  payload,
});

export const removeItemFromCartAction = (
  payload: Pick<Item, 'id'>
): {
  type: Actions.REMOVE_ITEM_FROM_CART;
  payload: Pick<Item, 'id'>;
} => ({
  type: Actions.REMOVE_ITEM_FROM_CART,
  payload,
});
