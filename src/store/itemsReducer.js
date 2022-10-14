const itemsState = {
  items: [],
  cartItems: [],
  currentItem: {},
  isItemsLoaded: false,
  isItemLoaded: false,
  itemPrice: 0,
  itemCount: 0,
};

const FETCH_ITEMS = 'FETCH_ITEMS';
const SELECT_ITEM = 'SELECT_ITEM';
const ADD_ITEM = 'ADD_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';
const CORRECT_CART = 'CORRECT_CART';
const CORRECT_ITEMS = 'CORRECT_ITEMS';

export const itemsReducer = (state = itemsState, action) => {
  switch (action.type) {
    case FETCH_ITEMS:
      return { ...state, items: action.payload, isItemsLoaded: true };

    case SELECT_ITEM:
      return {
        ...state,
        isItemLoaded: true,
        currentItem: action.payload,
      };

    case ADD_ITEM:
      if (state.isItemsLoaded) {
        state.items = state.items.map((i) => {
          if (i.id === action.payload.id) {
            i.count = i.count - action.payload.count;
          }

          return i;
        });
      }

      if (state.isItemLoaded) {
        if (state.currentItem.id === action.payload.id) {
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

      state.itemPrice = state.cartItems.reduce(
        (prev, item) => Number((item.count * item.price + prev).toFixed(2)),
        0
      );
      state.itemCount = state.cartItems.reduce(
        (prev, item) => Number((item.count + prev).toFixed(2)),
        0
      );

      return { ...state };

    case DELETE_ITEM:
      if (state.isItemsLoaded) {
        state.items = state.items.map((i) => {
          if (i.id === action.payload.id) {
            i.count = i.count + action.payload.count;
          }

          return i;
        });
      }

      if (state.isItemLoaded) {
        if (state.currentItem.id === action.payload.id) {
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

      state.itemPrice = state.cartItems.reduce(
        (prev, item) => Number((item.count * item.price + prev).toFixed(2)),
        0
      );
      state.itemCount = state.cartItems.reduce(
        (prev, item) => Number((item.count + prev).toFixed(2)),
        0
      );

      return { ...state };

    case CORRECT_CART:
      state.cartItems = state.cartItems.filter((i) => {
        if (i.id === action.payload) {
          let index = state.items.findIndex((i) => i.id === action.payload);
          state.items[index].count += i.count;
        }

        return i.id !== action.payload;
      });

      state.itemPrice = state.cartItems.reduce(
        (prev, item) => Number((item.count * item.price + prev).toFixed(2)),
        0
      );
      state.itemCount = state.cartItems.reduce(
        (prev, item) => Number((item.count + prev).toFixed(2)),
        0
      );
      return { ...state };

    case CORRECT_ITEMS:
      let indexCorrect = state.items.findIndex(
        (i) => i.id === action.payload.id
      );

      if (indexCorrect !== -1) {
        state.items[indexCorrect] = {
          ...state.items[indexCorrect],
          name: action.payload.newName,
          price: action.payload.newPrice,
          count: action.payload.newCount,
          maxCount: action.payload.newCount,
          description: action.payload.newDescription,
        };
      }

      if (state.currentItem.id === action.payload.id) {
        state.currentItem = {
          ...state.currentItem,
          name: action.payload.newName,
          price: action.payload.newPrice,
          count: action.payload.newCount,
          maxCount: action.payload.newCount,
          description: action.payload.newDescription,
        };
      }

      return { ...state };

    default:
      return { ...state };
  }
};

export const fetchItemsAction = (payload) => ({ type: FETCH_ITEMS, payload });
export const selectItemAction = (payload) => ({ type: SELECT_ITEM, payload });
export const addItemAction = (payload) => ({ type: ADD_ITEM, payload });
export const deleteItemAction = (payload) => ({ type: DELETE_ITEM, payload });
export const correctCartAction = (payload) => ({ type: CORRECT_CART, payload });
export const correctItemsAction = (payload) => ({
  type: CORRECT_ITEMS,
  payload,
});
