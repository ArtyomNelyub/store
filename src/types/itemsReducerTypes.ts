import { Items, Item } from './items';
import { Actions } from '../store/itemsReducer';

export type ItemsState = {
  items: Items;
  cartItems: Items;
  currentItem: null | Item;
  isItemsLoaded: boolean;
  isItemLoaded: boolean;
  itemPrice: number;
  itemCount: number;
};

export type Action =
  | ActionWithoutPayload
  | ActionIdAndCount
  | ActionId
  | ActionItems
  | ActionItem
  | ActionItemOrNull;


type ActionItem = {
  type: Actions.ADD_ITEM | Actions.CORRECT_ITEM;
  payload: Item;
};

type ActionItemOrNull = {
  type: Actions.SELECT_ITEM;
  payload: Item | null;
};

type ActionItems = {
  type: Actions.FETCH_ITEMS;
  payload: Items;
};

type ActionId = {
  type: Actions.REMOVE_ITEM_FROM_CART;
  payload: Pick<Item, 'id'>;
};

type ActionIdAndCount = {
  type: Actions.DELETE_ITEM;
  payload: Pick<Item, 'id' | 'count'>;
};

type ActionWithoutPayload = {
  type: Actions.CLEAR_CART;
};
