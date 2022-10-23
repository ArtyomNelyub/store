import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { defaultItemsState } from '../../app-store/itemsReducer';
import { defaultUserState } from '../../app-store/userReducer';
import { renderWithRedux } from '../tests/helpers/renderWithRedux';
import {items as mockItems} from '../../mocks/items';
import Main from './main';

describe('Testing main', () => {
  test('Rendering preloader without items', () => {
    render(
      renderWithRedux(
        <MemoryRouter>
          <Main />
        </MemoryRouter>,
        defaultItemsState,
        defaultUserState
      )
    );

    const preLoader = screen.getByText(/loading/i);
    expect(preLoader).toBeInTheDocument();
  });

  test('Rendering elements when they are', () => {
    render(
      renderWithRedux(
        <MemoryRouter>
          <Main />
        </MemoryRouter>,
        {...defaultItemsState, items: mockItems, isItemsLoaded: true},
        defaultUserState
      )
    );

    const preLoader = screen.queryByText(/loading/i);
    const itemsBlock = screen.getByTestId('items-block');
    expect(preLoader).toBeNull();
    expect(itemsBlock).toBeInTheDocument();
  });
});
