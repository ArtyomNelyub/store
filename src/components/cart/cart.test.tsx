import { screen, render } from '@testing-library/react';
import { defaultItemsState } from '../../app-store/itemsReducer';
import { defaultUserState } from '../../app-store/userReducer';
import { renderWithRedux } from '../tests/helpers/renderWithRedux';
import { items as mockItems } from '../../mocks/items';
import Cart from './cart';
import userEvent from '@testing-library/user-event';

describe('Testing cart component', () => {
  const testid = 1;

  test('Mounting empty cart component', () => {
    render(renderWithRedux(<Cart />, defaultItemsState, defaultUserState));
    const cartBlock = screen.getByTestId('cart-block');
    const firstItemRow = screen.queryByTestId(`item-field-${testid}`);
    expect(cartBlock).toBeInTheDocument();
    expect(firstItemRow).toBeNull();
  });

  test('Mounting cart component with one item', () => {
    render(
      renderWithRedux(
        <Cart />,
        { ...defaultItemsState, cartItems: [{ ...mockItems[9], id: testid }] },
        defaultUserState
      )
    );

    const firstItemRow = screen.getByTestId(`item-field-${testid}`);
    expect(firstItemRow).toBeInTheDocument();
  });

  test('Delete item from cart component with one item', () => {
    render(
      renderWithRedux(
        <Cart />,
        { ...defaultItemsState, cartItems: [{ ...mockItems[9], id: testid }] },
        defaultUserState
      )
    );

    const removeButton = screen.getByTestId(`remove-button-${testid}`);
    expect(removeButton).toBeInTheDocument();
    userEvent.click(removeButton);
    const firstItemRow = screen.queryByTestId(`item-field-${testid}`);
    expect(firstItemRow).toBeNull();
  });
});
