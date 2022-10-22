import { screen, render } from '@testing-library/react';
import CartSmall from './cart-small';
import { renderWithRedux } from '../tests/helpers/renderWithRedux';
import { users as mockUsers } from '../../mocks/users';
import { defaultItemsState } from '../../app-store/itemsReducer';

describe('testing small cart element', () => {
  test('renders small cart element when user is not admin', () => {
    render(
      renderWithRedux(<CartSmall />, defaultItemsState, {
        user: mockUsers[0],
        isAuth: true,
      })
    );
    const smallCartElement = screen.getByTestId('small-cart');
    expect(smallCartElement).toBeInTheDocument();
  });

  test('renders small cart element when user is admin', () => {
    render(
      renderWithRedux(<CartSmall />, defaultItemsState, {
        user: mockUsers[1],
        isAuth: true,
      })
    );
    const smallCartElement = screen.queryByTestId('small-cart');
    expect(smallCartElement).toBeNull();
  });

  test('renders small cart element when no user', () => {
    render(
      renderWithRedux(<CartSmall />, defaultItemsState, {
        user: null,
        isAuth: false,
      })
    );
    const smallCartElement = screen.queryByTestId('small-cart');
    expect(smallCartElement).toBeNull();
  });

  test('correct count and sum', () => {
    render(
      renderWithRedux(<CartSmall />, {...defaultItemsState, itemCount: 10, itemPrice: 10000}, {
        user: mockUsers[0],
        isAuth: true,
      })
    );
    const countItems = screen.queryByTestId('count-items');
    const sumItems = screen.queryByTestId('sum-items');
    expect(countItems?.innerHTML).toBe('10');
    expect(sumItems?.innerHTML).toBe('10000');
  });
});
